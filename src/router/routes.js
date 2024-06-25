import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import NotFound from "@/pages/NotFoundPage.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Users from "@/pages/Users.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import Login from "@/pages/Login.vue";
import Products from "../pages/Products.vue";
import Vehicles from "../pages/Vehicles.vue";
import Reports from "../pages/Reports.vue";
import Dispatch_orders from "../pages/Dispatch_orders.vue";
import Delivery from "../pages/Delivery.vue";

const routes = [
  {
    path: "/",
    component: Login, // Ruta inicial dirigida al componente Login
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    redirect: "/dashboard/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "/dashboard/users",
        name: "USUARIOS",
        component: Users,
      },
      {
        path: "/dashboard/products",
        name: "PRODUCTOS",
        component: Products,
      },
      {
        path: "/dashboard/vehicles",
        name: "Vehiculos",
        component: Vehicles,
      },
      {
        path: "/dashboard/reports",
        name: "Reportes",
        component: Reports,
      },
      {
        path: "/dashboard/dispatch_orders",
        name: "Ordenes de Despacho",
        component: Dispatch_orders,
      },
      {
        path: "/dashboard/notifications",
        name: "notifications",
        component: Notifications,
      },
      {
        path: "/dashboard/icons",
        name: "icons",
        component: Icons,
      },
      {
        path: "/dashboard/maps",
        name: "maps",
        component: Maps,
      },
      {
        path: "/dashboard/typography",
        name: "typography",
        component: Typography,
      },
      {
        path: "/dashboard/delivery",
        name: "entrega",
        component: Delivery,
      },
    ],
  },
  { path: "*", component: NotFound },
];

export default routes;
