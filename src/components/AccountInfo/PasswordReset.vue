Reset Password
<template>
  <div class="modal-overlay">
    <transition name="fade" mode="out-in">
      <div class="account-modal new-modal forgot_password" v-if="!passwordReset">
        <button class="close-modal" @click="closeModal"></button>
        <div class="modal-dialog">
          <!-- <p>
            A code has been sent to your email on file. Please enter in the code
            to reset your password
          </p> -->
          <transition name="fade-out" mode="out-in">
            <div v-if="!codeVerified">
              <h4 style="text-align: center;">Verifying it's you...<br></h4>
              <p style="text-align: center;">For your security, we need to verify your identity. We've sent a code to your email address. Please enter it below:</p>
              <TextField
                :value="code"
                name="code"
                type="text"
                placeholder="Code"
                @update-code="updateCode($event)"
              >
                {{ codeErrorMessage }}
              </TextField>
              <button @click="validateCode" class="btn center">
                Validate Code
              </button>
            </div>
          </transition>
          
          <transition name="fade-slide" mode="out-in">
            <div v-if="codeVerified">
              <h4 style="text-align: center;">Create a New Password<br></h4>
              <p style="text-align: center;">Type your new password</p>
              <PasswordField
                toolTip="New Password"
                placeholder="New Password"
                name="password"
                :value="password"
                @update-password="updatePassword"
              />
              <div v-if="passwordError">{{ passwordErrorMessage }}</div>
              <button @click="handleSavePassword" class="btn center">
                Save Password
              </button>
            </div>
          </transition>
        </div>
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div class="account-modal new-modal forgot_password" v-if="passwordReset">
        <button class="close-modal" @click="closeModal"></button>
        <div class="modal-dialog">
          <h4 style="text-align: center;">
            Password Reset
          </h4>
          <p style="text-align: center;">Your password has been reset.</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PasswordField from "../FormFields/PasswordField";
import TextField from "../FormFields/TextField";

export default {
  name: "PasswordReset",
  components: {
    PasswordField,
    TextField,
  },
  data() {
    return {
      passwordReset: false,
      codeVerified: false,
      code: "",
      codeError: false,
      codeErrorMessage: "",
      passwordError: false,
      passwordErrorMessage: "",
    };
  },
  props: {},
  computed: {
    ...mapGetters("account", ["genericModalStatus", "password", "customerId"]),
  },
  methods: {
    ...mapActions(["setIsLoadingStatus"]),
    ...mapActions("account", [
      "setGenericModalVisibility",
      "validatePasswordCode",
      "setPassword",
      "savePassword",
    ]),
    closeModal() {
      if(typeof window.closeModal == 'function') {
          window.closeModal();
        };
      this.$emit("close-password");
    },
    async validateCode() {
      let resp = await this.validatePasswordCode(this.code);
      if (resp) {
        this.codeVerified = true;
        this.codeError = false;
        this.codeErrorMessage = "";
      } else {
        this.codeVerified = false;
        this.codeError = true;
        this.codeErrorMessage = "Invalid code";
      }
    },
    async handleSavePassword() {
      this.setIsLoadingStatus(true);
      let data = {
        token: this.code,
        customer_id: this.customerId,
        password: this.password,
      };
      let resp = await this.savePassword(data);
      if (resp) {
        this.setIsLoadingStatus(false);
        this.passwordReset = true;
        this.passwordError = false;
        this.passwordErrorMessage = "";
      } else {
        this.passwordError = true;
        this.passwordErrorMessage =
          "We were unable to change your password at this time. Please try again later.";
      }
    },
    updateCode(value) {
      this.code = value;
    },
    updatePassword(value) {
      this.setPassword(value);
    },
  },
};
</script>

<style lang="less">
.close {
  float: right;
  border: #fff;
  cursor: pointer;
  background-color: #fff;
  outline: none;
  overflow: hidden;
}
.quick-transitions {
  transition: all 0.2s ease-in-out 0s;
  -moz-transition: all 0.2s ease-in-out 0s;
  -webkit-transition: all 0.2s ease-in-out 0s;
}
.transitions {
  transition: all 0.5s ease-in-out 0s;
  -moz-transition: all 0.5s ease-in-out 0s;
  -webkit-transition: all 0.5s ease-in-out 0s;
}
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 100000000;
  .new-modal {
    background: #ffffff;
    border-radius: 14px;
    box-sizing: border-box;
    padding: 40px;
    position: fixed;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    max-width: 560px;
    width: 90%;
    .modal-intro {
      flex: 1;
      p {
        max-width: 410px;
      }
      hr {
        margin-bottom: 30px;
        margin-top: 40px;
        width: 50px;
      }
    }
    .health-btn {
      border: 0;
      border-radius: 5px;
      padding: 5px 10px;
      margin-right: 30px;
      opacity: 0.2;
      font-size: 14px;
      font-family: gotham-med;
      color: #ffffff;
      .quick-transitions();
      &.active {
        opacity: 1;
      }
      &[status="healthy"] {
        background: #00b1e3;
        .quick-transitions();
      }
      &[status="high"] {
        background: #dd9000;
        .quick-transitions();
      }
      &[status="unhealthy"] {
        background: #ed3f00;
        .quick-transitions();
      }
      &[status="very_unhealthy"] {
        background: #e30000;
        .quick-transitions();
      }
    }
    .health-bar {
      display: block;
      height: 8px;
      border-radius: 30px;
      background: #8e8e8e;
      margin: 20px auto 30px;
      position: relative;
      .fill {
        display: block;
        height: 8px;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 30px;
        .transitions();
      }
      .health-limit {
        position: absolute;
        display: block;
        left: 50%;
        &:before {
          content: "";
          position: absolute;
          background: #f1f1f1;
          height: 8px;
          width: 1px;
        }
        b {
          &:before {
            content: "";
            width: 0;
            height: 0;
            border-top: 4px solid transparent;
            border-bottom: 4px solid transparent;
            border-right: 5px solid #8e8e8e;
            position: relative;
            transform: rotate(90deg);
            display: block;
            margin: 0 auto -1px;
          }
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0);
          top: 12px;
          font-family: gotham-book;
          font-size: 10px;
        }
      }
      &.healthy {
        .fill {
          width: 20%;
        }
        .status,
        .fill {
          background: #00b1e3;
        }
      }
      &.high {
        .fill {
          width: 40%;
        }
        .status,
        .fill {
          background: #dd9000;
        }
      }
      &.unhealthy {
        .fill {
          width: 60%;
        }
        .status,
        .fill {
          background: #ed3f00;
        }
      }
      &.very_unhealthy {
        .fill {
          width: 95%;
        }
        .status,
        .fill {
          background: #e30000;
        }
      }
    }
    .health-info {
      height: 140px;
      div {
        position: absolute;
      }
    }
  }
}

@media (max-width: 960px) {
  .modal-overlay .new-modal.account-modal {
    padding: 20px;
    .modal-intro {
      h4 {
        max-width: 200px;
      }
      hr {
        position: relative !important;
        margin-bottom: 10px;
        margin-top: 15px;
        width: 50px;
        right: auto;
      }
    }
    .modal-dialog {
      padding: 5px;
      .health-select {
        display: flex;
        overflow: scroll;
        width: 100%;
        .health-btn {
          display: table;
          line-height: 14px;
          font-size: 12px;
          height: 25px;
          margin-bottom: 15px;
          margin-right: 15px;
          &:nth-child(4) {
            box-sizing: content-box;
            display: block;
            position: relative;
            width: 200px;
          }
        }
      }
    }
    .health-info {
      height: 240px;
      p.subtitle-2 {
        max-width: 80%;
      }
    }
    .title-block :last-child {
      position: absolute;
      right: 10px;
      top: 8px;
      height: 30px;
      width: 30px;
    }
  }
}
</style>
