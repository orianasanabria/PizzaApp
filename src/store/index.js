import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";
import {
  db
} from "../../config/firebase.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productos: [],
    carrito: [],
    ventas: []
  },
  getters: {
    productosFiltrados(state) {
      const productos = state.productos.filter(pizza => pizza.stock > 0)
      return !productos ? [] : productos
    },
    totalCarrito(state) {
      const carrito = state.carrito;
      if (carrito.length === 0) return 0;
      const suma = carrito.reduce((acc, x) => acc + x.subtotal, 0)
      return suma;
    },
    totalVentas(state) {
      const ventas = state.ventas;
      if (ventas.length === 0) return 0;
      const suma = ventas.reduce((acc, x) => acc + x.cantidadVendida, 0)
      return suma
    }
  },
  mutations: {
    cargarDataDB(state, payload) {
      state.productos = payload
    },
    // cargarData(state, payload) {
    //   state.productos = payload
    // },
    agregarPizza(state, payload) {
      const agregar = payload.id;
      const cantidad = 1;
      const nombre = payload.nombre;
      const precio = payload.precio;
      const subtotal = precio * cantidad;

      const finder = state.carrito.find((obj) => obj.id === agregar);

      if (!finder) {
        const obj = {
          id: agregar,
          cantidad,
          nombre,
          precio,
          subtotal,
        };
        state.carrito.push(obj);
      } else {
        finder.cantidad = cantidad + finder.cantidad;
        finder.subtotal = finder.cantidad * precio;
      }
    },
    vaciar(state) {
      state.carrito = []
    },
    comprar(state) {
      // La venta debe ser un objeto que tenga las siguiente propiedades:
      // ID, Nombre, Precio, Subtotal, Cantidad Vendida
      const respuesta = confirm("¿Quieres comprar ahora?");
      if (respuesta) {
        const venta = state.carrito.map((obj) => {
          // Cantidad, ID, Precio, Nombre, Subtotal
          const obj2 = {
            id: obj.id,
            nombre: obj.nombre,
            precioSubtotal: obj.subtotal,
            cantidadVendida: obj.cantidad,
          };
          return obj2;
        });

        venta.forEach((producto) => {
          const finder = state.ventas.find((obj) => obj.id === producto.id)

          if (!finder) {
            state.ventas.push(producto)
          } else {
            state.ventas = state.ventas.map((pizza) => {
              const obj3 = {
                id: pizza.id,
                nombre: pizza.nombre,
                precioSubtotal: pizza.id === producto.id ? pizza.precioSubtotal + producto.precioSubtotal : pizza.precioSubtotal,
                cantidadVendida: pizza.id === producto.id ? pizza.cantidadVendida + producto.cantidadVendida : pizza.cantidadVendida,
              }
              return obj3
            })
          }
        })
        //Descontar el stock en el arreglo de productos según la cantidad en el carrito
        state.productos.forEach((producto) => {
          const id = producto.id

          state.carrito.forEach((el) => {
            if (el.id === id) {
              producto.stock = producto.stock - el.cantidad
            }
          })
        })
      }
      state.carrito = []
    },
    guardarPizzasDB(state) {
      setTimeout(() => {
        try {
          const productos = state.productos;
          productos.forEach(async (producto) => {
            await db.collection("stockPizzas").add(producto);
          })
        } catch (error) {
          console.log(error);
        }
      }, 2000);
    },
    agregarNuevaPizza(state, payload) {
      const existe = state.productos.find(pizza => pizza.id === payload.id)
      // Si no existe el id ingresar a la base de datos
      if (!existe) state.productos.push(payload);
    }
  },
  actions: {
    async getDataDB({
      commit,
      state
    }) {
      try {
        const snapshot = await db.collection("pizzas").get();
        const productos = [];

        snapshot.forEach((doc) => {
          let docData = doc.data();
          docData.id = doc.id;
          productos.push(docData);
        })

        state.productos = productos;

        const eachProducto = productos.map(obj => obj)
        commit("cargarDataDB", eachProducto)
      } catch (error) {
        console.log(error);
      }
    },
    // async getData({
    //   commit
    // }) {
    //   const url =
    //     "https://us-central1-apis-varias-mias.cloudfunctions.net/pizzeria";
    //   try {
    //     const req = await axios(url);
    //     const pizzas = req.data;
    //     const pizzasStock = pizzas.map(obj => {
    //       obj.stock = 10
    //       return obj
    //     });
    //     commit("cargarData", pizzasStock)
    //     console.log("log de data", req.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async setDataDB({
    //   commit
    // }) {
    //   commit("guardarPizzasDB")
    // },
    async crearNuevaPizza({
      commit,
      state
    }, payload) {
      const pizza = payload;
      if (!pizza) return

      const pizzaId = state.productos.filter(pizza => pizza.id === payload.id);
      if (pizzaId.length !== 0) {
        alert("ID ya registrado", pizzaId);
        return;
      }
      commit("agregarNuevaPizza", pizza)
      await db.collection("pizzas").add(pizza)
    },
    async borrarPizzas({
      commit,
      state
    }, payload) {
      commit("")

      const registro = state.productos.filter(reg => reg.id != payload);
      state.productos = registro;

      try {
        db.collection("pizzas").doc(payload).delete()
        alert("Documento eliminado exitosamente!");
      } catch (error) {
        alert("Error eliminando el documento: ", error);
      }
    }
  },
});