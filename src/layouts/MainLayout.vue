<script setup lang="ts"></script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-blue-5 text-white" elevated>
      <q-toolbar>
        <q-toolbar-title shrink style="cursor: pointer; font-size: 28px" title> Dolgozat minta </q-toolbar-title>
        <q-btn class="active" flat label="Home" no-caps to="/"> </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.active {
  background-color: #44a5f1;
  color: #ff0;
}
</style>
