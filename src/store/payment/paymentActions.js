import startingState from "@/store/payment/paymentModule";

export default {
  setLastPaymentInfo({ commit }, payload) {
    commit("setLastPaymentInfo", payload);
  },
  setTransactions({ commit }, payload) {
    commit("setTransactions", payload);
  },
  async updateTransactions({ commit }, payload) {
    commit("setTransactions", payload);
  },
  async initPaymentModule({ commit, dispatch }, payload) {
    await dispatch("setLastPaymentInfo", payload.lastPaymentInfo);
    await dispatch("setTransactions", payload.transactions);
  },
  setLastFour({ commit }, payload) {
    commit("setLastFour", payload);
  },
  setName({ commit }, payload) {
    commit("setName", payload);
  },
  setExpDate({ commit }, payload) {
    commit("setExpDate", payload);
  },
  hasLoadingError({ commit }, payload) {
    commit("hasLoadingError", payload);
  },
  clearTheState({commit}) {
    commit("resetState", startingState.defaultState);
  },    
};
