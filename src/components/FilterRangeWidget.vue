<script lang="ts" setup>
import { IRangeFilterData, IRangeFilterOptions, } from '@/store'
import mitt, { Emitter, } from 'mitt'

const store = useStore()

const props = defineProps<{
  filterName: string,
  filterOptions?: IRangeFilterOptions,
  filterData: IRangeFilterData,
}>()

const handleRadius = 12
let moving = false

const precision = toRaw(props.filterOptions?.precision ?? 0)
const degree = 10 ** precision
const dataToUIMultiplier = toRaw(props.filterOptions?.multiplier ?? 1)

const currentMinHandle = ref(null as SVGCircleElement | null)
const currentMaxHandle = ref(null as SVGCircleElement | null)
const currentMinValueInput = ref(null as HTMLInputElement | null)
const currentMaxValueInput = ref(null as HTMLInputElement | null)
const box = ref(null as HTMLElement | null)

const lengthX = ref(175)
const maxX = ref(163)
const minX = handleRadius
const handleCenterMinDistance = handleRadius * 2

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

const percentXRatio = computed(() => (
  100 / (lengthX.value - 4 * handleRadius)
))

const ratio = computed(() => (
  (maxValue.value - minValue.value) / (lengthX.value - 4 * handleRadius)
))

let shiftX: number
let oldHandleX: number
let movingHandleName: string

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

const currentMinValue = computed({
  get() {
    const v = ((store.getters.getFilterDataByName(props.filterName)
    ).currentMinValue as number)

    // if (!moving) {
    //   currentMinX.value = ((v - minValue.value) / ratio.value) + minX
    // }

    return v
  },
  set(v: number) {
    currentMinValueText.value = (v * dataToUIMultiplier).toFixed(precision)

    store.commit('setCurrentValue', {
      target: 'currentMinValue',
      filterName: props.filterName,
      value: v / dataToUIMultiplier,
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

const currentMaxValue = computed({
  get() {
    const v = ((store.getters.getFilterDataByName(props.filterName)
    ).currentMaxValue as number)

    // if (!moving) {
    //   currentMaxX.value = maxX.value - ((maxValue.value - v) / ratio.value)
    // }

    return v
  },
  set(v: number) {
    currentMaxValueText.value = (v * dataToUIMultiplier).toFixed(precision)

    store.commit('setCurrentValue', {
      target: 'currentMaxValue',
      filterName: props.filterName,
      value: v / dataToUIMultiplier,
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

    currentMinValue.value = minValue.value + (currentMinX.value - minX) * ratio.value
  } else if (movingHandleName === 'currentMaxHandle') {
    currentMaxX.value = Math.max(
      Math.min(event.x - shiftX + oldHandleX, maxX.value),
      currentMinX.value + handleCenterMinDistance
    )

    currentMaxValue.value = maxValue.value - (maxX.value - currentMaxX.value) * ratio.value
  }
}

const currentMinHandleDrop = (event: MouseEvent) => {
  window.removeEventListener('mousemove', currentMinHandleMove)
  window.removeEventListener('mouseup', currentMinHandleDrop)
  moving = false
    // if (!moving) {
    //   currentMinX.value = ((v - minValue.value) / ratio.value) + minX
    // }currentMaxValueText
  currentMinHandleMove(event)

  currentMinX.value = ((
    +currentMinValueText.value / dataToUIMultiplier - minValue.value
  ) / ratio.value) + minX

  currentMaxX.value = maxX.value - ((
    maxValue.value - +currentMaxValueText.value / dataToUIMultiplier
  ) / ratio.value)
}

const selectInput = (event: MouseEvent) => {
  (event?.target as HTMLInputElement).select()
}

const minInputEscape = () => {
  currentMinValueText.value = (currentMinValue.value * dataToUIMultiplier).toFixed(precision)
}

const validateMin = () => {
  console.log('currentMinValueText.value: ', currentMinValueText.value)
  if (isNaN(currentMinValueText.value as any)) {
    console.log('isNaN')
    minInputEscape()

    return
  }

  let v: number = +currentMinValueText.value
  console.log('currentMinValueText.value: ', currentMinValueText.value);
  console.log('currentMaxValue.value: ', currentMaxValue.value);
  console.log('minValue.value: ', minValue.value);

  if (v > currentMaxValue.value) {
    v = currentMaxValue.value
  }

  if (v < minValue.value) {
    v = minValue.value
  }

  currentMinValue.value = v
  currentMinValueText.value = (currentMinValue.value * dataToUIMultiplier).toFixed(precision)
}

const maxInputEscape = () => {
  currentMaxValueText.value = (currentMaxValue.value * dataToUIMultiplier).toFixed(precision)
}

const validateMax = () => {
  if (isNaN(currentMaxValueText.value as any)) {
    maxInputEscape()

    return
  }

  let v: number = +currentMaxValueText.value

  if (v < currentMinValue.value) {
    v = currentMinValue.value
  }

  if (v > maxValue.value) {
    v = maxValue.value
  }

  currentMaxValue.value = v
  currentMaxValueText.value = (currentMaxValue.value * dataToUIMultiplier).toFixed(precision)
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
        :step="1/degree"
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
        :step="1/degree"
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
