<template>
  <div>
    <div class="container-fluid">
      <!-- Muestra la tabla si stateForm es 1 -->
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
                  <tr v-for="(item, index) in orders" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.state }}</td>
                    <td>{{ item.total }}</td>
                    <td>{{ item.customer.name }}</td>
                    <td>
                      <button class="btn btn-outline-warning" type="button" @click="edit(item)">Editar</button>
                      <button class="btn btn-outline-danger" type="button" @click="eliminarItem(item.id)">Eliminar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>
      </template>

      <!-- Formulario para agregar/editar -->
      <form class="row g-3">
        <template v-if="stateForm === 2">
          <div class="container mt-3">
            <card title="Actualizar Datos">
              <form @submit.prevent="send_form_data">
                <div class="col-12">
                  <label for="date" class="form-label">Fecha:</label>
                  <input type="text" class="form-control" id="date" v-model="formData.date">
                </div>
                <div class="col-12">
                  <label for="state" class="form-label">Estado:</label>
                  <input type="text" class="form-control" id="state" v-model="formData.state" required placeholder="Pendiente">
                </div>
                <div class="col-12">
                  <label for="total" class="form-label">Total:</label>
                  <input type="text" class="form-control" id="total" v-model="formData.total">
                </div>
                <div class="form-group row">
                  <label for="customer_id" class="col-12">Cliente:</label>
                  <div class="col-sm-9">
                    <select id="customer_id" class="form-control" v-model="formData.customer_id" required>
                      <option value="" disabled>Seleccione el Cliente</option>
                      <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.name }}</option>
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
  </div>
</template>

<script>
import { PaperTable } from "@/components";
import axios from "axios";
import toast from "vue-toast-notification";

const tableColumns = ["#", "Fecha", "Estado", "Total", "Cliente", "Opciones"];

export default {
  name: 'DispatchManager',
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
      stateForm: 0, // Asegúrate de que `stateForm` se establece correctamente

      customers: [],
      formData: {
        date: "",
        state: "",
        total: "",
        customer_id: 0,
        id_order: 0
      }
    };
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
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
    edit(row) {
      this.stateForm = 2;
      this.openForm('order', 'update', row);
    },
    store(){
      this.stateForm = 1;
      this.openForm('order', 'store');
    },
    async store_order() {
      try {
        let res = await axios.post("/store-order", {
          date: this.formData.date,
          state: this.formData.state,
          total: this.formData.total,
          customer_id: this.formData.customer_id,
        });
        this.$toast.success(res.data.message);
        this.getOrder();
        this.stateForm = 0;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async update_order() {
      try {
        let res = await axios.post("/update-order/" + this.formData.id_order, {
          date: this.formData.date,
          state: this.formData.state,
          total: this.formData.total,
          customer_id: this.formData.customer_id,
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
    openForm(model, action, data = {}) {
      switch (model) {
        case "order": {
          switch (action) {
            case "store": {
              this.formData = {
                date: "",
                state: "",
                total: "",
                customer_id: 0,
                id_order: 0
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
      this.stateForm = 0; // Reset form state
    },
    eliminarItem(id) {
      // Implementa la lógica para eliminar el ítem
    }
  },
  mounted() {
    this.getOrder();
    this.getCustomer();
  },
};
</script>

<style scoped>
/* Añade estilos específicos del componente aquí si es necesario */
</style>
