export default {
  setAccountNumber(state, payload) {
    state.accountNumber = payload;
  },
  setActivationDate(state, payload) {
    state.account_activation = payload;
  },
  setPaymentInfo(state, payload) {
    state.payment_methods = payload;
  },
  setPaymentMethod(state, payload) {
    state.payment_methods[0].lastDigits = payload.lastDigits;
    state.payment_methods[0].type = payload.type;
    state.payment_methods[0].card_number = "";
    state.payment_methods[0].card_expiration = "";
    state.payment_methods[0].cvv = "";
  },
  setIsEditingInfoStatus(state, payload) {
    state.isEditingInfoStatus = payload;
  },
  editPayments(state, payload) {
    state.editPayment = payload;
  },
  passwordModalVisibility(state, payload) {
    state.passwordModalVisibility = payload;
  },
  setUsingAuthorizedUsersStatus(state, payload) {
    state.usingAuthorizedUsers = payload;
  },
  setAuthorizedUser1(state, payload) {
    state.authorizedUser1 = payload;
  },
  setAuthorizedUser2(state, payload) {
    state.authorizedUser2 = payload;
  },
  setSecurityQuestionKeyValue(state, payload) {
    console.log(payload);
    state.securityQuestions[payload.key] = payload.value;
  },
  setUsedOptions(state, payload) {
    state.setUsedOptions = payload;
  },
  setPasswordVisibility(state, payload) {
    state.passwordVisible = payload;
  },
  setPasswordChecked(state) {
    state.passwordChecks.passwordChecked = true;
  },
  toggleTermsConditions(state) {
    state.termsConditionsChecked = !state.termsConditionsChecked;
  },
  toggleEmailSubscribed(state) {
    state.emailSubscribed = !state.emailSubscribed;
  },
  setFirstName(state, payload) {
    state.firstName = payload;
  },
  setLastName(state, payload) {
    state.lastName = payload;
  },
  setPassword(state, payload) {
    state.password = payload;
  },
  setEmail(state, payload) {
    state.email = payload;
  },

  setPhone(state, payload) {
    state.accountPhone = payload;
  },

  setPin(state, payload) {
    state.securityPin = payload;
  },
  setFormError(state, payload) {
    state.errors[payload.type] = payload.value;
  },
  setPasswordChecks(state, payload) {
    state.passwordChecks = { ...payload };
  },
  setCustomerId(state, payload) {
    state.customerId = payload;
  },
  setBillCycle(state, payload) {
    state.billCycle = payload;
  },
  setTermsAndConditionsChecked(state, payload) {
    state.termsAndConditionsChecked = payload;
  },
  setGenericModalVisibility(state, payload) {
    state.genericModalStatus = payload;
  },
  setSupportMessage(state, payload) {
    state.supportMessage = payload;
  },
  showErrorModal(state, payload) {
    state.errorModal = payload;
  },
  setWelcomeModalVisibility(state, payload) {
    state.welcomeModal = payload;
  },
  showFeedbackForm(state, payload) {
    state.feedbackForm = payload;
  }
};
