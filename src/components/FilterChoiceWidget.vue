<script lang="ts" setup>
import { IChoiceFilterData } from '@/store/types'
import LockingButton from '@/components/FiltreChoiceLockingButton.vue'

const store = useStore()

const props = defineProps<{
  filterData: IChoiceFilterData,
  filterName: string,
}>()

const variantsMaxIndex = props.filterData.variants.length - 1

const box = ref(null as HTMLElement | null)

const setLayout = () => {
  const layout = { width: +(box.value as HTMLElement).clientWidth }
  store.commit('setFilterLayout', { filterName: props.filterName, layout })
}

onMounted(() => {
  const boxElem = box.value as HTMLElement
  boxElem.addEventListener('resize', setLayout)
  setLayout()
})

</script>
<template>
  <div ref="box" style="display: inline-block;">
    <LockingButton
      v-for="variant, index in filterData.variants"
      :key="'ChoiceFilterWidget' + variant.variantName"
      :isLast="index == variantsMaxIndex"
      :filterName="filterName"
      :variantName="variant.variantName" />
  </div>
</template>
