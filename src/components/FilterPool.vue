<script lang="ts" setup>
import { IFilter } from '@/store/types'
import FilterControls from '@/components/FilterControls.vue'

const store = useStore()
const filterNames = computed(() => store.state.filters.map((f: IFilter) => f.name))
let layoutIsReady = ref(false)

</script>
<template>
  <aside
    style="margin-bottom: 49px; padding: 0 18px;"
    class="flex flex-wrap justify-between items-center">
    <template :key="'FilterWithGap.' + filterName" v-for="filterName in filterNames">
      <Filter :filterName="filterName" />
      <FilterGap />
    </template>
    <FilterControls />
  </aside>
</template>
