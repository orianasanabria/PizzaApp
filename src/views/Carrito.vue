<template>
  <div class="carrito container">
    <div class="row">
      <div class="col-12 mt-5 pt-5">
        <h1>Carrito de Compras</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody v-if="carrito && carrito.length === 0">
            <tr>
              <td colspan="5">Sin productos en el carrito</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(compra, i) in carrito" :key="i">
              <th scope="row">{{ i + 1 }}</th>
              <td>Pizza {{ compra.nombre }}</td>
              <td>{{ compra.precio }}</td>
              <td>{{ compra.cantidad }}</td>
              <td>{{ compra.subtotal }}</td>
            </tr>
            <tr>
              <td class="text-end bold" colspan="4">Total:</td>
              <td>${{ totalCarrito }}</td>
            </tr>
            <tr>
              <td colspan="5">
                <button @click="vaciar()" class="btn btn-outline-danger me-3">
                  Eliminar
                </button>
                <button @click="comprar()" class="btn btn-success">
                  Comprar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "Carrito",
  computed: {
    ...mapState(["carrito"]),
    ...mapGetters(["totalCarrito"]),
  },
  methods: {
    ...mapMutations(["comprar", "vaciar"]),
  },
};
</script>
