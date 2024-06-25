<template>
  <div>
    <div class="container-fluid">
      <template v-if="stateForm === 0">
        <div class="col-12 mt-3">
          <card :title="table.title" :subTitle="table.subTitle">
            <button class="btn btn-outline-success" type="button" @click="store()">Agregar vehículo</button>
            <div slot="raw-content" class="table-responsive">
              <table class="table" :class="tableClass">
                <thead>
                  <tr>
                    <th v-for="column in table.columns" :key="column">{{ column }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in vehicles" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.plate }}</td>
                    <td>{{ item.model }}</td>
                    <td>{{ item.brand }}</td>
                    <td>{{ item.ability }}</td>
                   <!--  <td>
                      <img :src="item.photo" alt="Foto del vehículo" v-if="item.photo" style="width: 50px; height: auto;">
                    </td> -->
                  <!--   <td>{{ item.photo }}</td> -->
                    <td>{{ item.state }}</td>
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

      <form class="row g-3">
        <template v-if="stateForm === 1 || stateForm === 2">
          <div class="container mt-3">
            <card :title="stateForm === 1 ? 'Agregar Vehículo' : 'Actualizar Datos'">
              <form @submit.prevent="send_form_data">
                <div class="col-12">
                  <label for="plate" class="form-label">Nro. de Placa:</label>
                  <input type="text" class="form-control" id="plate" v-model="formData.plate" required placeholder="5874ABC">
                </div>
                <div class="col-12">
                  <label for="model" class="form-label">Modelo:</label>
                  <input type="text" class="form-control" id="model" v-model="formData.model" required placeholder="Suzuki Celerio">
                </div>
                <div class="col-12">
                  <label for="brand" class="form-label">Marca:</label>
                  <input type="text" class="form-control" id="brand" v-model="formData.brand" required placeholder="Suzuki">
                </div>
                <div class="col-12">
                  <label for="ability" class="form-label">Capacidad:</label>
                  <select class="form-control" id="ability" v-model="formData.ability" required>
                    <option value="" disabled>Seleccione tonelaje</option>
                    <option value="2 toneladas">2 toneladas</option>
                    <option value="3 toneladas">3 toneladas</option>
                  </select>
                </div>
               <!--  <div class="col-12">
                  <label for="photo" class="form-label">Foto:</label>
                  <input type="file" class="form-control" id="photo" @change="handleFileUpload">
                </div> -->

                <div class="col-12">
                  <label for="state" class="form-label">Estado:</label>
                  <select class="form-control" id="state" v-model="formData.state" required>
                    <option value="" disabled>Seleccione Estado</option>
                    <option value="disponible">Disponible</option>
                    <option value="no disponible">No Disponible</option>
                  </select>
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

const tableColumns = ["#", "Nro de Placa", "Modelo", "Marca", "Capacidad", "Estado", "Opciones"];

export default {
  name: "Table-userDriver",
  props: {
    type: {
      type: String, // striped | hover
      default: "striped",
    },
  },
  components: {
    PaperTable
  },
  data() {
    return {
      activeTab: 'admin',
      table: {
        title: "Vehículos",
        subTitle: "Administra tus vehículos",
        columns: [...tableColumns],
        data: [],
      },
      vehicles: [],
      stateForm: 0,
      formData: {
        id: null,
        plate: "",
        model: "",
        brand: "",
        ability: "",
        //photo: null,
        state: "",
      }
    };
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    },
  },
  methods: {
    async getVehicle() {
      try {
        let resp = await axios.get("/show-vehicles");
        this.vehicles = resp.data.vehicles;
        //console.log("datos para vehiculos ", resp.data)
        this.$toast.success(resp.data.message);
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    edit(item) {
      this.stateForm = 2;
      this.formData = { ...item }; // Asigna todos los valores del vehículo seleccionado al formData
    },
    store(){
      this.stateForm = 1;
      this.openForm('vehicle', 'store');
    },
    async store_vehicle() {
      try {
        let formData = new FormData();
        formData.append('plate', this.formData.plate);
        formData.append('model', this.formData.model);
        formData.append('brand', this.formData.brand);
        formData.append('ability', this.formData.ability);
        //formData.append('photo', this.formData.photo);
        formData.append('state', this.formData.state);

        let res = await axios.post("/store-vehicles", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        this.$toast.success(res.data.message);
        this.getVehicle();
        this.stateForm = 0;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async update_vehicle() {
      try {
        let res = await axios.post(`/update-vehicles/${this.formData.id}`, {
          plate: this.formData.plate,
          model: this.formData.model,
          brand: this.formData.brand,
          ability: this.formData.ability,
          //photo: this.formData.photo,
          state: this.formData.state,
        });
        this.$toast.success(res.data.message);
        this.getVehicle();
        this.stateForm = 0;
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    send_form_data() {
      if (this.stateForm == 1) {
        this.store_vehicle();
      }
      else if (this.stateForm == 2) {
        this.update_vehicle();
      }
    },

    handleFileUpload(event) {
      this.formData.photo = event.target.files[0];
    },

    openForm(model, action, data = []) {
      console.log("Datos para editar ", data)
      switch (model) {
        case "vehicle": {
          switch (action) {
            case "store": {
              this.formData = {
                id: null,
                plate: "",
                model: "",
                brand: "",
                ability: "",
               // photo: null,
                state: "",
              };
              break;
            }
            case "update": {
              this.formData = { ...data }; // Asigna todos los valores del vehículo al formData
              break;
            }
          }
        }
      }
    },
    cancel() {
      this.stateForm = 0;
    },
  },
  mounted() {
    this.getVehicle();
  },
};
</script>
