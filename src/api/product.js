import axios from "../config";

export default {
  async getProducts() {
    return await axios.get("/products?timestamp=" + new Date().getTime());
  },
};
