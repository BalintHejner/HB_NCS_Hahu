<script setup lang="ts">
import { useStore } from "src/stores/store";
import { ref } from "vue";

const selectedCategoryName = ref("Személyautó");

const store = useStore();

store.one_GetAll().then((res) => console.log(res));

const selectionChanged = () => {
  store.other_GetAll(selectedCategoryName.value);
};
</script>

<template>
  <div class="q-pa-md select row justify-center">
    <q-select
      v-model="selectedCategoryName"
      emit-value
      label="Kategória"
      map-options
      option-label="nev"
      option-value="nev"
      :options="store.many.documents"
      @update:model-value="selectionChanged()"
    ></q-select>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  font-size: 3vw;
}
.select {
  width: 100%;
}
</style>
