<script lang="ts" setup>
import { IRangeFilterData, IRangeFilterOptions, } from '@/store/types'

const store = useStore()

const props = defineProps<{
  filterName: string,
  filterOptions?: IRangeFilterOptions,
  filterData: IRangeFilterData,
}>()

const handleRadius = 12
const precision = toRaw(props.filterOptions?.precision ?? 0)
const inputStep = 1 / (10 ** precision)
const dataToTextMultiplier = toRaw(props.filterOptions?.multiplier ?? 1)

const currentMinHandle = ref(null as SVGCircleElement | null)
const currentMaxHandle = ref(null as SVGCircleElement | null)
const currentMinValueInput = ref(null as HTMLInputElement | null)
const currentMaxValueInput = ref(null as HTMLInputElement | null)
const box = ref(null as HTMLElement | null)

const lengthX = ref(175)
const maxX = ref(163)
const minX = handleRadius
const handleCenterMinDistance = handleRadius * 2

const minValue = computed(() => {
  return ((
    store.getters.getFilterDataByName(props.filterName)
  ).minValue as number)
})

const maxValue = computed(() => {
  return ((
    store.getters.getFilterDataByName(props.filterName)
  ).maxValue as number)
})

const percentXRatio = computed(() => (
  100 / (lengthX.value - 4 * handleRadius)
))

const xValueToData = computed(() => (
  (maxValue.value - minValue.value) / (lengthX.value - 4 * handleRadius)
))

const dataToHandlerPercent = computed(() => 100 / (maxValue.value - minValue.value))

const currentMinValue = computed({
  get() {
    const v = ((store.getters.getFilterDataByName(props.filterName)
    ).currentMinValue as number)

    return v
  },
  set(v: number) {
    currentMinValueText.value = (v * dataToTextMultiplier).toFixed(precision)

    store.commit('setCurrentValue', {
      target: 'currentMinValue',
      filterName: props.filterName,
      value: v,
    })
  },
})

const currentMinValueText = computed({
  get() {
    return (store.getters.getFilterDataByName(props.filterName)
    ).currentMinValueText
  },
  set(vs: string) {
    store.commit('setCurrentValue', {
      target: 'currentMinValueText',
      filterName: props.filterName,
      value: vs,
    })
  },
})

const minHandlePercent = computed({
  get() {
    return (store.getters.getFilterDataByName(props.filterName)
    ).minHandlePercent
  },
  set(v: number) {
    store.commit('setCurrentValue', {
      target: 'minHandlePercent',
      filterName: props.filterName,
      value: v,
    })
  },
})

const currentMinX = computed({
  get() {
    return minHandlePercent.value / percentXRatio.value + handleRadius
  },
  set(vx: number) {
    store.commit('setCurrentValue', {
      target: 'minHandlePercent',
      filterName: props.filterName,
      value: (vx - handleRadius) * percentXRatio.value,
    })
  },
})

const currentMaxValue = computed({
  get() {
    const v = ((store.getters.getFilterDataByName(props.filterName)
    ).currentMaxValue as number)

    return v
  },
  set(v: number) {
    currentMaxValueText.value = (v * dataToTextMultiplier).toFixed(precision)

    store.commit('setCurrentValue', {
      target: 'currentMaxValue',
      filterName: props.filterName,
      value: v,
    })
  },
})

const currentMaxValueText = computed({
  get() {
    return (store.getters.getFilterDataByName(props.filterName)
    ).currentMaxValueText
  },
  set(vs: string) {
    store.commit('setCurrentValue', {
      target: 'currentMaxValueText',
      filterName: props.filterName,
      value: vs,
    })
  },
})

const maxHandlePercent = computed({
  get() {
    return (store.getters.getFilterDataByName(props.filterName)
    ).maxHandlePercent
  },
  set(v: number) {
    store.commit('setCurrentValue', {
      target: 'maxHandlePercent',
      filterName: props.filterName,
      value: v,
    })
  },
})

const currentMaxX = computed({
  get() {
    const vx = maxX.value - (100 - maxHandlePercent.value) / percentXRatio.value
    return vx
  },
  set(vx: number) {
    store.commit('setCurrentValue', {
      target: 'maxHandlePercent',
      filterName: props.filterName,
      value: 100 -(maxX.value - vx) * percentXRatio.value,
    })
  },
})

let shiftX: number
let oldHandleX: number
let movingHandleName: string
let moving: boolean

const handleDrag = (event: MouseEvent) => {
  moving = true
  window.addEventListener('mousemove', currentMinHandleMove)
  window.addEventListener('mouseup', currentMinHandleDrop)
  const handleName = (event.target as SVGCircleElement).id
  shiftX = event.x
  oldHandleX = handleName === 'currentMinHandle' ? currentMinX.value : currentMaxX.value
  movingHandleName = handleName
}

const currentMinHandleMove = (event: MouseEvent) => {
  if (movingHandleName === 'currentMinHandle') {
    currentMinX.value = Math.min(
      Math.max(event.x - shiftX + oldHandleX, minX),
      currentMaxX.value - handleCenterMinDistance
    )

    currentMinValue.value = minValue.value + (currentMinX.value - minX) * xValueToData.value
  } else if (movingHandleName === 'currentMaxHandle') {
    currentMaxX.value = Math.max(
      Math.min(event.x - shiftX + oldHandleX, maxX.value),
      currentMinX.value + handleCenterMinDistance
    )

    currentMaxValue.value = maxValue.value - (
      maxX.value - currentMaxX.value
    ) * xValueToData.value
  }
}

const currentMinHandleDrop = (event: MouseEvent) => {
  window.removeEventListener('mousemove', currentMinHandleMove)
  window.removeEventListener('mouseup', currentMinHandleDrop)
  moving = false
  currentMinHandleMove(event)

  currentMinX.value = ((
    +currentMinValueText.value / dataToTextMultiplier - minValue.value
  ) / xValueToData.value) + minX

  currentMinValue.value = +currentMinValueText.value / dataToTextMultiplier

  currentMaxX.value = maxX.value - ((
    maxValue.value - +currentMaxValueText.value / dataToTextMultiplier
  ) / xValueToData.value)

  currentMaxValue.value = +currentMaxValueText.value / dataToTextMultiplier
}

const selectInput = (event: MouseEvent) => {
  (event?.target as HTMLInputElement).select()
}

const minInputEscape = () => {
  currentMinValueText.value = (currentMinValue.value * dataToTextMultiplier).toFixed(precision)
}

const validateMin = () => {
  if (isNaN(currentMinValueText.value as any)) {
    minInputEscape()

    return
  }

  let vt: number = +currentMinValueText.value

  if (vt > currentMaxValue.value * dataToTextMultiplier) {
    vt = currentMaxValue.value * dataToTextMultiplier
  }

  if (vt < minValue.value * dataToTextMultiplier) {
    vt = minValue.value * dataToTextMultiplier
  }

  currentMinValue.value = vt / dataToTextMultiplier
  currentMinValueText.value = vt.toFixed(precision)

  minHandlePercent.value = (
    vt / dataToTextMultiplier - minValue.value
  ) * dataToHandlerPercent.value
}

const maxInputEscape = () => {
  currentMaxValueText.value = (currentMaxValue.value * dataToTextMultiplier).toFixed(precision)
}

const validateMax = () => {
  if (isNaN(currentMaxValueText.value as any)) {
    maxInputEscape()

    return
  }

  let vt: number = +currentMaxValueText.value

  if (vt < currentMinValue.value * dataToTextMultiplier) {
    vt = currentMinValue.value * dataToTextMultiplier
  }

  if (vt > maxValue.value * dataToTextMultiplier) {
    vt = maxValue.value * dataToTextMultiplier
  }

  currentMaxValue.value = vt / dataToTextMultiplier
  currentMaxValueText.value = vt.toFixed(precision)

  maxHandlePercent.value = (
    vt / dataToTextMultiplier - minValue.value
  ) * dataToHandlerPercent.value
}

const setXSizes = () => {
  lengthX.value = +(box.value as HTMLElement).clientWidth
  maxX.value = lengthX.value - handleRadius
  currentMaxX.value = maxX.value
}

onMounted(() => {
  const boxElem = box.value as HTMLElement
  boxElem.addEventListener('resize', setXSizes)
  setXSizes()
})
</script>
<template>
  <div ref="box">
    <div class="flex justify-center ">
      <input
        type="number"
        ref="currentMinValueInput"
        class="control-frame range-input h0"
        style="text-align: center; line-height: 40px;"
        v-model="currentMinValueText"
        :step="inputStep"
        @click="selectInput"
        @keydown.up="validateMin"
        @keydown.down="validateMin"
         @keyup.enter="validateMin"
        @keyup.esc="minInputEscape"
        @change="validateMin" />
      <div
        class="px0 h3 bold mx1 table-cell p0"
        style="height: 40px; line-height: 40px; color: #2c323a; opacity: 0.5;">-</div>
      <input
        type="number"
        id="currentMaxHandle"
        ref="currentMaxValueInput"
        class="control-frame range-input h0"
        style="text-align: center; line-height: 40px;"
        v-model="currentMaxValueText"
        :step="inputStep"
        @click="selectInput"
        @keydown.up="validateMax"
        @keydown.down="validateMax"
        @keyup.enter="validateMax"
        @keyup.esc="maxInputEscape"
        @change="validateMax" />
    </div>
    <svg class="bock mt1" xmlns="http://www.w3.org/2000/svg"
      width="175" height="24" viewBox="0 0 175 24">
      <path stroke-width="2" stroke="#d8d8d8" :d="`M 0,12 L ${lengthX},12`" />
      <path stroke-width="2" stroke="#70d24e" :d="`M ${currentMinX},12 L ${currentMaxX},12`" />
      <circle ref="currentMinHandle"
        id="currentMinHandle"
        @mousedown="handleDrag"
        class="pointer" :cx="currentMinX" cy="12" r="10"
        fill="#70d24e" stroke-width="4" stroke="#fff" />
      <circle ref="currentMaxHandle"
        id="currentMaxHandle"
        @mousedown="handleDrag"
        class="pointer" :cx="currentMaxX" cy="12" r="10"
        fill="#70d24e" stroke-width="4" stroke="#fff" />
    </svg>
  </div>
</template>
<style scoped>
.range-input {
  width: 80px;
  text-align: center;
  line-height: 40px
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type='number'],
input[type="number"]:hover,
input[type="number"]:focus {
    appearance: none;
    -moz-appearance: textfield;
}
</style>
