<script lang="ts" setup>
const store = useStore()
const filteredProdData = computed(() => store.getters.getFilteredProdData)

const prodCardsPerRow = 4

const prodCardEmptyArray = computed(() => {
  const prodCardEmptyNumber = (
    prodCardsPerRow - filteredProdData.value.length % prodCardsPerRow
  ) % prodCardsPerRow

  return new Array(prodCardEmptyNumber)
})

const detail = () => {
  console.log('detail')
}
</script>
<template>
  <nav
    style="overflow-y: auto; padding: 0 14px 0 22px;"
    class="fit flex flex-wrap justify-between">
    <ProdCard
      v-for="prodDataItem in filteredProdData"
      :key="'prodDataItem' + prodDataItem.building_id + prodDataItem.id"
      :floor="prodDataItem.floor"
      :rooms="prodDataItem.rooms"
      :square="prodDataItem.square"
      :prodNumber="prodDataItem.number"
      :price="prodDataItem.price" />
    <ProdCardEmpty
      v-for="item, index in prodCardEmptyArray"
      :key="'ProdCardEmpty' + index" />
  </nav>
</template>
