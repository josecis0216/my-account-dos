export default {
  fullName(state) {
    return state.firstName + " " + state.lastName;
  },
  customerId(state) {
    return state.customerId;
  },
  authorizedUser1(state) {
    return state.authorizedUser1;
  },
  authorizedUser2(state) {
    return state.authorizedUser2;
  },
  account_number(state) {
    return state.accountNumber;
  },
  account_activation(state) {
    return state.account_activation;
  },
  billCycle(state) {
    return state.billCycle;
  },
  name(state) {
    return state.name;
  },
  firstName(state) {
    return state.firstName;
  },
  lastName(state) {
    return state.lastName;
  },
  email(state) {
    return state.email;
  },
  address(state) {
    return state.address;
  },
  city(state) {
    return state.city;
  },
  state(state) {
    return state.state;
  },

  accountPhone(state) {
    return state.accountPhone;
  },
  authorizedUsers(state) {
    return state.authorizedUsers;
  },
  isEditingInfo(state) {
    return state.isEditingInfoStatus;
  },
  security_pin(state) {
    return state.securityPin;
  },
  securityQuestions(state) {
    return state.securityQuestions;
  },
  usedQuestions(state) {
    return state.usedQuestions;
  },
  password(state) {
    return state.password;
  },
  payment_methods(state) {
    return state.payment_methods;
  },
  editPayment(state) {
    return state.editPayment;
  },
  addresses(state) {
    return state.addresses;
  },
  passwordModalVisibility(state) {
    return state.passwordModalVisibility;
  },
  passwordVisible(state) {
    return state.passwordVisible;
  },
  genericModalStatus(state) {
    return state.genericModalStatus;
  },
  setPasswordChecks(state) {
    return state.passwordChecks;
  },
  supportMessage(state) {
    return state.supportMessage;
  },
  errorModal(state) {
    return state.errorModal;
  },
  welcomeModal(state) {
    return state.welcomeModal;
  },
  feedbackForm(state) {
    return state.feedbackForm;
  }
};
