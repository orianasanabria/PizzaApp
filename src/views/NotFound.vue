<template>
  <div class="notFound">
    <div class="container">
      <div class="row">
        <div class="col-12 mt-5 pt-5">
          <h1 class="display-5 text-center">404</h1>
          <h2>La página que buscas no existe</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["productosFiltrados"]),
  },
  methods: {
    ...mapMutations(["agregarPizza"]),
  },
};
</script>

<style></style>
