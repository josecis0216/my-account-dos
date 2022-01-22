export default {
  saveNewAddress(state, payload) {
    state[payload.type] = payload.value;
  },
  setAddingNewShippingAddress(state, payload) {
    state.addingNewShippingAddress = payload;
  },
  setAddingNewBillingAddress(state, payload) {
    state.addingNewBillingAddress = payload;
  },
  setSuggestedAddress(state, payload) {
    state.suggestedAddress = payload;
  },
  setSelectedShippingOption(state, payload) {
    state.selectedShippingOption = payload;
  },
  setShippingOptions(state, payload) {
    state.shippingOptions = payload;
  },
  setShippingAddressId(state, payload) {
    state.shippingAddress.addressId = payload;
  },
  setStreetAddress(state, payload) {
    state[payload.type].streetAddress = payload.value;
  },
  setApt(state, payload) {
    state[payload.type].apt = payload.value;
  },
  setZip(state, payload) {
    state[payload.type].zip = payload.value;
  },
  setCity(state, payload) {
    state[payload.type].city = payload.value;
  },
  setAddressState(state, payload) {
    state[payload.type].state = payload.value;
  },
  setAddressId(state, payload) {
    state[payload.type].addressId = payload.value;
  },
  setFormError(state, payload) {
    state.errors[payload.addressType][payload.field] = payload.value;
  },
  async toggleSameShipping(state) {
    state.sameShippingAddress = !state.sameShippingAddress;
  }
};
