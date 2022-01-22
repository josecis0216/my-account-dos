<template>
    <div>
      <div class="login">
        <h3 class="small">Login to your account</h3>
        <TextField
          placeholder="Username (email address)"
          name="email"
          :value="email"
          @update-email="handleInput($event, 'Email')"
          @submit-form="submitForm($event)"
        />
        <PasswordField
          placeholder="Password"
          name="password"
          label="Password*"
          type="text"
          :value="password"
          @update-password="handleInput($event, 'Password')"
          @submit-form="submitForm($event)"
        />
        <button class="link" @click="openForgotPassword(true)">Forgot Password?</button>

        <div class="error-section">
          <ErrorMessage :error-message="loginError" />
        </div>
        <div class="button-section">
          <GenericButton
            text="Login"
            click-type="btn-login"
            class="btn center"
            @btn-login="doLogin"
          />
          <!--        <router-link class="btn center" to="">Login</router-link>-->
        </div>
      </div>
      <Support></Support>
      <transition name="fade" mode="out-in">
        <GenericModal v-if="timedOut" :injectedClass="'extra-padding'" actionType="auth" action="TimedOut">
          <h4 style="text-align: center;">It looks like your session expired.<br></h4>
          <p style="text-align: center;">Log back in to continue making changes to you account.</p>
        </GenericModal>
      </transition>
      <transition name="fade" mode="out-in">
        <GenericModal v-if="forgotPasswordModal" :injectedClass="'extra-padding forgot_password'" actionType="auth" action="ForgotPasswordModal">
            <ForgotPassword></ForgotPassword>
        </GenericModal>
      </transition>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TextField from "@/components/FormFields/TextField";
import PasswordField from "@/components/FormFields/PasswordField";
import GenericButton from "@/components/FormFields/GenericButton";
import Support from "@/components/Login/Support";
import ErrorMessage from "@/components/FormFields/ErrorMessage";
import GenericModal from '../GenericModal.vue';
import ForgotPassword from './ForgotPassword';

export default {
  name: "Login",
  components: {
    ErrorMessage,
    TextField,
    PasswordField,
    GenericButton,
    Support,
    GenericModal,
    ForgotPassword,
  },
  data() {
    return {
      securityCode: '',
    }
  },
  mounted() {
    this.doLogout();
  },
  computed: {
    ...mapGetters("auth", ["email", "password", "loginError", "timedOut", "forgotPasswordModal"]),
    ...mapGetters("account", ["welcomeModal"]),
  },
  methods: {
    handleInput(event, type) {
      this.$store.dispatch(`auth/set${type}`, event);
    },
    submitForm(e, type) {
      if(!type) {
        this.doLogin(true);
      } else {
        this.doForgotPassword();
      }
    },
    ...mapActions("auth", ["doLogout", "setForgotPasswordModal"]),
    openForgotPassword(action) {
      this.setForgotPasswordModal(action);
    },
    onLinkClicked() {
      // if(!isAuthenticated) {
      // If not authenticated, add a path where to redirect after login.
      this.$router.push({
        name: "dashboard",
        query: { redirect: "" },
      });
      // }
    },
    ...mapActions("auth", [
      "doForgotPassword",
      "doLogin",
      "setProcessingLogin",
      "setLoginSuccessful",
      "setLoginFailedMsg",
    ]),
  },
};
</script>

<style lang="less">
.error-section {
  padding: 20px;
}
.login {
  max-width: 450px;
  margin: 0 auto;
  padding: 80px 0;
  width: 80%;
  h3 {
    color: #313638;
    text-align: center;
    margin-bottom: 30px;
  }
  .field {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .checkbox-container {
    padding: 20px 0 0;
  }
  .btn {
    background: linear-gradient(#00b1e3, #236cd8);
  }
}
@media (max-width: 650px) {
  .login {
    padding: 70px 0;
    h3 {
      margin-bottom: 20px;
      font-size: 20px;
      font-family: gotham-book;
    }
    .link {
      font-size: 14px;
    }
    .btn {
      background: linear-gradient(190deg, #00b1e3, #236cd8);
      margin: 10px auto;
      text-align: center;
      width: 100px;
    }
  }
}
</style>
