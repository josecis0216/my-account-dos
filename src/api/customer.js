import axios from "../config";

export default {
  async loadInitialCustomerInfo(payload) {
    return await axios.post(
      "my-account/get-my-account-data?timestamp=" + new Date().getTime(),
      payload
    );
  },
  async getCustomerInfo(payload) {
    return await axios.post(
      "/my-account/get-customer-data?timestamp=" + new Date().getTime(),
      payload
    );
  },
  async getDeviceHealth(payload) {
    return await axios.post("/my-account/get-line-usage", payload);
  },
  async loadBillingHitory(payload) {
    return await axios.post("/my-account/get-billing-info", payload);
  },
  async loadCustomerOrders(payload) {
    return await axios.post(
      "/orders/get-customer-orders?timestamp=" + new Date().getTime(),
      payload
    );
  }
};
