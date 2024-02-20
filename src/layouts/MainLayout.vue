<script setup lang="ts">
import { ref } from "vue";

let showMenuBar = ref(true);
</script>

<template>
  <q-layout>
    <!-- Fejléc -->
    <q-header v-model="showMenuBar" class="bg-blue-5 shadow-5 text-white">
      <q-toolbar>
        <q-toolbar-title style="font-size: 20px"> Dolgozat Minta </q-toolbar-title>
        <q-tabs id="tabs" class="text-white-14 text-left text-weight-light" style="color: yellow">
          <q-route-tab label="Home" name="home" no-caps to="/" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-card class="bg-amber-1">Sanyi</q-card>
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

#tabs {
  position: absolute;
  margin-left: 9rem;
}
</style>
