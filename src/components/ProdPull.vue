<script lang="ts" setup>

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
    class="fit flex flex-wrap"
    style="background-color: bisque; margin-top: 49px;">
    <ProdCard
      :floor="product.floor"
      :rooms="product.rooms"
      :square="product.square"
      :prodNumber="product.prodNumber"
      :price="product.price"
     />
  </nav>
</template>
