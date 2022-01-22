import axios from "../config";
export default {
  async getCustomerData() {
    return await axios.get("/my-account/get-customer-data");
  },
  async updateAccountInfo(payload) {
    return await axios.post("/my-account/update-account-info", payload);
  },
  async createAddress(payload) {
    return await axios.post("/shopping-cart/address", payload);
  },
  async updateAddress(payload) {
    return await axios.post("/my-account/update-my-account-address", payload);
  },
  async createAccount(payload) {
    return await axios.post("/shopping-cart/account", payload);
  },
  async updateAccount(payload) {
    return await axios.post("/shopping-cart/update/account", payload);
  },
  async placeOrder(payload) {
    return await axios.post(
      "/shopping-cart/order?timestamp=" + new Date().getTime(),
      payload
    );
  },
  async getShippingOptions() {
    return await axios.get("/shipping");
  },
  async createPaymentMethod(payload) {
    return await axios.post("/shopping-cart/payment", payload);
  },
  async updatePaymentMethod(payload) {
    return await axios.post("/shopping-cart/update/payment", payload);
  },

  async setShippingCode(payload) {
    return await axios.post("/shopping-cart/shipping", payload);
  },
  async validatePromo(payload) {
    return await axios.post(
      "/shopping-cart/promo-code?timestamp=" + new Date().getTime(),
      payload
    );
  },
  async validatePortNumber(payload) {
    return await axios.get("/shopping-cart/porting", { params: payload });
  },
  async addPort(payload) {
    return await axios.post(
      "/shopping-cart/port?timestamp=" + new Date().getTime(),
      payload
    );
  },
  async updatePort(payload) {
    return await axios.post("/shopping-cart/update/port", payload);
  },
  async updateCustomerInfo(payload) {
    return await axios.post(
      "/my-account/update-account-info?timestamp=" + new Date().getTime(),
      payload
    );
  },
  async updatePayment(payload) {
    return await axios.post("/my-account/update-payment-method?timestamp=" + new Date().getTime(),
      payload
    );
  },
  async initiatePasswordReset(payload) {
    return await axios.post(
      "/customers/create-password-reset?timestamp=" + new Date().getTime(),
      payload
    );
  },
  async validatePasswordToken(payload) {
    return await axios.post(
      "/customers/validate-reset-token?timestamp=" + new Date().getTime(),
      payload
    );
  },
  async savePassword(payload) {
    return await axios.post(
      "/customers/update-password?timestamp=" + new Date().getTime(),
      payload
    );
  }
};
