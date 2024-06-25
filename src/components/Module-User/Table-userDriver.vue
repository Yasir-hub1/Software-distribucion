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
                  <tr v-for="(item, index) in drivers" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.ci }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.address }}</td>
                    <!-- <td>{{ item.photo }}</td> -->
                    <td>{{ item.city.name }}</td>
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
          <template v-if="stateForm === 1 || stateForm === 2">
            <div class="container mt-3">
              <card :title="stateForm === 1 ? 'Agregar Chofer' : 'Actualizar Datos'">
              <form @submit.prevent="send_form_data">

                <div class="col-12">
                    <label for="name" class="form-label"> Nombre: </label>
                    <input type="text" class="form-control" id="name" v-model="formData.name" required placeholder="Ana">
                  </div>
                  <div class="col-12">
                    <label for="username" class="form-label"> Nombre de usuario: </label>
                    <input type="text" class="form-control" id="username" v-model="formData.username" required placeholder="nombre de usuario">
                  </div>
                  <div class="col-12">
                    <label for="ci" class="form-label"> Carnet de identidad: </label>
                    <input type="text" class="form-control" id="ci" v-model="formData.ci" required placeholder="ci">
                  </div>
                  <div class="col-12">
                    <label for="phone" class="form-label"> Teléfono: </label>
                    <input type="text" class="form-control" id="phone" v-model="formData.phone" required placeholder="123456">
                  </div>
                  <div class="col-12">
                    <label for="address" class="form-label"> Dirección: </label>
                    <input type="text" class="form-control" id="address"  v-model="formData.address"  required placeholder="Avenida Busch">
                  </div>

                 <div class="form-group row">
                  <label for="city_id" class="col-12"> Ciudad:</label>
                  <div class="col-sm-9">
                    <select id="city_id" class="form-control" v-model="formData.city_id" required>
                      <option value="" disabled> Seleccione Ciudad</option>
                      <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
                    </select>
                  </div>
                </div>
                                    
                  <button type="submit" class="btn btn-success">Guardar</button>
                  <button type="button" class="btn btn-secondary" @click="cancel">Cancelar</button>

                </form>
              </card>
            </div>
          </template>
      </form>
    </div>
  </div>
</template>

<script>
//import { PaperTable } from "@/components";
import axios from "axios";
import toast from "vue-toast-notification";
const tableColumns = ["#", "Nombre", "CI", "Teléfono", "Dirección", "Ciudad", "Opciones"];

export default {
  name: "Table-userDriver",
  props: {
    type: {
      type: String, // striped | hover
      default: "striped",
    },
  },
 /*  components: {
    PaperTable
  }, */
  data() {
    return {
      activeTab: 'admin',
      table: {
        title: "Transportistas",
        subTitle: "Administra tus transportistas",
        columns: [...tableColumns],
        data: [],
      },
      drivers: [],
      stateForm: 0,

      cities: [],



      formData: {
        username: "",
        // password:"",
        name: "",
        ci: "",
        phone: "",
        address: "",
        city: "",
        city_id: 0,
        user_id: 0,
        id_driver: 0,
      }
    };
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    },
  },
  methods: {
    async getDriver() {
      try {
        let resp = await axios.get("/show-drivers");
        this.drivers = resp.data.drivers;
        //console.log("datos para citeis ", resp.data)
        this.$toast.success(resp.data.message);
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getCities() {
      try {
        let resp = await axios.get("/show-cities");
        //console.log("datos para citeis ", resp.data)
        this.cities = resp.data.cities;

      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    edit(row) {
      this.stateForm = 2,
        this.openForm('driver', 'update', row);
    },
    store(){
      this.stateForm = 1,
        this.openForm('driver', 'store');
    },
    async store_driver() {
      try {
        let res = await axios
          .post("/signup-driver/", {

            name: this.formData.name,
            username: this.formData.username,
            ci: this.formData.ci,
            phone: this.formData.phone,
            address: this.formData.address,

            id_cities: this.formData.city_id

          });
        this.$toast.success(res.data.message);
        this.getDriver();
        this.stateForm=0;
      } catch (error) {
        this.$toast.error(error.message);
      }
     },
    async update_driver() {
      try {
        let res = await axios
          .post("/update-drivers/", {
            id_driver: this.formData.id_driver,
            name: this.formData.name,
            username: this.formData.username.username,
            ci: this.formData.ci,
            phone: this.formData.phone,
            address: this.formData.address,
            id_user: this.formData.user_id,
            id_cities: this.formData.city_id

          })
        this.$toast.success(res.data.message);
        this.getDriver();
        this.stateForm=0;

      } catch (error) {
        this.$toast.error(error.message);
      }

    },
    send_form_data() {
      if (this.stateForm == 1) {
        this.store_driver();
      }
      else if (this.stateForm == 2) {
        this.update_driver();
      }
    },
    openForm(model, action, data = []) {
      console.log("datos para editar ", data)
      switch (model) {
        case "driver": {
          switch (action) {
            case "store": {

              this.nit = "";
              this.name = "";
              this.invoice_name = "";
              this.ci = "";
              this.complement = "";
              this.phone1 = "";
              this.phone2 = "";
              this.address = "";
              this.email = "";
              this.birthday = moment(new Date(), "DD/MM/YYYY").format(
                "YYYY-MM-DD"
              );
              this.city = "";
              this.identity_document_type_id = "";
              this.synchronized = "";
              this.action_type = 1;
              this.listado = 2;
              break;
            }
            case "update": {

              this.formData.id_driver = data['id'];
              this.formData.name = data["name"];
              this.formData.username = data["user"];
              // this.formData.password = '';
              this.formData.ci = data["ci"];
              this.formData.phone = data["phone"];
              this.formData.address = data["address"];
              this.formData.city = data["city"];

              this.formData.city_id = data["id_cities"];
              this.formData.user_id = data["id_user"];

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
    this.getDriver();
    this.getCities();
  },
};
</script>
