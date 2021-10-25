<script lang="ts" setup>
import { IChoiceFilterData } from '@/store'
import LockingButton from '@/components/FiltreChoiceLockingButton.vue'

const props = defineProps<{
  filterData: IChoiceFilterData,
  filterName: string,
}>()

const variantsMaxIndex = props.filterData.variants.length - 1
</script>
<template>
  <div style="display: inline-block;">
    <LockingButton
      v-for="variant, index in filterData.variants"
      :key="'ChoiceFilterWidget' + variant.variantName"
      :isLast="index == variantsMaxIndex"
      :filterName="filterName"
      :variantName="variant.variantName" />
  </div>
</template>
