/*!
=========================================================
* Vue Paper Dashboard - v1.0.1
=========================================================
* Product Page: http://www.creative-tim.com/product/paper-dashboard
* Copyright 2023 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard/blob/master/LICENSE.md)
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import Vue from "vue";
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from "./App";
import router from "./router/index";

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

import axios from "axios";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

// Añadir script de Google Maps de manera correcta
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyABHJaLOgaxiB3mVzOaJpMd8VDDgxfCBHE`; 
script.async = true;
script.onload = () => {
  new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
};
document.head.appendChild(script);


axios.defaults.baseURL = "http://192.168.0.8:8000/api";

let token = localStorage.getItem("token");

if (token) axios.defaults.headers.common["Authorization"] = "Bearer " + token;

Vue.use(ToastPlugin);
Vue.use(BootstrapVue);
Vue.use(PaperDashboard);

/* eslint-disable no-new */
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
