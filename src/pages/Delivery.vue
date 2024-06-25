<template v-if="stateForm === 1">
  <div class="container mt-3">
    <card title="Lista de entregas">
      <form @submit.prevent="assignDriverAndVehicle">
        <div slot="raw-content" class="table-responsive">
          <table class="table" :class="tableClass">
            <thead>
              <tr>
                <th v-for="column in table.columns" :key="column">{{ column }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in deliveries" :key="index">
                <td>{{ item.num_order }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.state }}</td>
                <td>{{ item.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </card>
  </div>
</template>

<script>
import axios from "axios";
import toast from "vue-toast-notification";

const tableColumns = ["Nro Orden", "Fecha", "Estado", "Descripcion"];

export default {
  name: 'DeliveryManager',
  props: {
    type: {
      type: String, // striped | hover
      default: "striped",
    },
  },

  data() {
    return {
      activeTab: 'admin',
      table: {
        title: "Entregas",
        columns: [...tableColumns],
        data: [],
      },
      deliveries: [],
      stateForm: 0,
      formData: {
        id: null,
        date: "",
        num_order: "",
        state: "",
        description: "",
      }
    };
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    },
  },
  methods: {
    async getDelivery() {
      try {
        let resp = await axios.get("/listar-delivery");
        this.deliveries = resp.data.deliveries;
        this.$toast.success(resp.data.message);
      } catch (error) {
        this.$toast.error(error.message);
      }
    },

    cancel() {
      this.stateForm = 0;
    }
  },
  mounted() {
    this.getDelivery();
  }
};
</script>
