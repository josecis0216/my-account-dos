import productApi from "@/api/product";
export default {
  setProducts({ commit }, payload) {
    commit("setProducts", payload);
  },
  async initProductState({ dispatch }) {
    let { data } = await productApi.getProducts();

    dispatch("setProducts", data.products);
  },
};
