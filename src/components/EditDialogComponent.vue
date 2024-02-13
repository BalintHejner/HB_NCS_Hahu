<script setup lang="ts">
import { useStore } from "../stores/store";
import { Dialog } from "quasar";
const store = useStore();

function ShowDialog() {
  // kategórák kiolvasása az "egy" oldalról
  store.one_GetAll();
  store.many_GetById(); // Before show dialog set "store.many.document.id" field!!!
}

function HideDialog() {
    store.many.document = {};
}

function Close() {
  store.app.showEditDialog = false;
}

function Submit() {
  Dialog.create({
    title: "Megerősítés",
    message: "Szeretnéd menteni a változásokat?",
    ok: "Igen",
    cancel: "Nem",
    persistent: true,
  })
    .onOk(() => {
      store.many_EditById();
      // router.push("/xcard");
    })
    .onCancel(() => {
      // router.push("/xcard");
    });
}

function Reset() {
  store.many.document = { ...store.many.documentOld };
}
</script>

<template>
  <q-dialog v-model="store.app.showEditDialog" persistent @hide="HideDialog()" @show="ShowDialog()">
    <q-card class="q-pa-md q-gutter-md" style="width: 60vw; min-width: 300px">
      <q-form @reset="Reset()" @submit="Submit()">
        <div class="q-gutter-md">
          <h5 class="text-center">Hirdetés szerkesztése</h5>
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
          <q-input
            v-model="store.many.document.descField"
            filled
            label="Leírás"
            :rules="[(v) => (v != null && v != '') || 'Kérem töltse ki a leírást!']"
            type="textarea"
          />
          <div class="row justify-center q-gutter-lg">
            <q-btn color="green" label="Save" no-caps type="submit" />
            <q-btn color="red" label="Reset" no-caps type="reset" />
            <q-btn color="blue" label="Close" no-caps @click="Close()" />
          </div>
        </div>
      </q-form>
      <!-- {{ store.many.document }} -->
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped></style>
