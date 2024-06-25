<template>
  <div>
    <b-nav tabs>

      <!-- <b-nav-item :active="activeTab === 'admin'" @click="stateTab('admin')">Administradores</b-nav-item> -->
      <b-nav-item :active="activeTab === 'driver'" @click="stateTab('driver')">Transportistas</b-nav-item>
      <b-nav-item :active="activeTab === 'customer'" @click="stateTab('customer')">Clientes</b-nav-item>

    </b-nav>
    <div v-if="activeTab === 'admin'">
      <TableUserAdmin></TableUserAdmin>
    </div>

    <div v-if="activeTab === 'driver'">
      <TableUserDriver></TableUserDriver>
    </div>

    <div v-if="activeTab === 'customer'">
      <TableUserCustomer></TableUserCustomer>
    </div>


  </div>
</template>

<script>
import TableUserAdmin from '../components/Module-User/Table-userAdmin.vue';
import TableUserDriver from '../components/Module-User/Table-userDriver.vue';
import TableUserCustomer from '../components/Module-User/Table-userCustomer.vue';

export default {
  components: {
    TableUserAdmin,
    TableUserDriver,
    TableUserCustomer
  },
  data() {
    return {
      activeTab: 'admin', // Define la pestaña activa por defecto

    };
  },
  methods: {
    stateTab(tab) {
     
      this.activeTab = tab;
    },
  },
};
</script>

<style></style>
