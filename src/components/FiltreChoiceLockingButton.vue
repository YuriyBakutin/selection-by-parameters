<script lang="ts" setup>
const store = useStore()

const props = defineProps<{
  filterName: string,
  variantName: string,
  isLast: boolean,
}>()

const displayGap = computed(() => props.isLast ? 'none' : 'inline-block')

const checked = computed({
  get() {
    return store.getters.getFilterVariantChecked(props.filterName, props.variantName)
  },
  set(v: boolean) {
    store.commit('setFilterVariantChecked', {
      filterName: props.filterName,
      variantName: props.variantName,
      checked: v,
    })
  },
})

const toggleChecked = () => {
  checked.value = !checked.value
}

</script>
<template>
  <button
    @click="toggleChecked()"
    class="control-frame h0 bold pointer"
    style="width: 47px;"
    tabindex="1"
    :class="{ checked: checked }">
    {{props.variantName}}
  </button>
  <div
    :style="{display: displayGap}"
    class="lockingButtonGap">
  </div>
</template>
<style>
.lockingButtonGap {
  width: 4px;
  visibility: hidden;
}
.hidden {
  display: none;
}
</style>
