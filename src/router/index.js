import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/carrito",
    name: "Carrito",
    component: () => import( /*webpackChunkName: "carrito*/ "../views/Carrito.vue"),
  },
  {
    path: "/inventario",
    name: "Inventario",
    component: () => import( /*webpackChunkName: "inventario*/ "../views/Inventario.vue"),
  },
  {
    path: "/ventas",
    name: "Ventas",
    component: () => import( /*webpackChunkName: "ventas*/ "../views/Ventas.vue"),
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import( /*webpackChunkName: "notfound*/ "../views/NotFound.vue"),
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;