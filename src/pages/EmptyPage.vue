<script setup lang="ts">
import CardComponent from "src/components/CardComponent.vue";
import { useStore } from "src/stores/store";
import { ref, watch } from "vue";
import { onMounted } from "vue";
import NewEditDialog from "src/components/NewEditDialog.vue";
import CategoryComponent from "src/components/CategoryComponent.vue";

const store = useStore();
const selectedCategoryName = ref("Személyautó");
const list = ref([]);

onMounted(() => {
  store.getAllCategories();
  store.one_GetAll();
  // store.other_GetAll(selectedCategoryName.value.nev);
  store.other_GetAll(selectedCategoryName.value);
});

function editDocument(hirdetes) {
  store.many.document._id = hirdetes._id;
  store.app.showEditDialog = true;
}
watch(
  () => store.other.documents,
  (newDocuments) => {
    list.value = newDocuments;
  },
);
</script>
<template>
  <q-page>
    <CategoryComponent />

    <div class="row justify-center q-ma-xl">
      <div v-for="(item, index) in list" :key="index" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <CardComponent :index="index" @editDialog="editDocument(item)"></CardComponent>
      </div>
    </div>
  </q-page>
  <NewEditDialog />
</template>
<style lang="scss" scoped></style>
