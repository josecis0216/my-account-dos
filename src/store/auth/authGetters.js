export default {
    loginError(state){
        return state.errors.loginError;
    },
    isLoggedIn(state) {
        return state.isLoggedIn;
    },
    email(state) {
        return state.email;
    },
    password(state) {
        return state.password;
    },
    token(state) {
        return state.authToken;
    },
    loginModalVisible(state) {
        return state.loginModalVisible;
    },
    loginSuccessful(state) {
        return state.loginSuccessful;
    },
    timedOut(state) {
        return state.timedOut;
    },
    forgotPasswordModal(state) {
        return state.forgotPasswordModal;
    },
    securityCode(state) {
        return state.securityCode;
    },
    newPassword(state) {
        return state.newPassword;
    },
    forgotPasswordError(state) {
        return state.forgotPasswordError;
    },
    customerId(state) {
        return state.customerId;
    },
};
