<script>
export default {
  name: "MyCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>

    <q-card-section>
      {{ content }}
    </q-card-section>
  </q-card>
</template>

<style>
.my-card {
  max-width: 300px;
}
</style>
