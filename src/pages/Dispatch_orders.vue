<template>
  <div>
    <div class="container-fluid">
      <!-- Muestra la tabla si stateForm es 0 -->
      <template v-if="stateForm === 0">
        <div class="col-12 mt-3">
          <card :title="table.title" :subTitle="table.subTitle">
            <button class="btn btn-outline-success" type="button" @click="store()">Agregar</button>
            <div slot="raw-content" class="table-responsive">
              <table class="table" :class="tableClass">
                <thead>
                  <tr>
                    <th v-for="column in table.columns" :key="column">{{ column }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in paginatedOrders" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.state }}</td>
                    <td>{{ item.total }}</td>
                    <td>{{ item.customer_name }}</td>
                    <td>
                      <button class="btn btn-outline-success" type="button" @click="ver(item)">Ver</button>
                      <button class="btn btn-outline-warning" type="button" @click="edit(item)">Editar</button>
                      <button class="btn btn-outline-danger" type="button" @click="asignar(item)">Asignar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Agregar controles de paginación -->
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                  <a class="page-link" href="#" aria-label="Previous" @click.prevent="prevPage">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item" v-for="page in paginatedPages" :key="page" :class="{ 'active': currentPage === page }">
                  <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                  <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </card>
        </div>
      </template>

    <!-- Formulario para agregar/editar -->
    <template>
      <div>
        <form class="row g-3">
          <template v-if="stateForm === 1 || stateForm === 2">
            <div class="container mt-3">
              <card :title="stateForm === 1 ? 'Agregar Orden' : 'Actualizar Datos'">
                <form @submit.prevent="send_form_data">
                  <div class="col-12">
                    <label for="date" class="form-label">Fecha:</label>
                    <input type="date" class="form-control" id="date" v-model="formData.date">
                  </div>
                  <div class="col-12">
                    <label for="state" class="form-label">Estado:</label>
                    <select class="form-control" id="state" v-model="formData.state" required>
                      <option value="" disabled>Seleccione Estado</option>
                      <option value="pendiente">Pendiente</option>
                      <option value="progreso">Progreso</option>
                      <option value="completado">Completado</option>
                    </select>
                  </div>

                  <!-- Componente del Mapa -->
                  <MapComponent :formData="formData" />

                  <div class="form-group row">
                    <label for="customer_id" class="col-12">Cliente:</label>
                    <div class="col-sm-9">
                      <select id="customer_id" class="form-control" v-model="formData.customer_id" required>
                        <option value="" disabled>Seleccione el Cliente</option>
                        <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.nombre }}</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-success">Guardar</button>
                  <button type="button" class="btn btn-secondary" @click="cancel()">Cancelar</button>
                </form>
              </card>
            </div>
          </template>
        </form>
      </div>
    </template>

      <!-- Formulario para agregar detalles -->
      <form class="row g-3" v-if="stateForm === 3">
        <div class="container mt-3">
          <card title="Agregar Detalles">
            <form @submit.prevent="send_details_data">
              <div class="form-group row">
                <label class="col-12">Productos:</label>
                <div class="col-sm-9">
                  <div v-for="product in products" :key="product.id" class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      :id="'product_' + product.id"
                      :value="product.id"
                      v-model="selectedProducts"
                    >
                    <label class="form-check-label" :for="'product_' + product.id">{{ product.name }}</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model.number="productCounts[product.id]"
                      min="1"
                      placeholder="Cantidad"
                    >
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-success">Guardar Detalles</button>
              <button type="button" class="btn btn-secondary" @click="cancel()">Cancelar</button>
            </form>
          </card>
        </div>
      </form>

      <!-- Formulario para mostrar detalles de la orden -->
      <template>
        <div>
          <form class="row g-3" v-if="stateForm === 4">
            <h3>Detalles de la Orden</h3>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(detalle, index) in orderDetails" :key="index">
                    <td>{{ detalle.product.name }}</td>
                    <td>{{ detalle.count }}</td>
                    <td>{{ detalle.unit_price }}</td>
                    <td>{{ detalle.total }}</td>
                  </tr>
                </tbody>
              </table>
              <button type="button" class="btn btn-secondary" @click="cancel()">Atrás</button>
            </div>
          </form>
        </div>
      </template>
      <template v-if="stateForm === 5">
        <div class="container mt-3">
          <card title="Asignar Chofer y Vehículo">
            <form @submit.prevent="assignDriverAndVehicle">
              <div class="col-12">
                <label for="vehicle_id" class="form-label">Vehículo:</label>
                <select id="vehicle_id" class="form-control" v-model="formData.vehicle_id" required>
                  <option value="" disabled>Seleccione el Vehículo</option>
                  <option v-for="vehicle in vehicles" :key="vehicle.id" :value="vehicle.id">{{ vehicle.plate + ' - ' + vehicle.model }}</option>
                </select>
              </div>
              <div class="col-12">
                <label for="driver_id" class="form-label">Chofer:</label>
                <select id="driver_id" class="form-control" v-model="formData.driver_id" required>
                  <option value="" disabled>Seleccione el Chofer</option>
                  <option v-for="driver in drivers" :key="driver.id" :value="driver.id">{{ driver.name }}</option>
                </select>
              </div>
              <button type="submit" class="btn btn-success mt-3">Asignar</button>
              <button type="button" class="btn btn-secondary mt-3" @click="cancel">Cancelar</button>
            </form>
          </card>
        </div>
      </template>
    </div>
  </div>
</template>



<script>
import axios from "axios";
import MapComponent from '@/components/MapComponent.vue';

const tableColumns = ["#", "Fecha", "Estado", "Total", "Cliente", "Opciones"];
const pageSize = 10; // Tamaño de página

export default {
  name: 'DispatchManager',
  components: {
    MapComponent
  },
  data() {
    return {
      activeTab: 'admin',
      table: {
        title: "Ordenes",
        subTitle: "Administra tus ordenes de despacho",
        columns: [...tableColumns],
        data: [],
      },
      orders: [],
      stateForm: 0,
      customers: [],
      products: [],
      vehicles: [],
      drivers: [],
      formData: {
        id: null,
        date: "",
        state: "",
        latitud: "",
        longitud: "",
        customer_id: 0,
        vehicle_id: null, 
        driver_id: null, 
      },
      array_car_driver: [],
      selectedProducts: [],
      productCounts: {},
      orderDetails: [],
      createdOrder: null,
      currentPage: 1, // Página actual
    };
  },
  computed: {
   // Calcular el listado paginado
   paginatedOrders() {
      const startIndex = (this.currentPage - 1) * pageSize;
      return this.orders.slice(startIndex, startIndex + pageSize);
    },
    // Calcular el total de páginas
    totalPages() {
      return Math.ceil(this.orders.length / pageSize);
    },
    // Calcular la secuencia de páginas para mostrar en la paginación
    paginatedPages() {
      let pages = [];
      let startPage = Math.floor((this.currentPage - 1) / 10) * 10 + 1; // Empezar desde el inicio de la secuencia
      let endPage = Math.min(startPage + 9, this.totalPages); // Mostrar máximo 10 números de página
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    async getOrder() {
      try {
        let resp = await axios.get("/show-order");
        this.orders = resp.data.orders;
        this.$toast.success(resp.data.message);
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getCustomer() {
      try {
        let resp = await axios.get("/show-customer");
        this.customers = resp.data.customers;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getProducts() {
      try {
        let resp = await axios.get("/index-product");
        this.products = resp.data.products;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getVehicles() {
      try {
        let resp = await axios.get("/vehiculo-disponible");
        this.vehicles = resp.data.vehicles;
        //console.log("viendo los vehiculos",resp.data);
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getDrivers() {
      try {
        let resp = await axios.get("/chofer-disponible");
        this.drivers = resp.data.drivers;
        //console.log("viendo los choferes",resp.data);

      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    ver(row) {
      if (row && row.id) {
        this.stateForm = 4;
        this.verDetalleOrden(row.id);
      } else {
        console.error('El objeto row o su propiedad id es undefined.');
      }
    },
    edit(row) {
      this.stateForm = 2;
      this.openForm('order', 'update', row);
    },
    store() {
      this.stateForm = 1;
      this.openForm('order', 'store');
    },

    asignar(row){
      if (row && row.id) {
        this.stateForm = 5;
        this.formData.id = row.id; // Guardar el ID de la orden para la asignación
      } else {
        console.error('El objeto row o su propiedad id es undefined.');
      }
    },

    async store_order() {
      try {
        let res = await axios.post("/store-order", {
          date: this.formData.date,
          state: this.formData.state,
          latitud: this.formData.latitud,
          longitud: this.formData.longitud,
          customer_id: this.formData.customer_id,
        });
        console.log(this.formData);
        this.$toast.success(res.data.message);
        this.createdOrder = res.data.order;
        this.stateForm = 3; // Cambia al formulario de detalles
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async update_order() {
      try {
        let res = await axios.post(`/update-order/${this.formData.id}`, {
          date: this.formData.date,
          state: this.formData.state,
          latitud: this.formData.latitud,
          longitud: this.formData.longitud,
          customer_id: this.formData.customer_id,
        });
        this.$toast.success(res.data.message);
        this.getOrder();
        this.stateForm = 0;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async store_order_details() {
      try {
        let res = await axios.post("/store-orders-details", {
          order_id: this.createdOrder.id,
          products: this.selectedProducts.map(product => ({
            product_id: product.id,
            count: product.count, // Asegúrate de capturar la cantidad en el multiselect
          })),
        });
        this.$toast.success(res.data.message);
        this.getOrder();
        this.stateForm = 0;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    send_form_data() {
      if (this.stateForm === 1) {
        this.store_order();
      } else if (this.stateForm === 2) {
        this.update_order();
      }
    },
    async send_details_data() {
      try {
        let productsToSend = this.selectedProducts.map(productId => ({
          product_id: productId,
          count: this.productCounts[productId] || 1, // Tomar la cantidad ingresada o 1 si no se ingresó nada
        }));
        let res = await axios.post("/store-orders-details", {
          order_id: this.createdOrder.id,
          products: productsToSend,
        });
        this.$toast.success(res.data.message);
        this.getOrder();
        this.stateForm = 0;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async verDetalleOrden(orderId) {
      try {
        this.orderDetails = [];
        let res = await axios.get(`/show-orders-details/${orderId}`);
        this.orderDetails = res.data.orderDetails;
        if (this.orderDetails.length === 0) {
          this.$toast.info('No hay detalles para esta orden.');
        } else {
          this.stateForm = 4;
        }
      } catch (error) {
        this.$toast.error('No hay detalles para esta orden.');
      }
    },

    async assignDriverAndVehicle() {
      try {
        let res = await axios.post(`orders/${this.formData.id}/assign-driver-vehicle`, {
          vehicle_id: this.formData.vehicle_id,
          driver_id: this.formData.driver_id
        });
        this.$toast.success(res.data.message);
        this.getOrder();
        this.stateForm = 0;
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          this.$toast.error(error.response.data.error);
        } else {
          this.$toast.error('Error al asignar chofer y vehículo a la orden.');
        }
      }
    },

    openForm(model, action, data = {}) {
      switch (model) {
        case "order": {
          switch (action) {
            case "store": {
              this.formData = {
                date: "",
                state: "",
                latitud: "",
                longitud: "",
                customer_id: 0,
              };
              break;
            }
            case "update": {
              this.formData = { ...data };
              break;
            }
          }
          break;
        }
      }
    },
    cancel() {
      this.stateForm = 0;
    },
    eliminarItem(id) {
      // Implementa la lógica para eliminar el ítem
    },
    changePage(page) {
      this.currentPage = page;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  },
  mounted() {
    this.getOrder();
    this.getCustomer();
    this.getProducts();
    this.getVehicles();
    this.getDrivers();
  },
};
</script>

<style scoped>
/* Añade estilos específicos del componente aquí si es necesario */
</style>
