<script lang="ts" setup>
const store = useStore()
const filteredProdData = computed(() => store.getters.getFilteredProdData)

const product = {
  floor: 10,
  rooms: 1,
  square: 23.66,
  prodNumber: '163',
  price: 2956317,
}

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
      :price="prodDataItem.price"
     />
  </nav>
</template>
