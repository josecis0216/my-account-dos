import accountApi from "@/api/account";
import customerApi from "@/api/customer";

export default {
  async saveAccountAddress({ state, rootState }) {
    let addressType = "accountAddress";
    let requestObj = {
      token: rootState.auth.authToken,
      customer_id: rootState.account.customerId,
      address: state[addressType].streetAddress,
      city: state[addressType].city,
      state: state[addressType].state,
      suite: state[addressType].apt,
      zip: state[addressType].zip,
      type: "billing",
      address_id: state.accountAddress.addressId
    };
    const { data } = await accountApi.updateAddress(requestObj);
    // console.log({ data });
  },
  async handleInitAddresses({ dispatch }, payload) {
    let { data } = await customerApi.getCustomerInfo({
      token: payload
    });
    // console.log({ data });
    let { billingAddress, shippingAddress } = data;
    let type = "accountAddress";
    dispatch("setStreetAddress", {
      type,
      value: billingAddress.address
    });
    dispatch("setApt", { type, value: billingAddress.suite });
    dispatch("setCity", { type, value: billingAddress.city });
    dispatch("setZip", { type, value: billingAddress.zip });
    dispatch("setAddressState", { type, value: billingAddress.state });
    dispatch("setAddressId", { type, value: billingAddress.id });
    type = "shippingAddress";

    dispatch("setStreetAddress", {
      type,
      value: billingAddress.address
    });
    dispatch("setApt", { type, value: shippingAddress.suite });
    dispatch("setCity", { type, value: shippingAddress.city });
    dispatch("setZip", { type, value: shippingAddress.zip });
    dispatch("setAddressState", { type, value: shippingAddress.state });
    dispatch("setAddressId", { type, value: shippingAddress.id });
  },
  saveNewAddress({ dispatch, commit, state }, addressType) {
    let addressToBeUpdated = "";
    if (addressType === "newShippingAddress") {
      addressToBeUpdated = "shippingAddress";
    } else {
      addressToBeUpdated = "accountAddress";
    }
    commit("saveNewAddress", {
      type: addressToBeUpdated,
      value: state[addressType]
    });
  },
  setAddingNewShippingAddress({ commit }, payload) {
    commit("setAddingNewShippingAddress", payload);
  },
  setAddingNewBillingAddress({ commit }, payload) {
    commit("setAddingNewBillingAddress", payload);
  },
  // handleLogout({ dispatch }, type) {
  //   dispatch("setStreetAddress", { type, value: "" });
  //   dispatch("setCity", { type, value: "" });
  //   dispatch("setAddressId", { type, value: "" });
  //   dispatch("setAddressState", { type, value: "" });
  //   dispatch("setZip", { type, value: "" });
  // },
  handleLoginInfo({ commit, dispatch }, payload) {
    let { type, details } = payload;
    dispatch("setStreetAddress", { type, value: details.address });
    dispatch("setCity", { type, value: details.city });
    dispatch("setAddressId", { type, value: details.id });
    dispatch("setAddressState", { type, value: details.state });
    dispatch("setZip", { type, value: details.zip });
    dispatch("setAddressId", {
      type:
        type === "shippingAddress" ? "newShippingAddress" : "newBillingAddress",
      value: details.id
    });
  },
  async setSameShipping({ state, dispatch, commit }) {
    await commit("toggleSameShipping");
    let sameShippingChecked = state.sameShippingAddress;
    dispatch("setStreetAddress", {
      type: "shippingAddress",
      value: sameShippingChecked ? state.accountAddress.streetAddress : ""
    });
    dispatch("setApt", {
      type: "shippingAddress",
      value: sameShippingChecked ? state.accountAddress.apt : ""
    });
    dispatch("setCity", {
      type: "shippingAddress",
      value: sameShippingChecked ? state.accountAddress.city : ""
    });
    dispatch("setAddressState", {
      type: "shippingAddress",
      value: sameShippingChecked ? state.accountAddress.state : ""
    });
    dispatch("setZip", {
      type: "shippingAddress",
      value: sameShippingChecked ? state.accountAddress.zip : ""
    });
  },

  setStreetAddress({ state, commit }, payload) {
    commit("setStreetAddress", {
      type: payload.type,
      value: payload.value
    });
    if (state[payload.type].streetAddress && state[payload.type].streetAddress.length === 0) {
      commit("setFormError", {
        addressType: payload.type,
        field: "streetAddress",
        value: "Please include a street address."
      });
    } else {
      commit("setFormError", {
        addressType: payload.type,
        field: "streetAddress",
        value: ""
      });
    }
  },
  setApt({ commit }, payload) {
    commit("setApt", {
      type: payload.type,
      value: payload.value
    });
  },
  setCity({ state, commit }, payload) {
    commit("setCity", {
      type: payload.type,
      value: payload.value
    });
    if (state[payload.type].city && state[payload.type].city.length === 0) {
      commit("setFormError", {
        addressType: payload.type,
        field: "city",
        value: "Please include a city."
      });
    } else {
      commit("setFormError", {
        addressType: payload.type,
        field: "city",
        value: ""
      });
    }
  },
  setAddressState({ state, commit }, payload) {
    commit("setAddressState", {
      type: payload.type,
      value: payload.value
    });
    if (state[payload.type].state && state[payload.type].state.length === 0) {
      commit("setFormError", {
        addressType: payload.type,
        field: "state",
        value: "Please include a state"
      });
    } else {
      commit("setFormError", {
        addressType: payload.type,
        field: "state",
        value: ""
      });
    }
  },
  setZip({ state, commit }, payload) {
    commit("setZip", {
      type: payload.type,
      value: payload.value
    });
    if (state[payload.type].zip && state[payload.type].zip.length < 5) {
      commit("setFormError", {
        addressType: payload.type,
        field: "zip",
        value: "Please include a valid zip code"
      });
    } else {
      commit("setFormError", {
        addressType: payload.type,
        field: "zip",
        value: ""
      });
    }
  },

  setAddressId({ commit }, payload) {
    commit("setAddressId", { ...payload });
  },
  setErrors({ dispatch, state }, addressType) {
    dispatch("setStreetAddress", {
      type: addressType,
      value: state[addressType].streetAddress
    });
    dispatch("setApt", {
      type: addressType,
      value: state[addressType].apt
    });
    dispatch("setCity", {
      type: addressType,
      value: state[addressType].city
    });
    dispatch("setAddressState", {
      type: addressType,
      value: state[addressType].state
    });
    dispatch("setZip", {
      type: addressType,
      value: state[addressType].zip
    });
  },

  async validateForm({ dispatch, state }, payload) {
    dispatch("setErrors", payload);
    const errors = state.errors[payload];
    let canContinue = true;
    for (let error in errors) {
      if (errors[error] !== "") {
        canContinue = false;
        break;
      }
    }
    return canContinue;
  },
  async handleApiCalls({ dispatch, state, rootState }, addressType) {
    let apiAddressType;
    if (
      addressType === "accountAddress" ||
      addressType === "newAccountAddress"
    ) {
      apiAddressType = "billing";
    } else {
      apiAddressType = "shipping";
    }
    let response;
    let requestObj = {
      session_id: rootState.sessionId,
      customer_id: rootState.account.customerId,
      address: state[addressType].streetAddress,
      city: state[addressType].city,
      state: state[addressType].state,
      suite: state[addressType].apt,
      zip: state[addressType].zip,
      type: apiAddressType
    };
    if (state[addressType].addressId) {
      requestObj.address_id = state[addressType].addressId;
      response = await accountApi.updateAddress(requestObj);
      if (!(response.data.status === "success")) {
        return { success: false, message: response.data.message };
      }
    } else {
      response = await accountApi.createAddress(requestObj);
      if (response.data.status === "success") {
        if ("suggestedAddress" in response.data.address) {
          dispatch("setAddressId", {
            value: response.data.address.address.id,
            type: addressType
          });
        } else {
          dispatch("setAddressId", {
            value: response.data.address.id,
            type: addressType
          });
        }
      } else {
        // console.log(response.data);
        return { success: false, message: response.data.message };
      }
    }
    let returnObj = { success: response.data.status === "success" };
    if (
      addressType === "shippingAddress" ||
      addressType === "newShippingAddress"
    ) {
      if ("suggestedAddress" in response.data.address) {
        returnObj.suggestedAddress = response.data.address.suggestedAddress;
      }
      let shippingOption = state.shippingOptions.find(option => {
        return option.code === state.selectedShippingOption;
      });
      //setting shipping
      let cart = await accountApi.setShippingCode({
        session_id: rootState.sessionId,
        shipping_id: shippingOption.id
      });
      if (cart.data.status === "success") {
        await dispatch("setCartTotals", cart.data.shipping, { root: true });
      } else {
        console.log(cart.data);
      }
    }
    return returnObj;
  }
};
