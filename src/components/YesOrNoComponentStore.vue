<script setup lang="ts">
import { useStore } from "../stores/store";

const store = useStore();

const yn = store.app.yesNoComp;


</script>

<template>
  <div class="row bg-blue justify-center q-pa-md">
    <div class="col-6">
      {{ store.app.yesNoComp.kérdés }}
      {{ yn.kérdés }}
      <q-btn class="q-ma-sm" color="green" glossy :label="yn.pozitívGomb" no-caps @click="yn.válasz = true" />
      <q-btn class="q-ma-sm" color="red" glossy :label="yn.negatívGomb" no-caps @click="yn.válasz = false" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
