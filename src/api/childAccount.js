import axios from "../gabbIDConfig";

export default {
  async loadChildAccounts(payload) {
    return await axios.post("/accounts/child-accounts", payload);
  },

  // Call that makes sure they create a unique username that is not already claimed
  async checkForUniqueUsername(payload) {
    return await axios.post("/accounts/unique-username", payload);
  },

  // Creates and account that will then send a text to parent account for validation
  async createChildAccount(payload) {
    return await axios.post("/accounts/create-child-account", payload);
  },

  // Uploads the account image to the media server
  async uploadChildAccountImage(payload) {
    return await axios.post("/accounts/profile-image", payload);
  },

  // Validates that the parent account is setting up child account
  async validateChildAccount(payload) {
    return await axios.post("/accounts/validate-child-account", payload);
  },

  // Change First Name, Last Name, Birth Date, Gender
  async updateChildAccount(payload) {
    return await axios.post("/accounts/parent-update-child-account", payload);
  },
};
