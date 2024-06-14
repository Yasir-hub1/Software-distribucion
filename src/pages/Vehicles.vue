<template>
  <div>
    <div class="container-fluid">
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
                  <tr v-for="(item, index) in vehicles" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.plate }}</td>
                    <td>{{ item.model }}</td>
                    <td>{{ item.brand }}</td>
                    <td>{{ item.ability }}</td>
                    <td>{{ item.photo }}</td>
                    <td>{{ item.state }}</td>
                    <td>

                      <button class="btn btn-outline-warning" type="button" @click="edit(item)">Editar</button>
                      <button class="btn btn-outline-danger" type="button"
                        @click="eliminarItem(item.id)">Eliminar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>
      </template>


      <form class="row g-3">
          <template v-if="stateForm === 2">
            <div class="container mt-3">
              <card title="Actualizar Datos">
              <form @submit.prevent="send_form_data">

                <div class="col-12">
                    <label for="plate" class="form-label"> Nro. de Placa: </label>
                    <input type="text" class="form-control" id="plate" v-model="formData.plate" required placeholder="5874ABC">
                  </div>
                  <div class="col-12">
                    <label for="model" class="form-label"> Modelo: </label>
                    <input type="text" class="form-control" id="model" v-model="formData.model.model" required placeholder="Suzuki Celerio">
                  </div>
                  <div class="col-12">
                    <label for="brand" class="form-label"> Marca: </label>
                    <input type="text" class="form-control" id="brand" v-model="formData.brand" required placeholder="Suzuki">
                  </div>
                  <div class="col-12">
                    <label for="ability" class="form-label"> Capacidad: </label>
                    <input type="text" class="form-control" id="ability" v-model="formData.ability" required placeholder="123456">
                  </div>
                  <div class="col-12">
                    <label for="photo" class="form-label"> Foto: </label>
                    <input type="text" class="form-control" id="photo"  v-model="formData.photo">
                  </div>

                  <div class="col-12">
                    <label for="state" class="form-label"> Estado: </label>
                    <input type="text" class="form-control" id="state"  v-model="formData.state" required placeholder="Disponible">
                  </div>

                                    
                  <button type="submit" class="btn btn-success">Guardar</button>
                  <button type="button" class="btn btn-secondary">Cancelar</button>

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
const tableColumns = ["#", "Nro de Placa", "Modelo", "Marca", "Foto", "Estado", "Opciones"];

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
        photo: "",
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
        let resp = await axios.get("/admin/show-vehicles");
        this.vehicles = resp.data.data.vehicles;
        console.log("datos para vehiculos ", resp.data)
        this.$toast.success(resp.data.message);
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    edit(item) {
      this.stateForm = 2;
      this.formData.id = item.id; // Asigna el ID del vehículo al campo id de formData
      this.openForm('vehicle', 'update', item);
  },

    store(){
      this.stateForm = 1,
      this.openForm('vehicle', 'store');
    },
    async store_vehicle() {
      try {
        let res = await axios
          .post("/signup-admin/", {

            plate: this.formData.plate,
            model: this.formData.model,
            brand: this.formData.brand,
            ability: this.formData.ability,
            photo: this.formData.photo,
            state: this.formData.state,

          });
        this.$toast.success(res.data.message);
        this.getVehicle();
        this.stateForm=0;
      } catch (error) {
        this.$toast.error(error.message);
      }
     },

  async update_vehicle() {
   try {
    let res = await axios.post(`/admin/update-vehicles/${this.formData.id}`, {
      plate: this.formData.plate,
      model: this.formData.model,
      brand: this.formData.brand,
      ability: this.formData.ability,
      photo: this.formData.photo,
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
    openForm(model, action, data = []) {
      console.log("Datos para editar ", data)
      switch (model) {
        case "driver": {
          switch (action) {
            case "store": {

              this.plate = "";
              this.model = "";
              this.brand = "";
              this.ability = "";
              this.photo = "";
              this.state = "";
              break;
            }
            case "update": {

              this.formData.plate = data["plate"];
              this.formData.model = data["model"];
              // this.formData.password = '';
              this.formData.brand = data["brand"];
              this.formData.ability = data["ability"];
              this.formData.photo = data["photo"];
              this.formData.state = data["state"];
              break;
            }

          }

        }
      }
    },
  },
  mounted() {
    this.getVehicle();
  },
};
</script>
