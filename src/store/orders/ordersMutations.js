export default {
  setOrderModalVisiblity(state, payload) {
    state.orderModal = payload;
  },
  initCustomerOrders(state, payload) {
    state.orders = payload;
  },
  pairTheOrderItems(state, payload) {
    state.orders = payload;
  },
  setOrderModalStatus(state, payload) {
    state.orderModalStatus = payload;
  },
  resetState (state, payload) {
    Object.assign(state, payload)
  }   
};
