import authApi from "@/api/auth";
import customerApi from "@/api/customer";
import childAccountApi from "@/api/childAccount";
import router from "../../routes/routes";
import Vue from "vue";
export default {
  async doLogout({ commit, dispatch }) {
    document.cookie = "gabb_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    Vue.$cookies.remove(
      "gabb_auth_token",
      null,
      `.${window.location.hostname}`
    );

    commit("setLoggedInStatus", false);
    commit("setLoginToken", "");

    await dispatch('childAccounts/clearTheState', true, { root: true });
    await dispatch('devices/clearTheState', true, { root: true });
    await dispatch('orders/clearTheState', true, { root: true });
    await dispatch('payment/clearTheState', true, { root: true });

    await router.push("/login").catch(e => e);
  },
  setTimedOut({ commit }, payload) {
    commit("setTimedOut", payload);
  },
  setLoginSuccessful({ commit }, payload) {
    commit("setLoginSuccessful", payload);
  },
  setError({ commit }, payload) {
    commit("setError", payload);
  },
  setEmail({ commit }, payload) {
    commit("setEmail", payload);
  },
  setPassword({ commit }, payload) {
    commit("setPassword", payload);
  },
  setLoginToken({ commit }, payload) {
    document.cookie = "gabb_auth_token="+payload+";";

    Vue.$cookies.set(
      "gabb_auth_token",
      payload,
      "2d",
      null,
      `.${window.location.hostname}`,
      true
    );
    // console.log(Vue.$cookies.get("gabb_auth_token"));
    // console.log("after token setting");
    // console.log({ payload });
    commit("setLoginToken", payload);
    // console.log(payload)
  },
  async doLogin({ commit, dispatch, state, rootState }) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(state.email)) {
      dispatch("setError", {
        value: "Please enter a valid email address",
        errorType: "loginError"
      });
      return;
    } else if (state.password.length < 1) {
      dispatch("setError", {
        value: "Please enter a password",
        errorType: "loginError"
      });
      return;
    }

    dispatch("setIsLoadingStatus", true, { root: true });

    let { data: loginData } = await authApi.doLogin({
      email: state.email,
      session_id: rootState.sessionId,
      password: state.password
    });

    if (loginData.status === "error") {
      // dispatch("setPassword", "");
      dispatch("setLoginToken", "");
      dispatch("setError", {
        value: "Your email or password is incorrect. Please try again.",
        errorType: "loginError"
      });
    } else {
      // login successful
      commit("setLoggedInStatus", true);
      dispatch("setLoginToken", loginData.results);
      dispatch("setError", { value: "", errorType: "loginError" });
      dispatch("setLoginSuccessful", true);
      let { data: initData } = await customerApi.loadInitialCustomerInfo({
        token: loginData.results
      });

      if (initData.status !== "success") {
        dispatch("setError", {
          value: "Something went wrong on our server. Please try again later.",
          errorType: "loginError"
        });
      } else {
        // initData.response.lines.forEach(element => console.log(element));
        // console.log('Send to add devices');
        if(typeof window.showLoggedInMenu == 'function') {
          window.showLoggedInMenu();
        }
        if(initData.response.lines) {
          await dispatch(
            "devices/initDevicesModule",
            { lines: initData.response.lines, token: loginData.results },
            { root: true }
          );
        }


        await dispatch(
          "childAccounts/getChildAccounts", loginData.results,
          { root: true },
        );

        // GET THE PAYMENTS
        await dispatch(
          "payment/initPaymentModule",
          {
            transactions: initData.response.transactions,
            lastPaymentInfo: initData.response.lastPaymentInfo
          },
          { root: true },
          // console.log(initData.response)
        );

        await dispatch("account/initCustomerState", loginData.results, {
          root: true
        });
        await dispatch(
          "address/handleInitAddresses",

          loginData.results,
          { root: true }
        );
        // don't remove the .catch
        await router.push({ name: "overview" }).catch(e => e);
      }
      dispatch("setIsLoadingStatus", false, { root: true });
    }
    dispatch("setIsLoadingStatus", false, { root: true });
  },
  async handleInitAuth({ dispatch, commit }, loginCookie) {
    try {
      if (process.env.NODE_ENV === "development") {
        // await dispatch("setEmail", "testing126@test.com");
        // await dispatch("setPassword", "Password1");
        //
        // let token = await dispatch("doLogin");
        // await dispatch("loadCustomerInfo", { token: token });
        // await dispatch("doLogout");
      } else {
        if (loginCookie !== null) {
          await dispatch("loadCustomerInfo", { token: loginCookie });
        } else if (this.isLoggedIn) {
          await this.$store.dispatch("auth/doLogout");
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  // FORGOT PASSWORD FUNCTIONS
  setForgotPasswordModal({commit, dispatch}, payload) {
    commit("setForgotPasswordModal", payload);
  },
  setSecurityCode({commit, dispatch}, payload) {
    commit("setSecurityCode", payload);
  },
  setNewPassword({commit, dispatch}, payload) {
    commit("setNewPassword", payload);
  },
  setForgotPasswordError({commit, dispatch}, payload) {
    commit("setForgotPasswordError", payload);
  },
  setFPCustomerId({commit, dispatch}, payload) {
    commit("setFPCustomerId", payload);
  },

  async doForgotPassword({ dispatch, state }) {
    console.log(state.email);
    let { data: forgotPasswordData } = await authApi.forgotPasswordRequest({
      email: state.email,
    });
    
    if(forgotPasswordData.status == 'success') {
      dispatch('setForgotPasswordModal', 'success');
    }
  },

  async validateNewPasswordToken({commit, dispatch, state}, payload) {
    let { data: validateToken } = await authApi.validatePassToken({
      token: state.securityCode,
    });
    if(validateToken.status == 'success') {
      dispatch('setFPCustomerId', validateToken.customer_id);
      dispatch('setForgotPasswordModal', 'updatePassword');
      dispatch('setForgotPasswordError', '');
    } else {
      dispatch('setForgotPasswordError', validateToken.message);
    }
  },

  async updateCustomerPassword({commit, dispatch}, payload) {
    let { data: updatePassword } = await authApi.updatePassword({
      token: payload.token,
      customer_id: payload.customer_id,
      password: payload.password,
    });
    console.log(updatePassword)
    if(updatePassword.status == 'success') {
      dispatch('setForgotPasswordModal', 'passwordUpdated');
    }
  },
};
