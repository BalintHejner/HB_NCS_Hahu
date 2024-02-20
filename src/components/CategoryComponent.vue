<script setup lang="ts">
//import { useStore } from "src/stores/store";
import { useStore } from "src/stores/store";

const store = useStore();

store.one_GetAll().then((res) => console.log(res));

function filterUpdate() {
  if (!store.app.filter) {
    store.app.filter = "";
  }
  if (store.app.filter.length > 0) {
    store.many_Filter();
  } else {
    store.many_GetAll();
  }
}
</script>

<template>
  <div class="q-pa-md select" style="max-width: 300px">
    <div class="q-gutter-md">
      <!-- <q-badge color="secondary" multi-line>
        Model: "{{ model }}"
      </q-badge> -->
      <q-select
        v-model="store.one.document.categoryNameField"
        filled
        label="Kategória"
        option-label="nev"
        option-value="_id"
        :options="store.one.documents"
        @update:model-value="filterUpdate()"
      />
    </div>
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
