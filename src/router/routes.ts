import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/empty",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/EmptyPage.vue") }],
  },
  {
    path: "/basic",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/BasicPage.vue") }],
  },
  {
    path: "/table",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/TablePage.vue") }],
  },
  
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFoundPage.vue"),
  },
];

export default routes;
