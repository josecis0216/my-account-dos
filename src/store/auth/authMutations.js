export default {
  setError(state, payload) {
    state.errors[payload.errorType] = payload.value;
  },
  setLoggedInStatus(state, payload) {
    state.isLoggedIn = payload;
  },
  setLoginModalVisibility(state, payload) {
    state.loginModalVisible = payload;
  },
  setEmail(state, payload) {
    state.email = payload;
  },
  setPassword(state, payload) {
    state.password = payload;
  },
  setLoginToken(state, payload) {
    state.authToken = payload;
  },
  setLoginSuccessful(state, payload) {
    state.loginSuccessful = payload;
  },
  setTimedOut(state, payload) {
    state.timedOut = payload;
  },
  setForgotPasswordModal(state, payload) {
    state.forgotPasswordModal = payload;
  },
  setSecurityCode(state, payload) {
    state.securityCode = payload;
  },
  setNewPassword(state, payload) {
    state.newPassword = payload;
  },
  setForgotPasswordError(state, payload) {
    state.forgotPasswordError = payload;
  },
  setFPCustomerId(state, payload) {
    state.customerId = payload;
  },
};
