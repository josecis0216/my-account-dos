<template>
    <div class="modal-overlay">
        <div class="password-reset-modal new-modal">
            <div class="title-block">
                <div class="modal-intro">
                    <h4 class="uk-text-center">Your password reset instructions will be sent to this email:</h4>
                    <TextField
                        placeholder="john.doe@gmail.com..."
                        name="reset_email"
                        customClass="center-placeholder"
                        value=""
                    ></TextField>  
                    <div class="password-actions">
                        <button @click="cancelSendResetEmail" class="link margin">Cancel</button>
                        <button @click="sendResetEmail" class="btn no-margin left">Reset Password</button>
                    </div>
                </div>
                <div>
                    <button class="close-modal" @click="closeModal"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TextField from "@/components/FormFields/TextField";

export default {
  name: "PasswordResetModal",
  components: {
    TextField,
  },
  computed: {},
  props: {},
  methods: {
    ...mapActions("account", ["setPasswordModalVisibility"]),
    closeModal() {
      if(typeof window.closeModal == 'function') {
          window.closeModal();
        };
      this.setPasswordModalVisibility(false);
    },
    cancelSendResetEmail() {
      this.setPasswordModalVisibility(false);
    },
    sendResetEmail() {
      this.setPasswordModalVisibility(false);
    },
  },
};
</script>

<style lang="less">
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
  .new-modal.password-reset-modal {
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
      h4 {
        padding: 30px 0 10px;
        margin-bottom: 0;
      }
    }
    .center-placeholder {
      max-width: 300px;
      margin: 0 auto;
      label {
        opacity: 0;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
      }
      input:focus + label {
        opacity: 0 !important;
      }
      input:placeholder-shown + label {
        opacity: 1;
      }
      input {
        padding: 15px 15px 15px !important;
        text-align: center;
      }
    }
    .close-modal {
      position: absolute;
      right: 25px;
      top: 25px;
    }
    .password-actions {
      display: table;
      margin: 10px auto 30px;
      button {
        display: table-cell;
        &.link {
          cursor: pointer;
          padding-right: 20px;
        }
      }
    }
  }
}
#account-app .modal-overlay .new-modal .form-field input {
  padding: 15px 15px 15px !important;
  font-size: 14px;
}

@media (max-width: 960px) {
  .modal-overlay .new-modal.password-reset-modal {
    padding: 35px;
    .modal-intro {
      h4 {
        font-size: 20px;
        line-height: 25px;
        max-width: 260px;
        margin: 0 auto;
      }
    }
  }
  .close-modal {
    &:before,
    &:after {
      height: 30px !important;
    }
  }
}
</style>