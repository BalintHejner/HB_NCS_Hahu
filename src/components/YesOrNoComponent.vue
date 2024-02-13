<script setup lang="ts">
interface IParams {
  kérdés?: string;
  igenFelirat?: string;
  nemFelirat?: string;
}

// const props = defineProps<IParams>();
const p = withDefaults(defineProps<IParams>(), {
  kérdés: "Igen vagy nem?",
  igenFelirat: "Igen",
  nemFelirat: "Nem",
});

const emit = defineEmits<{
  (e: "btnPressed", result: boolean): void;
}>();
</script>

<template>
  <div class="row bg-blue justify-center q-pa-md">
    <div class="col-6">
      {{ p.kérdés }}
      <q-btn class="q-ma-sm" color="green" glossy :label="p.igenFelirat" no-caps @click="emit('btnPressed', true)" />
      <q-btn class="q-ma-sm" color="red" glossy :label="p.nemFelirat" no-caps @click="emit('btnPressed', false)" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
