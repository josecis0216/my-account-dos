export default {
  shippingAddressId(state) {
    return state.shippingAddress.addressId;
  },
  billingAddressId(state) {
    return state.accountAddress.addressId;
  },
  isAddingNewShippingAddress(state) {
    return state.addingNewShippingAddress;
  },
  isAddingNewBillingAddress(state) {
    return state.addingNewBillingAddress;
  },
  accountStreetAddress(state) {
    return state.accountAddress.streetAddress;
  },
  accountApt(state) {
    return state.accountAddress.apt;
  },
  accountCity(state) {
    return state.accountAddress.city;
  },
  accountState(state) {
    return state.accountAddress.state;
  },
  accountZip(state) {
    return state.accountAddress.zip;
  },
  shippingStreetAddress(state) {
    return state.shippingAddress.streetAddress;
  },
  shippingApt(state) {
    return state.shippingAddress.apt;
  },
  shippingCity(state) {
    return state.shippingAddress.city;
  },
  shippingState(state) {
    return state.shippingAddress.state;
  },
  shippingZip(state) {
    return state.shippingAddress.zip;
  },
  newShippingStreetAddress(state) {
    return state.newShippingAddress.streetAddress;
  },

  newBillingStreetAddress(state) {
    return state.newBillingAddress.streetAddress;
  },

  shippingOptions(state) {
    return state.shippingOptions;
  },
  selectedShippingOption(state) {
    return state.selectedShippingOption;
  },
  selectedShippingOptionInfo(state) {
    return state.shippingOptions.find(
      option => option.code === state.selectedShippingOption
    );
  },
  sameShippingAddress(state) {
    return state.sameShippingAddress;
  },
  errors(state) {
    return state.errors;
  },
  suggestedAddress(state) {
    return state.suggestedAddress;
  }
};
