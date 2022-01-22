import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import mutations from "@/store/orders/ordersMutations";
import actions from "@/store/orders/ordersActions";
import getters from "@/store/orders/ordersGetters";

Vue.use(Vuex);

function getInitialState() {
  return {
    orderModalStatus: false,
    orders: [
    ],
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
