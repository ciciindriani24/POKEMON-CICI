import { createWebHistory, createRouter } from "vue-router";
import Produk from "../views/Produk.vue";
//import Banner from "../views/Banner.vue";
import SingleProduct from "../views/SingleProduct.vue";
import Cart from "../views/Cart.vue";
import Checkout from "../views/Checkout.vue";
import store from "../store";
import PageOrder from "../views/PageOrder.vue";



const routes = [
    {
      path: "/produk",
      name: "Produk",
      component: Produk,
  },
{
  path: "/singleproduct",
  name: "SingleProduct",
  component: SingleProduct,
},
{
  path: "/cart",
  name: "Cart",
  component: Cart,
},
{
  path: "/checkout",
  name: "Checkout",
  component: Checkout,
  meta: { requireLogin: true },
  },

{
  path: "/order/:orderCode",
  name: "PageOrder",
  component: PageOrder,
  props: true,
},


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresGuest && store.getters["auth/isAuthenticated"]) {
    next("/"); // Redirect to Home
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresLogin && store.getters["auth/isAuthenticated"]) {
    next("/login"); // Redirect to Home
  } else {
    next();
  }
});

function cekToken(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem("token")) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next();
  } else {
    next("/login");
  }
}

export default router;