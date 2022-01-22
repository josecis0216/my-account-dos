import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import mutations from "@/store/childAccounts/childAccountsMutations";
import actions from "@/store/childAccounts/childAccountsActions";
import getters from "@/store/childAccounts/childAccountsGetters";

Vue.use(Vuex);

function getInitialState() {
  return {
    childStatus: false,
    savedChildAccount: {
      progress: false,
      name: '',
      age: '',
      gender: '',
      image: false,
      mdn: false,
    },
    childAccountsResponse: false,
    childAccounts: [
      // {
      //   accountImage: '',
      //   firstName: 'Bartholomew',
      //   lastName: 'Zen',
      //   username: '',
      //   authToken: '',
      //   id: 449289328291,
      //   birthMonth: 0,
      //   birthDay: 0,
      //   birthYear: 0,
      //   gender: '',
      //   lines: [
      //     {
      //       mdn: 3859857426,
      //       product: 'Z2',
      //     },
      //   ],
      //   linkedDevice: 4492893,
      // }
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
