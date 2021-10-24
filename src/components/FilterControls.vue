<script lang="ts" setup>
const store = useStore()

const submitFilter = () => {
  console.log('submitFilter')
}

const dropFilter = () => {
  store.commit('initFilters')
}

</script>

<template>
  <div style="width: 200px; height: 73px; text-align: center;">
    <button @click="submitFilter"
      class="control-frame checked h1 bold pointer submit">Применить</button>
    <div @click="dropFilter"
      tabindex="0" class="h5 bold pointer inline-block drop">сбросить фильтр</div>
  </div>
</template>
<style scoped>
.submit {
  width: 200px;
  text-transform: uppercase;
  margin-top: 12px;
}
.drop {
  text-transform: uppercase;
  border-bottom: 1px solid #70d24e;
  padding: 1px; margin-top: 11px;
}
.drop:focus{
  outline: none !important;
  border-bottom-width: 2px;
}
</style>