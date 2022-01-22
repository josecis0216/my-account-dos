import axios from "../config";

export default {
  async loadCustomerInfo(payload) {
    return await axios.post("/customers/load-cart-data", payload);
  },
  async doLogin(payload) {
    return await axios.post("/customers/login", payload);
  },
  async checkLoginStatus(payload) {
    return await axios.post("/customers/login-status", payload);
  },
  async forgotPasswordRequest(payload) {
    return await axios.post("/customers/create-password-reset", payload);
  },
  async validatePassToken(payload) {
    return await axios.post("/customers/validate-reset-token", payload);
  },
  async updatePassword(payload) {
    return await axios.post("/customers/update-password", payload);
  },
};
