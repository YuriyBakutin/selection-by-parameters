<script lang="ts" setup>
import { IFilterParams } from '@/store'
import getFilterWidgetByType from '@/helpers/getFilterWidgetByType'
import FilterGap from '@/components/FilterGap.vue'

const props = defineProps<{
  filterParams: IFilterParams,
}>()

const widget = getFilterWidgetByType(props.filterParams.type)

const filterParams = markRaw( props.filterParams )
</script>
<template>
  <div
    style="height: 93px;"
    class="py0">
    <h3
      style="margin-bottom: 8px;"
      class="h2 bold mt0">{{filterParams?.title}}</h3>
    <component
      :is="widget"
      :filterName="filterParams.name"
      :filterOptions="filterParams.options"
      :filterData="filterParams.data" />
  </div>
</template>
