import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import mutations from "@/store/address/addressMutations";
import actions from "@/store/address/addressActions";
import getters from "@/store/address/addressGetters";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    addingNewShippingAddress: false,
    addingNewBillingAddress: false,
    accountAddress: {
      streetAddress: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      addressId: ""
    },
    shippingAddress: {
      streetAddress: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      addressId: ""
    },
    errors: {
      accountAddress: {
        streetAddress: "",
        apt: "",
        city: "",
        state: "",
        zip: ""
      },
      shippingAddress: {
        streetAddress: "",
        apt: "",
        city: "",
        state: "",
        zip: ""
      }
    },
    suggestedAddress: {},
    shippingOptions: [],
    sameShippingAddress: false
  },
  mutations: { ...mutations },
  actions: { ...actions },
  getters: { ...getters },
  plugins: [createPersistedState()]
};
