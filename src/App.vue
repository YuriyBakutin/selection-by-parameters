<script lang="ts" setup>
import getProdData from '@/helpers/getProdData'

const store = useStore()
const prodData = computed(() => store.state.prodData)

store.commit('updateProdData', getProdData())
store.commit('initFilters')

</script>

<template>
<div class="frame">
  <div class="envelope">
    <div class="content flex flex-column justify-start">
      <header style="margin-bottom: 34px;">
        <h1 class="mt0">Lorem ipsum dolor sit</h1>
      </header>
      <FilterPool />
      <ProdPull />
    </div>
  </div>
</div>
</template>

<style>
@import "../node_modules/basscss/css/basscss.css";
@import "./styles/main.css";
.frame {
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 80px;
  right: 80px;
  bottom: 80px;
  left: 80px;
}
.envelope {
  background-color: #f8f8f8;
  border-radius: 10px;
  position: absolute;
  top: 30px;
  right: 30px;
  bottom: 30px;
  left: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 36px 20px 30px 20px;
}
.content {
  width: 1236px;
}
body {
  background-color: #2f2e2d;
  color: #2c323a;
}
</style>
