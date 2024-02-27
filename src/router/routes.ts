import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/EmptyPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it

];
export default routes;
