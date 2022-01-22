import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import mutations from "@/store/account/accountMutations";
import actions from "@/store/account/accountActions";
import getters from "@/store/account/accountGetters";

Vue.use(Vuex);

function getInitialState() {
  return {
    account_number: 0,
    customerId: 0,
    account_activation: "",
    billCycle: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    accountPhone: "",
    authorizedUser1: "",
    authorizedUser2: "",
    securityPin: "",
    securityQuestions: {
      question1: "",
      question2: "",
      answer1: "",
      answer2: "",
      question1Error: "",
      question2Error: "",
      answer1Error: "",
      answer2Error: "",
    },
    usedQuestions: [],
    isEditingInfo: false,
    payment_methods: [
      {
        type: "",
        name: "",
        card_number: "",
        card_expiration: "",
        lastDigits: "",
        cvv: ""
      }
    ],
    editPayment: false,
    passwordModalVisibility: false,
    passwordVisible: false,
    passwordChecks: {},
    passwordChecked: false,
    errors: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      pin: "",
      accountPhone: ""
    },
    genericModalStatus: false,
    supportMessage: '',
    errorModal: false,
    feedbackForm: {
      show: false,
      message: '',
      option: '',
    },
    welcomeModal: true,
  };
}
const initialState = getInitialState();

export default {
  namespaced: true,
  state: initialState,
  mutations: { ...mutations },
  actions: { ...actions },
  getters: { ...getters },
  plugins: [createPersistedState()]
};
