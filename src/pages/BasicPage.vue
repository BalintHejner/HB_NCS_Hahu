<script setup lang="ts">
import { Ref, reactive, ref } from "vue";
import YesOrNoComponent from "../components/YesOrNoComponent.vue";
import YesOrNoComponentStore from "../components/YesOrNoComponentStore.vue";
import { useStore } from "../stores/store";

const store = useStore();

const yn = store.app.yesNoComp;


let nemReaktívVáltozó: number = 123;
let reaktív1 = ref(123); // típusjelölés nélküli reaktív változó
let reaktív2: Ref<number> = ref(123); // típusjelöléssel

interface IReaktívObjektum {
  darab: number;
  név: string;
  jegy: number;
  db: number;
  napok: string[];
  színek: string[];
  iNap: string;
  yesOrNoResult: boolean | string;
}

const r = reactive<IReaktívObjektum>({
  darab: 123,
  név: "Laci",
  jegy: 0,
  db: 3,
  napok: ["hétfő", "kedd", "szerda"],
  színek: ["yellow", "blue", "red", "magenta", "cyan"],
  iNap: "",
  yesOrNoResult: "Még nincs válasz",
});

setInterval(() => {
  // nemReaktívVáltozó++;
  // console.log(nemReaktívVáltozó);
  reaktív1.value++;
  reaktív2.value++;
  r.darab++;
}, 1000);

function ezJóNap(): boolean {
  const jóNapok: string[] = ["hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat", "vasárnap"];
  return jóNapok.includes(r.iNap);
}

function ezTörölhetőNap(): boolean {
  return r.napok.includes(r.iNap);
}

function ezHozzáadhatóNap(): boolean {
  return ezJóNap() && !r.napok.includes(r.iNap);
}

function napotHozzáad(): void {
  r.napok.push(r.iNap);
  r.iNap = "";
}

function napotTöröl() {
  r.napok = r.napok.filter((e) => e !== r.iNap);
  r.iNap = "";
}

function yesOrNoHandler(res: boolean): void {
  r.yesOrNoResult = res ? "Ki kérdezi?" : "Mi az a jedlik?";
}
</script>

<template>
  <q-page>
    <div class="row">
      <!-- Sztring interpoláció: {{  }} -->
      <!-- Csak a nyitó- és zárótagek között használható! -->
      <!-- rektív: Változó értéke megváltozik, akkor az oldalon is látszik -->
      <div class="col-xs-12 col-md-6 q-pa-sm">
        <q-banner class="bg-secondary"> Nem reaktív változó értéke: {{ nemReaktívVáltozó }} </q-banner>
      </div>
      <!-- v-bind vue direktíva, egyirányú adatkötést biztosít, rövidítése ":" -->
      <div class="col-xs-12 col-md-6 q-pa-sm">
        <q-banner class="bg-secondary" :class="reaktív1 % 2 == 0 ? 'text-white' : 'text-yellow'">
          Reaktív változó értéke: {{ reaktív1 }}
        </q-banner>
      </div>
      <div class="col-xs-12 col-md-6 q-pa-sm">
        <q-banner class="bg-secondary"> Reaktív objektum - Név: {{ r.név }} darab: {{ r.darab }} </q-banner>
      </div>
      <!-- v-if és v-else direktívák -->
      <div class="col-xs-12 col-md-6 q-pa-sm">
        <q-banner class="bg-secondary">
          <span v-if="r.darab % 2 == 0">A szám páros</span>
          <span v-else> A szám páratlan</span>
          <span v-show="r.darab % 2 == 0">Ott van a DOM-ban, de nem látszik (display: none)</span>
        </q-banner>
      </div>
      <div class="col-xs-12 col-md-6 q-pa-sm">
        <q-banner class="bg-secondary">
          <q-input
            v-model="r.jegy"
            class="inline q-mr-lg"
            clearable
            color="yellow"
            dark
            label="Osztályzat"
            label-color="black"
            outlined
            style="width: 150px"
            type="number"
          />
          <span v-if="r.jegy == 1">Elégtelen</span>
          <span v-else-if="r.jegy == 2">Elégséges</span>
          <span v-else-if="r.jegy == 3">Közepes</span>
          <span v-else-if="r.jegy == 4">Jó</span>
          <span v-else-if="r.jegy == 5">Jeles</span>
          <span v-else>Ez nem édremjegy!</span>
        </q-banner>
      </div>
      <!-- v-on direktíva: eseménykezelő megadása -->
      <!-- rövidítése v-on:click="eseménykezelő" -->
      <!-- helyett @click="eseménykelő" -->
      <div class="col-xs-12 col-md-6 q-pa-sm">
        <q-banner class="bg-secondary">
          <q-btn color="primary" :disable="r.db <= 1" glossy icon="mdi-minus" @click="r.db--" />
          <q-input
            v-model="r.db"
            class="inline q-mx-lg"
            color="yellow"
            label-color="black"
            outlined
            style="width: 60px"
          />
          <q-btn color="primary" :disable="r.db >= 5" glossy icon="mdi-plus" @click="r.db++" />
        </q-banner>
      </div>

      <div class="col-xs-12 col-md-6 q-pa-sm">
        <q-banner class="bg-secondary">
          <span v-for="(c, i) in r.színek" :key="i" :style="{ color: c }">{{
            i != r.színek.length - 1 ? c + ", " : c
          }}</span>
        </q-banner>
      </div>

      <!-- v-for gyakorlás -->
      <div class="col-xs-12 col-md-6 q-pa-sm">
        <q-banner class="bg-secondary">
          <ul>
            <li v-for="nap in r.napok" :key="nap">{{ nap }}</li>
          </ul>
        </q-banner>
      </div>

      <div class="col-xs-12 col-md-6 q-pa-sm">
        <q-banner class="bg-secondary">
          <q-input
            v-model="r.iNap"
            bg-color="primary"
            class="inline q-ma-sm"
            color="yellow"
            input-class="text-white"
            label="Kérem a nap nevét"
            outlined
            style="width: 30%"
          />
          <q-btn
            class="q-ma-sm"
            color="green"
            :disable="!ezHozzáadhatóNap()"
            glossy
            label="Napot hozzáad"
            no-caps
            style="width: 30%"
            @click="napotHozzáad()"
          />
          <q-btn
            class="q-ma-sm"
            color="red"
            :disable="!ezTörölhetőNap()"
            glossy
            label="Napot töröl"
            no-caps
            style="width: 30%"
            @click="napotTöröl()"
          />
        </q-banner>
      </div>

      <div class="col-xs-12 col-md-6 q-pa-sm">
        <q-banner class="bg-secondary">
          <YesOrNoComponent igen-felirat="Na-ná!" kérdés="Jedlikes vagy?" nemFelirat="Sajnos nem :-(" @btnPressed="yesOrNoHandler" />
          Választott: {{ r.yesOrNoResult }}
        </q-banner>
      </div>

      <div class="col-xs-12 col-md-6 q-pa-sm">
        <q-banner class="bg-secondary">
          <YesOrNoComponentStore />
          Választott: {{ yn.válasz }}
        </q-banner>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
