<script lang="ts" setup>
import { IChoiceFilterData } from '@/store'
import LockingButton from '@/components/FiltreChoiceLockingButton.vue'

const props = defineProps<{
  filterData: IChoiceFilterData,
  filterName: string,
}>()

const optionsToChoiceMaxIndex = props.filterData.optionsToChoice.length - 1
</script>
<template>
  <div style="display: inline-block;">
    <LockingButton
      v-for="variant, index in filterData.optionsToChoice"
      :key="'ChoiceFilterWidget' + variant.variantName"
      :isLast="index == optionsToChoiceMaxIndex"
      :filterName="filterName"
      :variantName="variant.variantName" />
  </div>
</template>
