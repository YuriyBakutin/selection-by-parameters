<script lang="ts" setup>
import { IFilterParams } from '@/store'
import FilterControls from '@/components/FilterControls.vue'

const store = useStore()
const filters = computed(() => (store.state.filters) as IFilterParams[])
</script>
<template>
  <aside
    style="margin-bottom: 49px; padding: 0 22px;"
    class="flex flex-wrap justify-between items-center">
    <template :key="'FilterWithGap.' + filterParams?.name" v-for="filterParams in filters">
      <Filter :filterParams="filterParams" />
      <FilterGap />
    </template>
    <FilterControls />
  </aside>
</template>
