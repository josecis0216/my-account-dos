import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import mutations from "@/store/product/productMutations";
import actions from "@/store/product/productActions";
import getters from "@/store/product/productGetters";

Vue.use(Vuex);

function getInitialState() {
  return {
    products: [],
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
};
