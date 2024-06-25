<template>
  <div class="wrapper" v-if="isAuthenticated">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel" />
        <sidebar-link to="/dashboard/users" name="Usuarios" icon="ti-user" />
        <sidebar-link to="/dashboard/products" name="Productos" icon="ti-view-list-alt" />
        <sidebar-link to="/dashboard/vehicles" name="Vehiculos" icon="ti-truck" />
        <sidebar-link to="/dashboard/reports" name="Reportes" icon="ti-bar-chart-alt" />
        <sidebar-link to="/dashboard/dispatch_orders" name="Ordenes de Despacho" icon="ti-receipt" />
        <sidebar-link to="/dashboard/delivery" name="Entrega" icon="ti-view-list-alt" />
       <!--  <sidebar-link to="/dashboard/typography" name="Typography" icon="ti-text" />
        <sidebar-link to="/dashboard/icons" name="Icons" icon="ti-pencil-alt2" />
        <sidebar-link to="/dashboard/maps" name="Map" icon="ti-map" />
        <sidebar-link to="/dashboard/notifications" name="Notifications" icon="ti-bell" /> -->
      </template>
    <!--   <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <drop-down class="nav-item" title="5 Notifications" title-classes="nav-link" icon="ti-bell">
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
        </drop-down>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu> -->
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
  computed: {
    isAuthenticated() {
      let authenticated = localStorage.getItem("isAuthenticated") === "S";
      if (authenticated) {
        return true;
      } else {
        this.$router.push('/login')
        return false;
      }

    }
  }
};
</script>
