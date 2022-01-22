import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./routes/routes";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(require("vue-cookies"));
Vue.$cookies.config("5d", "/", "." + window.location.hostname, true, "");
Vue.config.productionTip = false;

export default new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#account");
