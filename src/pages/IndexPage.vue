<script setup lang="ts">
import CardComponent from "src/components/CardComponent.vue";
import { onMounted } from "vue";
import { useStore } from "../stores/store";
import CategoryComponent from "src/components/CategoryComponent.vue";
import EditDialogComponent from "src/components/EditDialogComponent.vue";
const store = useStore();

function editDocument() {
  store.many.document.id = store.app.selectedMany[0].id;
  store.app.showEditDialog = true;
}

onMounted(() => {
  store.many_GetAll();
});
</script>

<template>
  <q-page>
    <category-component style="margin: auto" />
    <div class="row justify-center q-ma-xl">
      <div v-for="(item, index) in store.many.documents" :key="item.id" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <CardComponent :index="index" @editDialog="editDocument()"></CardComponent>
        <edit-dialog-component />
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
h2 {
  font-size: 3vw;
}
</style>
