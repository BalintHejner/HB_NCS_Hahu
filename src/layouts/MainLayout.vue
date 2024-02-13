<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

let { locale } = useI18n();

let showMenuBar = ref(true);
let showLeftDrawer = ref(false);
let showRightDrawer = ref(false);
let showStatusBar = ref(true);

function toggleLanguage() {
  locale.value = locale.value == "hu" ? "en" : "hu";
}
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <!-- Fejléc -->
    <q-header v-model="showMenuBar" class="bg-primary text-white" elevated>
      <q-toolbar>
        <q-btn
          dense
          flat
          icon="mdi-menu"
          round
          :title="$t('menu')"
          @click="showLeftDrawer = !showLeftDrawer"
        />

        <q-toolbar-title>
          <q-avatar>
            <q-img src="../assets/Jedlik_small.png" />
          </q-avatar>
          Jedlik
        </q-toolbar-title>

        <q-tabs v-if="$q.screen.gt.sm" inline-label shrink>
          <q-route-tab icon="mdi-home" label="Home" no-caps to="/" />
          <q-route-tab
            icon="mdi-page-layout-body"
            label="Empty"
            no-caps
            to="/empty"
          />
          <q-route-tab
            icon="mdi-school-outline"
            label="Basic"
            no-caps
            to="/basic"
          />
          <q-route-tab
            icon="mdi-table"
            label="qTable"
            no-caps
            to="/table"
          />
        </q-tabs>
        <q-btn flat icon="mdi-comment-text-multiple" @click="toggleLanguage">
          <q-badge color="red" floating :label="locale" />
        </q-btn>
        <q-btn flat icon="mdi-theme-light-dark" @click="$q.dark.toggle" />
        <q-btn
          dense
          flat
          icon="mdi-menu"
          round
          :title="$t('links')"
          @click="showRightDrawer = !showRightDrawer"
        />
      </q-toolbar>
    </q-header>

    <!-- Oldalsáv a bal oldalon -->
    <q-drawer v-model="showLeftDrawer" elevated side="left" :width="150">
      <q-tabs inline-label vertical>
        <q-banner class="bg-secondary text-white">{{ $t("menu") }}</q-banner>
        <q-route-tab
          :class="{ active: $route.path === '/' }"
          icon="mdi-home"
          label="Home"
          no-caps
          to="/"
        />
        <q-route-tab
          :class="{ active: $route.path === '/empty' }"
          icon="mdi-page-layout-body"
          label="Empty"
          no-caps
          to="/empty"
        />
        <q-route-tab
            :class="{ active: $route.path === '/basic' }"
            icon="mdi-school-outline"
            label="Basic"
            no-caps
            to="/basic"
          />
          <q-route-tab
            :class="{ active: $route.path === '/table' }"
            icon="mdi-table"
            label="qTable"
            no-caps
            to="/table"
          />
      </q-tabs>
    </q-drawer>

    <!-- Oldalsáv a jobb oldalon -->
    <q-drawer v-model="showRightDrawer" elevated side="right" :width="150">
      <q-tabs inline-label vertical>
        <q-banner class="bg-secondary text-white">{{ $t("links") }}</q-banner>
        <q-route-tab
          href="https://quasar.dev/"
          label="Quasar Dev"
          no-caps
          target="_blank"
        />
        <q-route-tab
          href="https://vuejs.org/"
          label="Vue.JS"
          no-caps
          target="_blank"
        />
        <q-route-tab
          href="https://router.vuejs.org/"
          label="Vue Router"
          no-caps
          target="_blank"
        />
        <q-route-tab
          href="https://www.typescriptlang.org/"
          label="TypeScript"
          no-caps
          target="_blank"
        />
        <q-route-tab
          href="https://pinia.vuejs.org/"
          label="Pinia"
          no-caps
          target="_blank"
        />
        <q-route-tab
          href="https://pictogrammers.com/library/mdi/"
          label="MDI Icons"
          no-caps
          target="_blank"
        />
        <q-route-tab
          href="https://mui.com/material-ui/material-icons/"
          label="Material Icons"
          no-caps
          target="_blank"
        />
        <q-route-tab
          href="https://eslint.org/"
          label="ESLint"
          no-caps
          target="_blank"
        />
        <q-route-tab
          href="https://github.com/typicode/json-server"
          label="JSON Server"
          no-caps
          target="_blank"
        /> </q-tabs
    ></q-drawer>

    <!-- Lábléc (állapot sor) -->
    <q-footer v-model="showStatusBar" class="bg-jedlikred text-white" elevated>
      <q-toolbar>
        <q-toolbar-title v-if="$q.screen.gt.sm" class="text-center"
          >Jedlik Vue3 {{ $t("template") }}, with TS {{ $t("and") }} Quasar v{{
            $q.version
          }}</q-toolbar-title
        >
        <q-toolbar-title v-else class="text-center"
          >Jedlik Vue3 {{ $t("template") }}</q-toolbar-title
        >
      </q-toolbar>
    </q-footer>

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
