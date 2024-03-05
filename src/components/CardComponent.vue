<script>
import { useStore } from "src/stores/store";
import { ref } from "vue";
const store = useStore();
export default {
  props: ["index"],
  setup(props) {
    const id = ref(store.other.documents[props.index]._id);
    const title = ref(store.other.documents[props.index].cim);
    const description = ref(store.other.documents[props.index].leiras);
    const color = ref(store.other.documents[props.index].szin);
    const price = ref(store.other.documents[props.index].vetelar);
    const year = ref(store.other.documents[props.index].evjarat);
    const cc = ref(store.other.documents[props.index].hengerurtartalom);
    const date = ref(store.other.documents[props.index].hirdetes_datum);
    const images = ref(store.other.documents[props.index].kepek);
    const sliced = ref("");
    const toggled = ref(false);
    const handleToggle = (toggled) => {
      if (description.value.length <= 100) {
        sliced.value = description.value;
        return;
      }
      if (!toggled) {
        let lastWhiteSpaceIdx = -1;
        for (let index = 0; index < 100; index++) {
          sliced.value += description.value[index];
          if (description.value[index] == " ") {
            lastWhiteSpaceIdx = index;
          }
        }
        if (sliced.value[99] == " ") {
          sliced.value = sliced.value.slice(0, 98) + "...";
        } else {
          sliced.value = sliced.value.slice(0, lastWhiteSpaceIdx) + "...";
        }
      } else {
        sliced.value = description.value;
      }
    };

    return {
      slide: ref(1),
      toggled,
      description,
      id,
      title,
      color,
      year,
      cc,
      date,
      sliced,
      images,
      handleToggle,
      price,
    };
  },
  mounted() {
    this.handleToggle(false);
  },
};
</script>

<template>
  <q-card bordered class="q-ma-md" flat>
    <q-card-section class="text-center text-h5" style="background-color: #c8be9c">
      {{ title }} - {{ price }} Ft
    </q-card-section>
    <q-card-section class="text-h7" style="background-color: #ffe4c4">
      <ul>
        <li>
          <span>Szín: </span><b>{{ color }}</b>
        </li>
        <li>
          <span>Évjárat: </span><b>{{ year }}</b>
        </li>
        <li>
          <span>Hengerűrtartalom: </span><b>{{ cc }} cm<sup>2</sup></b>
        </li>
        <li>
          <span>Hirdetés dátuma: </span><b>{{ date }}</b>
        </li>
      </ul>
    </q-card-section>
    <q-card-section class="" style="background-color: #c8be9c">
      <div class="text-h7 text-justify">{{ toggled ? description : sliced }}</div>
      <hr />
      <q-toggle
        v-model="toggled"
        color="dark-blue"
        :disable="description.length <= 100"
        label="Teljes leirás"
        @update:model-value="handleToggle"
      />
    </q-card-section>
    <q-card-section v-if="images.length == 1" style="background-color: #ffe4c4">
      <div class="q-img q-img--menu" role="img" style="max-height: 200px">
        <div style="padding-bottom: 75%"></div>
        <div class="q-img__container absolute-full">
          <img
            aria-hidden="true"
            class="q-img__image q-img__image--with-transition q-img__image--loaded"
            draggable="false"
            fetchpriotity="auto"
            loading="lazy"
            :src="images[0]"
            style="object-fit: scale-down; object-position: 50% 50%"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section v-if="images.length != 1" style="background-color: #ffe4c4">
      <q-carousel v-model="slide" style="height: 200px" thumbnails>
        <q-carousel-slide v-for="(item, idx) in images" :key="idx" :img-src="images[idx]" :name="idx + 1" />
      </q-carousel>
    </q-card-section>
    <!-- TODO I hate bootstrap -->
    <q-card-section style="background-color: #c8be9c">
      <div v-for="(item, id) in images" :key="id" class="text-h7 text-justify">{{ slide - 1 }} - {{ item }}</div>
    </q-card-section>
    <q-card-actions class="justify-center" style="background-color: #ffe4c4">
      <q-btn
        class="bg-green-3"
        label="Hirdetés szerkesztése"
        no-caps
        type="button"
        @click="$emit('editDialog')"
      ></q-btn>
    </q-card-actions>
  </q-card>
</template>
<style lang="sass" scoped></style>
