<script setup lang="ts">
import CardComponent from "src/components/CardComponent.vue";
import { onMounted } from "vue";
import { useStore } from "../stores/store";
import EditDialogComponent from "src/components/EditDialogComponent.vue";
const store = useStore();

onMounted(() => {
  store.many_GetAll();
  store.app.showEditDialog = true;

});

function editDocument() {
  store.many.document.id = store.app.selectedMany[0].id;
  store.app.showEditDialog = true;
}
</script>

<template>
  <q-page>
    <div>
      <q-banner>
         wahhhh
      </q-banner>
      <card-component />
    </div>
    <EditDialogComponent />

    <div class="row justify-center q-mt-sm q-gutter-md">
      <q-btn
        v-show="store.app.selectedMany.length == 1"
        color="red"
        label="Hirdetés szerkesztése"
        no-caps
        @click="editDocument()"
      />
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
h2 {
  font-size: 3vw;
}
</style>
