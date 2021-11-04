<script lang="ts" setup>
import getProdData from '@/helpers/getProdData'

const store = useStore()
const prodData = computed(() => store.state.prodData)

store.commit('updateProdData', getProdData())
store.commit('initFilters')

const content = ref(null as HTMLElement | null)
</script>
<template>
  <div class="frame">
    <div class="envelope">
      <div ref="content" class="content flex flex-column justify-start">
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
body {
  background-color: #2f2e2d;
  color: #2c323a;
}
.frame {
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  width: 1376px;
  top: 80px;
  right: 0;
  bottom: 80px;
  left: 0;
  margin-left: auto;
  margin-right: auto;
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
  margin-left: 6px;
  margin-right: 6px;
}
@media (min-width: 856px) {
  .frame {
    width: 796px;
  }
}
@media (min-width: 1126px) {
  .frame {
    width: 1066px;
  }
}
@media (min-width: 1396px) {
  .frame {
    width: 1336px;
  }
}
</style>
