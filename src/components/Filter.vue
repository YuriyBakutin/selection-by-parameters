<script lang="ts" setup>
import { IFilter } from '@/store/types'
import getFilterWidgetByType from '@/helpers/getFilterWidgetByType'

const store = useStore()

const props = defineProps<{
  filterName: string,
}>()

const filter = store.getters.getFilterByName(props.filterName) // markRaw( props.filter )

const widget = getFilterWidgetByType(filter.type)

</script>
<template>
  <div
    style="height: 93px;"
    class="py0">
    <h3
      style="margin-bottom: 8px;"
      class="h2 bold mt0">{{filter?.title}}</h3>
    <component
      :is="widget"
      :filterName="filter.name"
      :filterOptions="filter.options"
      :filterData="filter.data" />
  </div>
</template>
