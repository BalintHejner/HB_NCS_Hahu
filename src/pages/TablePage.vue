<script setup lang="ts">
import { useStore, IMany } from "../stores/store";
import { onMounted } from "vue";
import { QTableColumn } from "quasar";
import NewDialogComponent from "../components/NewDialogComponent.vue";
import EditDialogComponent from "../components/EditDialogComponent.vue";
const store = useStore();

const columns: QTableColumn[] = [
  { name: "id", label: "Azon", field: "id", align: "left", sortable: true },
  { name: "titleField", label: "Cím", field: "titleField", align: "left", sortable: true },
  {
    name: "descField",
    label: "Leírás",
    field: (row: IMany) => {
      const desc: string = row.descField as string;
      if (desc.length > 130) {
        return desc.slice(0, 124) + "...";
      } else {
        return desc;
      }
    },
    align: "left",
    sortable: true,
  },
  {
    name: "categoryNameField",
    label: "Kategória",
    field: (row: IMany) => row.category?.categoryNameField,
    align: "left",
    sortable: true,
  },
  { name: "imgField", label: "Kép", field: "imgField", align: "center" },
  { name: "boolField", label: "Tehermentes", field: "boolField", align: "center" },
];

onMounted(() => {
  store.many_GetAll();
});

function deleteDocument(): void {
  store.many.document = { id: store.app.selectedMany[0].id };
  store.many_DeleteById();
  // selected.value = [];
  store.app.selectedMany = [];
}

function editDocument() {
  store.many.document.id = store.app.selectedMany[0].id;
  store.app.showEditDialog = true;
}

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
  <q-page>
    <q-input
      v-model="store.app.filter"
      clearable
      dense
      filled
      label="Filter"
      style="width: 400px; margin: auto;"
      type="text"
      @update:model-value="filterUpdate()"
    />
    <q-table
      v-model:selected="store.app.selectedMany"
      :columns="columns"
      :rows="store.many.documents"
      selection="multiple"
      title="Hahu hirdetések"
      wrap-cells
    >
      <!-- Slot-ok: -->
      <template #body-cell-imgField="props">
        <q-td :props="props">
          <q-img class="myImg" :src="props.value" width="150px" />
        </q-td>
      </template>

      <template #body-cell-boolField="props">
        <q-td :props="props">
          <q-badge v-if="props.value" color="green" label="Igen" outline />
          <q-badge v-else color="red" label="Nem" outline />
        </q-td>
      </template>
    </q-table>
    <NewDialogComponent />
    <EditDialogComponent />
    <!-- {{ store.app.selected }} -->

    <!-- Buttons: -->
    <div class="row justify-center q-mt-sm q-gutter-md">
      <q-btn color="green" label="Új hirdetés" no-caps @click="store.app.showNewDialog = true" />
      <q-btn
        v-show="store.app.selectedMany.length == 1"
        color="red"
        label="Hirdetés törlése"
        no-caps
        @click="deleteDocument()"
      />
      <q-btn
        v-show="store.app.selectedMany.length == 1"
        color="red"
        label="Hirdetés szerkesztése"
        no-caps
        @click="editDocument()"
      />
      <q-btn
        v-show="store.app.selectedMany.length != 0"
        color="green"
        label="Kijelölés törlése"
        no-caps
        @click="store.app.selectedMany = []"
      />
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.myImg {
  border-radius: 20px;
}
</style>
