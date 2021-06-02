import Vue from "vue";
import App from "./App.vue";
import { store } from "./store";
import "./assets/stylesheets/font.css";
import "./assets/stylesheets/reset.css";
import "./assets/stylesheets/common.css";
import "./assets/stylesheets/style.css";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
