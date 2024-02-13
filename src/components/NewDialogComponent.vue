<script setup lang="ts">
import { useStore } from "../stores/store";
import { Dialog } from "quasar";
const store = useStore();

function ShowDialog() {
  // kategórák kiolvasása az "egy" oldalról
  store.one_GetAll();
}

function HideDialog() {
  store.many.document = {};
}

function Close() {
  store.app.showNewDialog = false;
}

function Submit() {
  Dialog.create({
    title: "Megerősítés",
    message: "Szeretnéd menteni az új hirdetést?",
    ok: "Igen",
    cancel: "Nem",
    persistent: true,
  })
    .onOk(() => {
      store.many_Create();
      // router.push("/xcard");
    })
    .onCancel(() => {
      // router.push("/xcard");
    });
}
</script>

<template>
  <q-dialog v-model="store.app.showNewDialog" persistent @hide="HideDialog()" @show="ShowDialog()">
    <q-card class="q-pa-md q-gutter-md" style="width: 60vw; min-width: 300px">
      <q-form @submit="Submit()">
        <div class="q-gutter-md">
          <h5 class="text-center">Új hirdetés hozzáadása</h5>
          <q-input
            v-model="store.many.document.titleField"
            filled
            label="Cím"
            :rules="[(v) => (v != null && v != '') || 'A hirdetés címe nem lehet üres!']"
            type="text"
          />
          <q-select
            v-model="store.many.document.categoryId"
            clearable
            emit-value
            label="Kategória"
            map-options
            option-label="categoryNameField"
            option-value="id"
            :options="store.one.documents"
            :rules="[(v) => v != null || 'Kérem válasszon kategóriát!']"
          />
          <q-input v-model="store.many.document.descField" filled label="Leírás" type="textarea" />

          <div class="row justify-center q-mt-md q-gutter-lg">
            <q-btn color="red" label="Close" no-caps @click="Close()" />
            <q-btn color="green" label="Save document" no-caps type="submit" />
          </div>
        </div>
      </q-form>
      <!-- {{ store.many.document }} -->
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped></style>
