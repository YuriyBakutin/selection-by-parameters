<script lang="ts" setup>
const store = useStore()

const submitFilter = () => {
  store.commit('connectFilters')
}

const resetFilter = () => {
  store.commit('initFilters')
}

</script>

<template>
  <div style="width: 200px; height: 73px; text-align: center;">
    <button @click="submitFilter"
      class="control-frame checked h1 bold pointer submit">Применить</button>
    <button @click="resetFilter"
      tabindex="0"
      class="h5 bold pointer inline-block reset">сбросить фильтр</button>
  </div>
</template>
<style scoped>
.submit {
  width: 200px;
  text-transform: uppercase;
  margin-top: 12px;
}
.reset {
  background: none;
  text-transform: uppercase;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid #70d24e;
  padding: 1px; margin-top: 11px;
  outline:0 none !important;
}
.reset:focus{
  outline: none !important;
  border-bottom-width: 2px;
  outline:0 none !important;
}
</style>