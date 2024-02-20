<script setup lang="ts">
import { useStore } from "src/stores/store";
import { onMounted, ref } from "vue";
const store = useStore();

const cim = ref(store.many.document.titleField)
const teljesLeiras = ref(false);
const expanded = ref(false);
const slide = ref(0);

onMounted(() => {
  store.many_GetAll();
});

function editDocument() {
  store.many.document.id = store.app.selectedMany[0].id;
  store.app.showEditDialog = true;
}

</script>

<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card bordered class="my-card" flat>
      <q-card-section style="background-color: #c8be9c">
        <div class="text-h5 q-mt-sm text-center q-mb-sm">{{ cim }} - {{ store.many.document.priceField }}</div>
      </q-card-section>

      <q-card-section style="background-color: #ffe4c4">
        <ul>
          <li>
            Szín: <b> {{ store.many.document.colorField }} </b>
          </li>
          <li>
            Évjárat: <b> {{ store.many.document.ageField }} </b>
          </li>
          <li>
            Hengerűrtaltalom: <b> {{ store.many.document.ccField }} cm <sup>2</sup> </b>
          </li>
          <li>
            Hirdetés dátuma: <b> {{ store.many.document.dateField }} </b>
          </li>
        </ul>
      </q-card-section>

      <q-card-section style="background-color: #c8be9c">
        <div class="q-mt-sm text-justify q-mb-sm">{{ store.many.document.descField }}</div>
        <q-separator inset />
        <q-toggle v-model="teljesLeiras" label="Teljes leírás" />
      </q-card-section>

      <q-card-section v-if="store.many.document.imgField?.length === 1" class="bg-primary">
        <q-img :src="store.many.document.imgField[0]" />
      </q-card-section>

      <q-card-section v-else style="background-color: #ffe4c4">
        <div class="q-pa-md">
          <q-carousel v-model="slide" animated infinite swipeable thumbnails>
            <q-carousel-slide v-for="(kep, index) in store.many.document.imgField" :key="index" :img-src="kep" :name="index" />
          </q-carousel>
        </div>
      </q-card-section>

      <q-card-section style="background-color: #c8be9c">
        <div v-for="(kep, index) in store.many.document.imgField" :key="index">
          {{ kep }}
        </div>
      </q-card-section>

      <q-card-section style="background-color: #ffe4c4">
        <div class="row justify-center q-mt-sm q-gutter-md">
          <q-btn
            label="Hirdetés szerkesztése"
            no-caps
            stack
            style="background-color: lightgreen"
            @click="editDocument()"
          />
        </div>
      </q-card-section>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subtitle2">
            
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 30%,
</style>
