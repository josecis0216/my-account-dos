export default {
  orders(state) {
    return state.orders;
  },
  getOrderById: state => orderId => {
    return state.orders.find(order => order.external_customer_order_id === orderId);
  },
  orderModalStatus(state) {
    return state.orderModalStatus;
  },
};
