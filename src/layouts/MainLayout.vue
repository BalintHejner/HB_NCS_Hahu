<script setup lang="ts">
import { ref } from "vue";

let showMenuBar = ref(true);
</script>

<template>
  <q-layout>
    <!-- Fejléc -->
    <q-header v-model="showMenuBar" class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> Dolgozat Minta </q-toolbar-title>
        <q-tabs>
          <q-route-tab label="Home" name="home" no-caps to="/"  />
          <q-route-tab label="Basic" name="basic" no-caps to="/basic"/>
        </q-tabs>
      </q-toolbar>
    </q-header>

    <!-- A router ide (router-view) tölti be az oldalt -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.active {
  background-color: #dddddd;
}
</style>
