<template>
  <div class="ventas container">
    <div class="row">
      <div class="col-12 mt-5 pt-5">
        <h1>Ventas Realizadas</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Precio Total</th>
              <th scope="col">Cantidad Vendida</th>
            </tr>
          </thead>
          <tbody v-if="ventas && ventas.length === 0">
            <tr>
              <td colspan="5">Sin productos en el inventario</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(venta, i) in ventas" :key="i">
              <th scope="row">{{ i + 1 }}</th>
              <td>{{ venta.id }}</td>
              <td>Pizza {{ venta.nombre }}</td>
              <td>${{ venta.precioSubtotal }}</td>
              <td>{{ venta.cantidadVendida }}</td>
            </tr>
            <tr>
              <td class="text-end bold" colspan="4">Ventas totales:</td>
              <td>
                <strong>{{ totalVentas }}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Ventas",
  computed: {
    ...mapState(["ventas"]),
    ...mapGetters(["totalVentas"]),
  },
};
</script>
