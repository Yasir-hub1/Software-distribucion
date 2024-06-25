<template v-if="stateForm === 1">
      <div class="container mt-3">
        <card title="Asignar Chofer y Vehículo">
          <form @submit.prevent="assignDriverAndVehicle">
            <div class="col-12">
              <label for="vehicle_id" class="form-label">Vehículo:</label>
              <select id="vehicle_id" class="form-control" v-model="formData.vehicle_id" required>
                <option value="" disabled>Seleccione el Vehículo</option>
                <option v-for="vehicle in vehicles" :key="vehicle.id" :value="vehicle.id">{{vehicle.plate + ' - ' + vehicle.model}}</option>
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

<script>
import axios from "axios";
import toast from "vue-toast-notification";

//const tableColumns = ["ID", "Fecha", "Estado", "Total", "Latitud", "Longitud", "Cliente", "Opciones"];

export default {
  name: 'AssignDriverVehicle',
  data() {
    return {
      stateForm: 0,
      table: {
        title: "Asignar",
        subTitle: "",
        //columns: [...tableColumns],
      },
      orders: [],
      vehicles: [],
      drivers: [],
      formData: {
        vehicle_id: null,
        driver_id: null,
        order_id: null
      }
    };
  },
  methods: {
    async getOrders() {
      try {
        let resp = await axios.get("/show-order");
        this.orders = resp.data.orders;
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
    assign(order) {
      this.stateForm = 1;
      this.formData.order_id = order.id;
    },
    async assignDriverAndVehicle() {
      try {
        let res = await axios.post(`/assign-driver-vehicle/${this.formData.order_id}`, {
          vehicle_id: this.formData.vehicle_id,
          driver_id: this.formData.driver_id
        });
        this.$toast.success(res.data.message);
        this.getOrders();
        this.stateForm = 0;
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          this.$toast.error(error.response.data.error);
        } else {
          this.$toast.error('Error al asignar chofer y vehículo a la orden.');
        }
      }
    },

    cancel() {
      this.stateForm = 0;
    }
  },
  mounted() {
    this.getOrders();
    this.getVehicles();
    this.getDrivers();
  }
};
</script>

