export default {
  setTransactions(state, payload) {
    state.transactions = payload;
  },
  setLastPaymentInfo(state, payload) {
    state.lastPaymentInfo = payload;
  },
  setLastFour(state, payload) {
    state.lastFour = payload;
  },
  setName(state, payload) {
    state.name = payload;
  },
  setExpDate(state, payload) {
    state.expDate = payload;
  },
  resetState (state, payload) {
    Object.assign(state, payload)
  },
  hasLoadingError(state, payload) {
    state.loadingError = payload;
  },
};
