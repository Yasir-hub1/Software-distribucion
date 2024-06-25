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
                  <tr v-for="(item, index) in customers" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.city.name }}</td>
                    <!-- <td>{{ item.user.username }}</td> -->
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
              <card :title="stateForm === 1 ? 'Agregar Cliente' : 'Actualizar Datos'">
              <form @submit.prevent="send_form_data">

                <div class="col-12">
                    <label for="username" class="form-label"> Nombre: </label>
                    <input type="text" class="form-control" id="username" v-model="formData.username" required placeholder="Ana">
                  </div>

                  <div class="col-12">
                    <label for="password" class="form-label"> Contraseña: </label>
                    <input type="text" class="form-control" id="password" v-model="formData.password" >
                  </div>

                  <div class="col-12">
                    <label for="phone" class="form-label"> Teléfono: </label>
                    <input type="text" class="form-control" id="phone" v-model="formData.phone" required placeholder="123456">
                  </div>
                  <div class="col-12">
                    <label for="email" class="form-label"> Correo: </label>
                    <input type="text" class="form-control" id="email"  v-model="formData.email"  required placeholder="user@gmail.com">
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

                <!-- <div class="form-group row">
                  <label for="user_id" class="col-12"> Usuario:</label>
                  <div class="col-sm-9">
                    <option v-for="user in array_user" :key="user.id" :value="user.id">{{ user.name }}</option>
                  </div>
                </div> -->
                                    
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

const tableColumns = ["#", "Nombre", "Teléfono", "Correo", "Ciudad", "Opciones"];

export default {
  name: "Table-userCustomer",
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
        title: "Clientes",
        subTitle: "Administra tus clientes",
        columns: [...tableColumns],
        data: [],
      },
      customers: [],
      stateForm: 0,

      cities: [],
      array_user: [],

      formData: {
        nombre: "",
        phone: "",
        email: "",
        city: "",
        city_id: 0,
        //user: "",
        //user_id: 0,
        id_customer: 0,
        username: "",
        password: "",
      }
    };
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    },
  },
  methods: {
    async getCustomer() {
      try {
        let resp = await axios.get("/show-customer");
        this.customers = resp.data.customers;
        //console.log("datos para citeis ", resp.data)
        this.$toast.success(resp.data.message);
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getCities() {
      try {
        let resp = await axios.get("/show-cities");
        console.log("datos para la ciudad ", resp.data)
        this.cities = resp.data.cities;

      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    async getUser(){
      try {
        let resp = await axios.get("/show-customer");
        this.customers = resp.data.data.customers;
        //console.log("datos para citeis ", resp.data)
        this.$toast.success(resp.data.message);
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    edit(row) {
      this.stateForm = 2,
        this.openForm('customer', 'update', row);
    },
    store(){
      this.stateForm = 1,
        this.openForm('customer', 'store');
    },
    async store_customer() {
      try {
        let res = await axios
          .post("/signup-customer/", {
            device_name: "web",
            username: this.formData.username,
            phone: this.formData.phone,
            email: this.formData.email,
            id_cities: this.formData.city_id,
            password: this.formData.password

          });
        this.$toast.success(res.data.message);
        this.getCustomer();
        this.stateForm=0;
      } catch (error) {
        this.$toast.error(error.message);
      }
     },
    async update_customer() {
      try {
        let res = await axios
          .post(`/update-customer/${this.formData.id}`, {
            //id_customer: this.formData.id_customer,
            username: this.formData.username,
            phone: this.formData.phone,
            email: this.formData.email,
            //id_user: this.formData.user_id,
            id_cities: this.formData.city_id,
            password: this.formData.password

          })
        this.$toast.success(res.data.message);
        this.getCustomer();
        this.stateForm=0;

      } catch (error) {
        this.$toast.error(error.message);
      }

    },
    send_form_data() {
      if (this.stateForm == 1) {
        this.store_customer();
      }
      else if (this.stateForm == 2) {
        this.update_customer();
      }
    },
    openForm(model, action, data = []) {
      console.log("datos para editar ", data)
      switch (model) {
        case "customer": {
          switch (action) {
            case "store": {

              this.nombre = "";
              this.phone = "";
              this.email = "";
              this.city = "";
              this.identity_document_type_id = "";
              this.synchronized = "";
              this.action_type = 1;
              this.listado = 2;
              break;
            }
            case "update": {

              this.formData.id_customer = data['id'];
              this.formData.nombre = data["nombre"];
              this.formData.email = data["email"];
              this.formData.city = data["city"];
              this.formData.city_id = data["id_cities"];
              //this.formData.user_id = data["id_user"];

              break;
            }

          }

        }
      }
    },
    name_city(city){
      if (city === null || city === '' || city === undefined) {
        return 'Sin registro de ciudad';
      }
    },
    cancel() {
      this.stateForm = 0;
    },
  },
  mounted() {
    this.getCustomer();
    this.getCities();
  },
};
</script>
