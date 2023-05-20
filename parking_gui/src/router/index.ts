import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/reservas",
    name: "reservations",
    component: () => import("../views/Reservations/Index.vue"),
    params: { islogued: false },
    meta: { requiresAuth: true }
  },
  {
    path: "/in-dev",
    name: "En desarrollo",
    component: () => import("../views/InDev.vue"),
  },
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
    paramsi: { islogued: false },
    meta: { requiresAuth: false }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


export default router;
