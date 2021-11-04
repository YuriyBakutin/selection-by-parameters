<script lang="ts" setup>
const store = useStore()
const filteredProdData = computed(() => store.getters.getFilteredProdData)

const prodPull = ref(null as HTMLElement | null)
const hasYScroll = ref(false)

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

const setHasYScroll = () => {
  nextTick(() => {
    if (!prodPull.value) {
      hasYScroll.value = false

      return
    }

    hasYScroll.value = prodPull.value.scrollHeight > prodPull.value.clientHeight
  })
}

watch(filteredProdData, () => {
  setHasYScroll()
})

onMounted(() => {
  window.addEventListener('resize', setHasYScroll)
  setHasYScroll()
})

onUnmounted(() => {
  window.removeEventListener('resize', setHasYScroll)
})

</script>
<template>
  <nav
    ref="prodPull"
    style="overflow-y: auto; padding: 0 0 0 12px;"
    :style="{paddingRight: hasYScroll ? '0' : '12px'}"
    class="fit flex flex-wrap">
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
