import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/auth/authModule";
import devices from "@/store/devices/devicesModule";
import childAccounts from "@/store/childAccounts/childAccountsModule";
import orders from "@/store/orders/ordersModule";
import payment from "@/store/payment/paymentModule";
import product from "@/store/product/productModule";
import account from "@/store/account/accountModule";
import address from "@/store/address/addressModule";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInfoCircle,faCamera } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faEye,faEyeSlash,faInfoCircle,faCamera);
Vue.component('font-awesome-icon', FontAwesomeIcon);

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    devices,
    childAccounts,
    orders,
    payment,
    product,
    account,
    address,
  },
  state: { isLoading: false, isRedirecting: false, feedbackDismissed: false, feedbackDialog: false },
  mutations: {
    setIsLoadingStatus(state, payload) {
      state.isLoading = payload;
    },
    setRedirectModal(state, payload) {
      state.isRedirecting = payload;
    },
    showFeedbackPopup(state, payload) {
      state.feedbackDialog = payload;
    },
    dismissFeedback(state, payload) {
      state.feedbackDismissed = payload;
    },
  },
  actions: {
    setIsLoadingStatus({ commit }, payload) {
      commit("setIsLoadingStatus", payload);
    },
    setRedirectModal({ commit }, payload) {
      commit("setRedirectModal", payload);
    },
    showFeedbackPopup({ commit }, payload) {
      commit("showFeedbackPopup", payload);
    },
    dismissFeedback({ dispatch, commit }, payload) {
      commit("dismissFeedback", payload);
      dispatch("showFeedbackPopup", false);
    },
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    isRedirecting(state) {
      return state.isRedirecting;
    },
    getDateTime: state => inputDate => {
      let date = new Date(inputDate);
      return (date.getMonth() + 1)+'/'+date.getDate()+'/'+date.getFullYear();
    },
    feedbackDialog(state) {
      return state.feedbackDialog;
    },
    feedbackDismissed(state) {
      return state.feedbackDismissed;
    },
  },
  plugins: [createPersistedState()]
});
