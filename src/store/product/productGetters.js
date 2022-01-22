export default {
  products(state) {
    return state.products;
  },
  productInfo: state => productId => {
    let productInfo = {};
    let matchedProduct = state.products.find(
      product => product.id === productId
    );
    if (matchedProduct !== undefined) {
      return matchedProduct;
    } else {
      state.products.forEach(product => {
        for (const [key, value] of Object.entries(product.options)) {
          if (key.includes("color")) {
            for (const [optionKey, optionValue] of Object.entries(
              product.options[key]
            )) {
              let optionModel = product.options[key][optionKey];
              if (productId === product.options[key][optionKey].product_id) {
                productInfo = {
                  name: product.name,
                  description: optionModel.name,
                  price: product.price,
                  id: optionModel.product_id,
                  parentId: product.id
                };
              }
            }
          }
        }
      });
    }
    return productInfo;
  }
};
