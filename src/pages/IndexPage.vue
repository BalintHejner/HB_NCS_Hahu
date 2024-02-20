<script setup lang="ts">
import CardComponent from "src/components/CardComponent.vue";
import { onMounted } from "vue";
import { useStore } from "../stores/store";
import EditDialogComponent from "src/components/EditDialogComponent.vue";
import CategoryComponent from "src/components/CategoryComponent.vue";
const store = useStore();

onMounted(() => {
  store.many_GetAll();
});
</script>

<template>
  <q-page>
    <category-component style="margin: auto" />
    <card-component />
    <!-- <card-component v-for="card in store.many.documents" :key="card.id" :card="card" /> -->
    <EditDialogComponent />
  </q-page>
</template>

<style lang="scss" scoped>
h2 {
  font-size: 3vw;
}
</style>
