import rootModule from "@/store/index";
import accountApi from "@/api/account";
import customerApi from "@/api/customer";
import GenericModal from "../../components/GenericModal";
import { faBug } from "@fortawesome/free-solid-svg-icons";

export default {
  // UPDATING ACCOUNT INFORMATION
  async saveAccountInfo({ dispatch, state, rootState }) {
    try {
      let requestObj = {
        first_name: state.firstName,
        last_name: state.lastName,
        email: state.email,
        phone_number: state.accountPhone,
        pin: state.securityPin,
        customer_id: state.accountNumber,
        token: rootState.auth.authToken,
        authorizedUser1: state.authorizedUser1,
        authorizedUser2: state.authorizedUser2,
        securityQuestion1: state.security_question_1,
        securityQuestion2: state.security_question_2,
        securityAnswer1: state.security_answer_1,
        securityAnswer2: state.security_answer_2
      };
      const { data } = await accountApi.updateCustomerInfo(requestObj);
      return { status: "success" };
    } catch (e) {
      console.log(e);
      dispatch("setErrorModal", true);
      return { status: "error", error: e };
    }
  },
  async savePaymentInfo({ dispatch, state, rootState }) {
    try {
      let requestObj = {
        name: state.payment_methods[0].name,
        card_number: state.payment_methods[0].card_number,
        card_expiration: state.payment_methods[0].card_expiration,
        cvv: state.payment_methods[0].cvv,

      };
      const { data } = await accountApi.updatePayment(requestObj);
      return { status: "success" };
    } catch (e) {
      console.log(e);
      dispatch("setErrorModal", true);
      return { status: "error", error: e };
    }
  },
  setIsEditingInfoStatus({ commit }, payload) {
    commit("setIsEditingInfoStatus", payload);
  },
  editPayments({ commit }, payload) {
    commit("editPayments", payload);
  },
  setPasswordModalVisibility({ commit }, payload) {
    commit("passwordModalVisibility", payload);
  },
  async initCustomerState({ commit, dispatch }, payload) {
    let { data } = await customerApi.getCustomerInfo({
      token: payload
    });
    if (data.status) {
      await dispatch("auth/setTimedOut", true, { root: true });
      await dispatch("auth/doLogout", "", { root: true });
      return false;
    }

    let customer = data.customer;
    dispatch("setFirstName", customer.first_name);
    dispatch("setLastName", customer.last_name);
    dispatch("setEmail", customer.email);
    dispatch("setPhone", customer.phone_number);
    dispatch("setBillCycle", customer.bill_cycle);
    dispatch("setAccountNumber", customer.external_account_id);
    dispatch("setPin", customer.pin);
    dispatch("setCustomerId", customer.customer_id);
    if (customer.created_at) {
      dispatch("setActivationDate", customer.created_at);
    } else {
      dispatch("setActivationDate", "2019-01-01T08:39:55.000000Z");
    }
    dispatch("setPaymentMethod", data.payment);
    dispatch("payment/setLastFour", data.payment.lastDigits, { root: true });
    return true;
  },

  async getCustomerBillingHistory(
    { commit, dispatch, state, rootState },
    payload
  ) {
    await dispatch("setIsLoadingStatus", true, { root: true });
    function formatDate(date = false) {
      var d = "",
        month = "",
        day = "",
        year = "";
      if (date) {
        (d = new Date(date)),
          (month = "" + (d.getMonth() + 1)),
          (day = "" + d.getDate()),
          (year = d.getFullYear());
      } else {
        (d = new Date()),
          (month = "" + (d.getMonth() + 1)),
          (day = "" + d.getDate()),
          (year = d.getFullYear());
      }
      if (date == "this_year") {
        (d = new Date()), (month = "1"), (day = "1"), (year = d.getFullYear());
      }

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    }
    if (payload) {
      let { data: billingData } = await customerApi.loadBillingHitory({
        token: rootState.auth.authToken,
        accountNumber: state.accountNumber,
        startDate: formatDate(
          payload == "this_year" ? "this_year" : payload + "-01-02"
        ),
        endDate: formatDate(payload == "this_year" ? "" : payload + "-12-30"),
        type: "NEWCH"
      });

      if (billingData.status == "error") {
        await dispatch("payment/hasLoadingError", true, { root: true });
        await dispatch("auth/setTimedOut", true, { root: true });
        await dispatch("auth/doLogout", "", { root: true });
        return false;
      } else {
        await dispatch("payment/hasLoadingError", false, { root: true });
        if (
          billingData.transactions.Transaction &&
          billingData.transactions.Transaction.length > 0
        ) {
          await dispatch(
            "payment/updateTransactions",
            billingData.transactions.Transaction,
            { root: true }
          );
        } else {
          await dispatch("payment/updateTransactions", "", { root: true });
        }
      }
    } else {
      let { data: billingData } = await customerApi.loadBillingHitory({
        token: rootState.auth.authToken,
        accountNumber: state.accountNumber,
        startDate: formatDate("this_year"),
        endDate: formatDate(),
        type: "NEWCH"
      });
      if (billingData.status == "error") {
        await dispatch("payment/hasLoadingError", true, { root: true });
        await dispatch("auth/setTimedOut", true, { root: true });
        await dispatch("auth/doLogout", "", { root: true });
        return false;
      } else {
        await dispatch("payment/hasLoadingError", false, { root: true });
        if (billingData.transactions.length > 0) {
          await dispatch(
            "payment/updateTransactions",
            billingData.transactions.Transaction,
            { root: true }
          );
        } else {
          await dispatch("payment/updateTransactions", "", { root: true });
        }
      }
    }
    await dispatch("setIsLoadingStatus", false, { root: true });
  },

  setAccountNumber({ commit }, payload) {
    commit("setAccountNumber", payload);
  },

  setUsingAuthorizedUsersStatus({ commit }, payload) {
    commit("setUsingAuthorizedUsersStatus", payload);
  },

  setAuthorizedUser1({ commit }, payload) {
    commit("setAuthorizedUser1", payload);
  },

  setAuthorizedUser2({ commit }, payload) {
    commit("setAuthorizedUser2", payload);
  },

  setSecurityQuestionKeyValue({ state, commit }, payload) {
    commit("setSecurityQuestionKeyValue", payload);

    if (payload.key.includes("question")) {
      if (state.securityQuestions[payload.key].length < 1) {
        commit("setSecurityQuestionKeyValue", {
          key: payload.errorType,
          value: "Please select a security question."
        });
        return;
      } else if (
        state.securityQuestions.question2 === state.securityQuestions.question1
      ) {
        commit("setSecurityQuestionKeyValue", {
          key: payload.errorType,
          value: "Your security questions must be different."
        });
        return;
      } else {
        commit("setSecurityQuestionKeyValue", {
          key: "question2Error",
          value: ""
        });
        commit("setSecurityQuestionKeyValue", {
          key: "question1Error",
          value: ""
        });
      }
    }

    if (state.securityQuestions[payload.key].length === 0) {
      if (payload.key.includes("answer")) {
        commit("setSecurityQuestionKeyValue", {
          key: payload.errorType,
          value: "Answers cannot be empty."
        });
      } else {
        commit("setSecurityQuestionKeyValue", {
          key: payload.errorType,
          value: "Please select a security question."
        });
      }
    } else {
      commit("setSecurityQuestionKeyValue", {
        key: payload.errorType,
        value: ""
      });
    }
  },
  setPaymentMethod({ commit }, payload) {
    commit("setPaymentMethod", payload);
  },
  handleLogout({ dispatch }) {
    dispatch("setFirstName", "");
    dispatch("setLastName", "");
    dispatch("setCustomerId", "");
    dispatch("setEmail", "");
    dispatch("setPhone", "");
  },
  handleLoginInfo({ commit, dispatch }, payload) {
    dispatch("setFirstName", payload.first_name);
    dispatch("setLastName", payload.last_name);
    dispatch("setCustomerId", payload.customer_id);
    dispatch("setEmail", payload.email);
    dispatch("setPhone", payload.phone_number);
  },

  setFirstName({ state, commit }, payload) {
    commit("setFirstName", payload);
    if (!state.firstName) {
      commit("setFormError", {
        type: "firstName",
        value: "Please include a first name."
      });
    } else {
      commit("setFormError", {
        type: "firstName",
        value: ""
      });
    }
  },
  setLastName({ state, commit }, payload) {
    commit("setLastName", payload);
    if (!state.lastName) {
      commit("setFormError", {
        type: "lastName",
        value: "Please include a last name."
      });
    } else {
      commit("setFormError", {
        type: "lastName",
        value: ""
      });
    }
  },
  setEmail({ state, commit }, payload) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    commit("setEmail", payload);

    if (!re.test(state.email)) {
      commit("setFormError", {
        type: "email",
        value: "Please include a valid email address."
      });
    } else {
      commit("setFormError", {
        type: "email",
        value: ""
      });
    }
  },
  toggleEmailSubscribed({ commit }) {
    commit("toggleEmailSubscribed");
  },
  setPassword({ state, commit }, payload) {
    commit("setPassword", payload);
    let lengthCheck;
    let numberCheck;
    let upperCheck;
    const hasUpperReg = RegExp("(?=.*[A-Z])");
    const hasNumberReg = RegExp("(?=.*\\d)");

    lengthCheck = state.password.length >= 8;
    numberCheck = hasNumberReg.test(state.password);
    upperCheck = hasUpperReg.test(state.password);

    commit("setPasswordChecks", { numberCheck, lengthCheck, upperCheck });
  },
  setPasswordChecked({ commit }) {
    commit("setPasswordChecked");
  },
  setPasswordVisibility({ commit }, payload) {
    commit("setPasswordVisibility", payload);
  },
  setPhone({ state, commit }, payload) {
    let numRegex = RegExp("^[0-9]+$");
    commit("setPhone", payload);
    if (!numRegex.test(state.phone)) {
      commit("setFormError", {
        type: "phone",
        value: "Phone number can only include numbers."
      });
    } else if (state.phone.length !== 10) {
      commit("setFormError", {
        type: "phone",
        value: "Please include a 10-digit phone number."
      });
    } else {
      commit("setFormError", {
        type: "phone",
        value: ""
      });
    }
  },
  setPin({ state, commit }, payload) {
    let numRegex = RegExp("^[0-9]*$");
    commit("setPin", payload);
    if (!numRegex.test(state.pin)) {
      commit("setFormError", {
        type: "pin",
        value: "Pin number can only include numbers."
      });
    } else if (state.pin.length !== 4) {
      commit("setFormError", {
        type: "pin",
        value: "Please include a 4-digit pin number."
      });
    } else {
      commit("setFormError", {
        type: "pin",
        value: ""
      });
    }
  },
  setGenericModalVisibility({ commit }, payload) {
    commit("setGenericModalVisibility", payload);
  },
  setCustomerId({ commit }, payload) {
    commit("setCustomerId", payload);
  },
  setBillCycle({ commit }, payload) {
    commit("setBillCycle", payload);
  },
  setActivationDate({ commit }, payload) {
    commit("setActivationDate", payload);
  },
  // setPaymentMethod({ commit }, payload) {
  //   commit("setPaymentMethod", payload);
  // },
  setTermsAndConditionsChecked({ commit, state }) {
    commit("setTermsAndConditionsChecked", !state.termsAndConditionsChecked);
  },
  setSupportMessage({ commit }, payload) {
    commit("setSupportMessage", payload);
  },
  registerModule({ commit, dispatch }, payload) {
    dispatch("navigation/registerModule", payload, { root: true });
  },

  setUsedOptions({ commit, state }, payload) {
    let options = [];
    options.push(payload);
    commit("setUsedOptions", options);
  },

  setErrorModal({ commit }, payload) {
    commit("showErrorModal", payload);
  },

  setErrors({ state, dispatch }) {
    dispatch("setFirstName", state.firstName);
    dispatch("setLastName", state.lastName);
    dispatch("setEmail", state.email);
    dispatch("setPassword", state.password);
    dispatch("setPasswordChecked");
    dispatch("setPhone", state.phone);
    dispatch("setPin", state.pin);
    dispatch("setSecurityQuestionKeyValue", {
      key: "answer1",
      value: state.securityQuestions.answer1
      // errorType: "answer1Error",
    });
    dispatch("setSecurityQuestionKeyValue", {
      key: "answer2",
      value: state.securityQuestions.answer2
      // errorType: "answer2Error",
    });
    dispatch("setSecurityQuestionKeyValue", {
      key: "question1",
      value: state.securityQuestions.question1
      // errorType: "question1Error",
    });
    dispatch("setSecurityQuestionKeyValue", {
      key: "question2",
      value: state.securityQuestions.question2
      // errorType: "question2Error",
    });
  },
  async verifyForm({ state, dispatch }) {
    dispatch("setErrors");
    const errors = state.errors;
    let canContinue = true;
    for (let error in errors) {
      if (errors[error] !== "") {
        canContinue = false;
        break;
      }
    }
    for (const [key, value] of Object.entries(state.passwordChecks)) {
      if (!value) {
        canContinue = false;
        break;
      }
    }
    for (const [questionKey, questionValue] of Object.entries(
      state.securityQuestions
    )) {
      if (questionKey.includes("Error")) {
        if (questionValue) {
          canContinue = false;
          break;
        }
      }
    }
    return canContinue;
  },
  async handleApiCalls({ state, dispatch, rootState }) {
    let response;
    let requestObj = {
      first_name: state.firstName,
      last_name: state.lastName,
      email: state.email,
      mailing_list: state.emailSubscribed ? "1" : "0",
      phone_number: state.phone,
      pin: state.pin,
      session_id: rootModule.state.sessionId,
      security_question_1: state.securityQuestions.question1,
      security_question_2: state.securityQuestions.question2,
      security_answer_1: state.securityQuestions.answer1,
      security_answer_2: state.securityQuestions.answer2
    };
    let authorizedUserArr = [];
    if (state.authorizedUsers.user1.length > 0) {
      authorizedUserArr.push(state.authorizedUsers.user1);
    }
    if (state.authorizedUsers.user2.length > 0) {
      authorizedUserArr.push(state.authorizedUsers.user2);
    }
    if (authorizedUserArr.length > 0) {
      requestObj.authorizedUsers = authorizedUserArr;
    }
    if (state.customerId) {
      requestObj.customer_id = state.customerId;
      const { data } = await accountApi.updateAccount(requestObj);
      response = data;
      if (data.status === "success") {
        dispatch("setCustomerId", data.account.customer_id);
      } else {
        return { success: false, message: data.message };
      }
    } else {
      const { data } = await accountApi.createAccount(requestObj);
      response = data;
      if (data.status === "success") {
        dispatch("setCustomerId", data.account.customer_id);
      } else {
        return { success: false, message: data.message };
      }
    }

    return { success: response.status === "success" };
  },
  async handleFormStepClick({ commit, state, dispatch }, payload) {
    let canContinue = await dispatch("verifyForm");
    if (canContinue) {
      canContinue = await dispatch("handleApiCalls");
      if (canContinue) {
        dispatch("navigation/setCurrentFormStep", payload.formStep, {
          root: true
        });
      } else {
        dispatch("setModalError", canContinue.message, { root: true });
        dispatch("showModal", { currentModal: 1 }, { root: true });
      }
    } else {
      dispatch(
        "setModalError",
        "Correct the issues with your account information, then try again.",
        { root: true }
      );
      dispatch("showModal", { currentModal: 1 }, { root: true });
    }
  },
  async requestPasswordReset({ commit, state, dispatch }) {
    let resp = await accountApi.initiatePasswordReset({ email: state.email });
    if (resp.data.status == "success") {
      return true;
    } else {
      return false;
    }
  },
  async validatePasswordCode({ commit, state, dispatch }, payload) {
    let data = { customer_id: state.customerId, token: payload };
    let resp = await accountApi.validatePasswordToken(data);
    if (resp.data.status == "success") {
      return true;
    } else {
      return false;
    }
  },
  async savePassword({ commit, state, dispatch }, payload) {
    let resp = await accountApi.savePassword(payload);
    if (resp.data.status == "success") {
      return true;
    } else {
      return false;
    }
  },
  setWelcomeModalVisibility({ commit }, payload) {
    commit("setWelcomeModalVisibility", payload);
  },
  setFeedbackForm({ commit }, payload) {
    console.log(payload);
    commit("showFeedbackForm", payload);
  }
};
