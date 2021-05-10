import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
    cargarData(state, payload) {
      state.productos = payload
    },
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
    }
  },
  actions: {
    async getData({
      commit
    }) {
      const url =
        "https://us-central1-apis-varias-mias.cloudfunctions.net/pizzeria";
      try {
        const req = await axios(url);
        const pizzas = req.data;
        const pizzasStock = pizzas.map(obj => {
          obj.stock = 10
          return obj
        });
        commit("cargarData", pizzasStock)
        console.log(req.data);
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {},
});

//arreglar que el stock va a 0 en la pag de inicio luego de comprar con un if posiblemente
// marcar en rojo inventario: vistas estilos o clases dinámicas

//vista de ventar iterar el arreglo de ventas y completar y arreglar problema de que el carrito no suma multples vetas

// hacer error 404