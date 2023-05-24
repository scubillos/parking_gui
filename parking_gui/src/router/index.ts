import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthenticator } from "@aws-amplify/ui-vue";
import { toRefs } from 'vue';
import {toast} from "vue3-toastify";
const { authStatus } = toRefs(useAuthenticator());

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
router.beforeEach(async (to, from, next) => {
   let isauth = authStatus.value === 'authenticated'
  if (to.name !== 'Login' && !(isauth)) {
    console.log("paso Before")
    toast.error("Acceso denegado");
    next({ name: 'Login' })
  }
  else{
     next()
  }
});

export default router;
