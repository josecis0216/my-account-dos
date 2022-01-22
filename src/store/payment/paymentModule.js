import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import mutations from "@/store/payment/paymentMutations";
import actions from "@/store/payment/paymentActions";
import getters from "@/store/payment/paymentGetters";

Vue.use(Vuex);

function getInitialState() {
  return {
    lastPaymentInfo: {},
    transactions: [],
    lastFour: "",
    expDate: "",
    name: "",
    loadingError: false,
  };
}

const initialState = getInitialState();

export default {
  namespaced: true,
  state: initialState,
  mutations: { ...mutations },
  actions: { ...actions },
  getters: { ...getters },
  plugins: [createPersistedState()],
  defaultState: initialState,
};
