import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import mutations from "@/store/auth/authMutations";
import actions from "@/store/auth/authActions";
import getters from "@/store/auth/authGetters";

Vue.use(Vuex);

export default {
    namespaced: true,
    state: {
        authToken: "",
        isLoggedIn: false,
        email: "",
        password: "",
        loginSuccessful: false,
        errors: {
            loginError: '',
        },
        timedOut: false,
        forgotPasswordModal: false,
        securityCode: '',
        customerId: false,
        newPassword: '',
        forgotPasswordError: false,
    },
    mutations: { ...mutations },
    actions: { ...actions },
    getters: { ...getters },
    plugins: [createPersistedState()],
};
