<template>
  <div class="crear">
    <div class="container pt-5">
      <div class="row mt-5">
        <div class="col-12">
          <h1 class="text-center mb-5">Crear Pizzas</h1>
          <form>
            <div class="mb-3 text-start">
              <label class="form-label">ID</label>
              <input v-model="pizza.id" type="text" class="form-control" />
            </div>
            <div class="mb-3 text-start">
              <label class="form-label">Nombre</label>
              <input v-model="pizza.name" type="text" class="form-control" />
            </div>
            <div class="mb-3 text-start">
              <label class="form-label">Descripción</label>
              <input v-model="pizza.desc" type="text" class="form-control" />
            </div>
            <div class="mb-3 text-start">
              <label class="form-label">Precio</label>
              <input v-model="pizza.price" type="number" class="form-control" />
            </div>
            <div class="mb-3 text-start">
              <label class="form-label">Stock</label>
              <input v-model="pizza.stock" type="number" class="form-control" />
            </div>
            <div class="mb-3 text-start">
              <label class="form-label">Imagen</label>
              <input v-model="pizza.img" type="text" class="form-control" />
            </div>

            <div class="mb-3 text-start">
              <div class="row">
                <label class="form-label">Ingredientes</label>
                <div class="col-sm-6">
                  <input
                    type="text"
                    v-model="ing"
                    class="form-control bord-fo"
                  />
                </div>
                <div class="col-sm-6 d-flex">
                  <button
                    @click.prevent="agregarIngrediente(ing)"
                    class="btn btn-success"
                  >
                    Agregar
                  </button>
                  <div class="d-flex">
                    <ul
                      class="text-success fw-bold text-uppercase"
                      v-for="(ing, i) in pizza.ing"
                      :key="i"
                    >
                      {{
                        i
                      }}
                      -
                      {{
                        ing
                      }}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <button
              @click="crearPizza"
              type="button"
              class="w-100 btn btn-primary my-4 mb-5"
            >
              Crear Pizza
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Crear",
  data() {
    return {
      ingrediente: "",
      pizza: {
        id: "",
        name: "",
        desc: "",
        price: "",
        stock: "",
        img: "",
        ing: [],
      },
    };
  },
  methods: {
    ...mapActions(["crearNuevaPizza"]),
    crearPizza() {
      const pizza = this.pizza;
      if (
        !pizza.id ||
        !pizza.name ||
        !pizza.desc ||
        !pizza.price ||
        !pizza.stock ||
        !pizza.img ||
        !pizza.ing
      )
        return;
      this.crearNuevaPizza(pizza);
    },
    agregarIngrediente(ing) {
      if (!ing) return;
      this.pizza.ing.push(ing);
      this.ing = "";
    },
  },
};
</script>

<style></style>
