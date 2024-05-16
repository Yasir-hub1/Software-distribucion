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
                    <td>{{ item.photo }}</td>
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


      <template v-if="stateForm === 1">
        <div class="container mt-3">
          <card title="Agregar Datos">
            <div slot="raw-content">
              <form @submit.prevent="send_form_data">
                <div class="form-group">
                  <label for="name">Nombre</label>
                  <input type="text" class="form-control" id="name" v-model="formData.name" required>
                </div>
                <div class="form-group">
                  <label for="username">Nombre de Usuario</label>
                  <input type="text" class="form-control" id="username" v-model="formData.username" required>
                </div>

                <div class="form-group">
                  <label for="ci">CI</label>
                  <input type="text" class="form-control" id="ci" v-model="formData.ci" required>
                </div>
                <div class="form-group">
                  <label for="phone">Teléfono</label>
                  <input type="text" class="form-control" id="phone" v-model="formData.phone" required>
                </div>
                <div class="form-group">
                  <label for="address">Dirección</label>
                  <input type="text" class="form-control" id="address" v-model="formData.address" required>
                </div>

                <div class="col-md-3">
                  <div class="dropdown bootstrap-select show">
                    <label for="address">Ciudad</label>
                    <select data-size="7" class="selectpicker" data-style="btn btn-primary btn-round"
                      title="Seleccione Ciudad" tabindex="-98" v-model="formData.city_id">
                      <option v-for="city in array_city" :key="city.id" :value="city.id" v-text="city.name"></option>
                    </select>

                  </div>
                </div>


                <button type="submit" class="btn btn-primary">Guardar</button>
              </form>
            </div>
          </card>
        </div>
      </template>



      <template v-if="stateForm === 2">
        <div class="container mt-3">
          <card title="Actualizar Datos">
            <div slot="raw-content">
              <form @submit.prevent="send_form_data">
                <div class="form-group">
                  <label for="name">Nombre</label>
                  <input type="text" class="form-control" id="name" v-model="formData.name" required>
                </div>
                <div class="form-group">
                  <label for="username">Nombre de Usuario</label>
                  <input type="text" class="form-control" id="username" v-model="formData.username.username" required>
                </div>

                <div class="form-group">
                  <label for="ci">CI</label>
                  <input type="text" class="form-control" id="ci" v-model="formData.ci" required>
                </div>
                <div class="form-group">
                  <label for="phone">Teléfono</label>
                  <input type="text" class="form-control" id="phone" v-model="formData.phone" required>
                </div>
                <div class="form-group">
                  <label for="address">Dirección</label>
                  <input type="text" class="form-control" id="address" v-model="formData.address" required>
                </div>

                <div class="col-md-3">
                  <div class="dropdown bootstrap-select show">
                    <label for="address">Ciudad</label>
                    <select data-size="7" class="selectpicker" data-style="btn btn-primary btn-round"
                      title="Seleccione Ciudad" tabindex="-98" v-model="formData.city_id">
                      <option v-for="city in array_city" :key="city.id" :value="city.id" v-text="city.name"></option>
                    </select>

                  </div>
                </div>


                <button type="submit" class="btn btn-primary">Guardar</button>
              </form>
            </div>
          </card>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { PaperTable } from "@/components";
import axios from "axios";
import toast from "vue-toast-notification";
const tableColumns = ["#", "name", "CI", "phone", "Direccion", "Foto", "Ciudad", "Opciones"];

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
        title: "Transportistas",
        subTitle: "Administra tus transportistas",
        columns: [...tableColumns],
        data: [],
      },
      drivers: [],
      stateForm: 0,

      array_city: [],



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
        let resp = await axios.get("/admin/show-drivers");
        this.drivers = resp.data.data.drivers;
        console.log("datos para citeis ", resp.data)
        this.$toast.success(resp.data.message);
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async getCities() {
      try {
        let resp = await axios.get("/admin/show-cities");
        console.log("datos para citeis ", resp.data)
        this.array_city = resp.data;

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

            id_cities: this.formData.city_id,

          })
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
          .post("/admin/update-drivers/", {
            id_driver: this.formData.id_driver,
            name: this.formData.name,
            username: this.formData.username.username,
            ci: this.formData.ci,
            phone: this.formData.phone,
            address: this.formData.address,
            id_user: this.formData.user_id,
            id_cities: this.formData.city_id,

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
  },
  mounted() {
    this.getDriver();
    this.getCities();
  },
};
</script>
