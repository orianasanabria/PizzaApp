<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'Home' }"
        >Pizzería</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Home' }"
                >Inicio</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Inventario' }"
                >Inventario</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Carrito' }"
                >Carrito</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Ventas' }"
                >Ventas</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <li class="nav-item total">
        <a class="text-light me-4">Total: ${{ totalCarrito }}</a>
      </li>
      <div @click="$router.push('/carrito')" class="cart-icon"></div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Nav",
  computed: {
    ...mapGetters(["totalCarrito"]),
  },
};
</script>

<style scoped lang="scss">
.cart-icon {
  width: 24px;
  height: 24px;
  line-height: 24px;
  cursor: pointer;
  &::before {
    content: "shopping_cart";
    font-family: "Material Icons";
    font-size: 1.5rem;
    color: #fff;
  }
}
nav {
  position: fixed;
  width: 100%;
  z-index: 1;
}
.total {
  list-style-type: none;
  a {
    text-decoration: none;
  }
}
</style>
