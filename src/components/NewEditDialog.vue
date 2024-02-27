<script setup lang="ts">
import { useStore } from "../stores/store";
import { Dialog } from "quasar";
const store = useStore();

function ShowDialog() {
  store.one_GetAll();
  store.many_GetById();
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
      Close();
    })
    .onCancel(() => {});
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
          <q-select
            v-model="store.many.document.kategoria"
            clearable
            emit-value
            label="Kategória"
            map-options
            option-label="nev"
            option-value="id"
            :options="store.many.documents"
            :rules="[(v) => v != null || 'Kérem válasszon kategóriát!']"
          />
          <q-input
            v-model="store.many.document.cim"
            filled
            label="Cím"
            :rules="[(v) => (v != null && v != '') || 'A hirdetés címe nem lehet üres!']"
            type="text"
          />
          <q-input
            v-model="store.many.document.leiras"
            filled
            label="Leírás"
            :rules="[(v) => (v != null && v != '') || 'Kérem töltse ki a leírást!']"
            type="textarea"
          />
          <q-input v-model="store.many.document.datum" filled label="Hirdetés dátuma" type="date" />
          <q-checkbox v-model="store.many.document.serulesmentes" filled label="Sérülésmentes"></q-checkbox>
          <q-input
            v-model="store.many.document.ar"
            filled
            label="Meghírdetett ár"
            :rules="[(v) => (v != null && v != '') || 'A hirdetés ára nem lehet üres!']"
            type="number"
          />
          <q-input v-model="store.many.document.kepek" filled label="Fotó az eladó járműről" type="text" />
          <div></div>
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
