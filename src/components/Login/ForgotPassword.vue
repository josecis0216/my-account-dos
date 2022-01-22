<template>
    <div>
        <transition name="fade-slide-delay" mode="out-in">
            <div v-if="forgotPasswordModal == true">
            <h4 style="text-align: center;">Forgot Password<br></h4>
            <p style="text-align: center;">Enter your email address below to reset your password</p>
            <TextField
                placeholder="Email"
                name="email"
                :value="email"
                @update-email="handleInput($event, 'Email')"
                @submit-form="submitForm($event, 'forgotPassword')"
            />
            </div>
        </transition>
        <transition name="fade-slide" mode="out-in">
            <div v-if="forgotPasswordModal == 'success'">
            <h4 style="text-align: center;">Verifying it's you...<br></h4>
            <p style="text-align: center;">For your security, we need to verify your identity. We've sent a code to your email address. Please enter it below:</p>
            <TextField
                placeholder="Security Code"
                name="securityCode"
                :value="securityCode"
                @update-securityCode="handleInput($event, 'SecurityCode')"
                @submit-form="submitForm($event, 'validateToken')"
            >
                {{(forgotPasswordError ? forgotPasswordError : '')}}
            </TextField>
            </div>
        </transition>
        <transition name="fade-slide" mode="out-in">
            <div v-if="forgotPasswordModal == 'updatePassword'">
            <h4 style="text-align: center;">Create a New Password<br></h4>
            <p style="text-align: center;">Type your new password</p>
            <PasswordField
                placeholder="New Password"
                name="newPassword"
                :value="newPassword"
                @update-newPassword="handleInput($event, 'NewPassword')"
                @submit-form="submitForm($event, 'createNewPassword')"
            />
            </div>
        </transition>
        <transition name="fade-slide" mode="out-in">
            <div v-if="forgotPasswordModal == 'passwordUpdated'">
            <h4 style="text-align: center;">Password Reset<br></h4>
            <p style="text-align: center;">Your password has been reset.</p>
            </div>
        </transition>
        <div class="actions" v-if="forgotPasswordModal != 'passwordUpdated'">
            <button class="link" @click="openForgotPassword(false)">Cancel</button>
            <button class="btn" @click="checkInputs">Reset Password</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TextField from "@/components/FormFields/TextField";
import PasswordField from "@/components/FormFields/PasswordField";

export default {
    name: 'ForgotPassword',
    components: {
        TextField,
        PasswordField,
    },
    computed: {
    ...mapGetters("auth", ["email", "forgotPasswordModal", "securityCode", "newPassword", "customerId", "forgotPasswordError", "customerId"]),
    },
    methods: {
        ...mapActions("auth", ["setForgotPasswordModal", "doForgotPassword", "validateNewPasswordToken", "updateCustomerPassword"]),
        handleInput(event, type) {
          this.$store.dispatch(`auth/set${type}`, event);
        },
        openForgotPassword(action) {
          this.setForgotPasswordModal(action);
        },
        checkInputs() {
            if(this.forgotPasswordModal == true) {
                this.doForgotPassword();
            }
            if(this.forgotPasswordModal == 'success') {
                this.validateNewPasswordToken();
            }
            if(this.forgotPasswordModal == 'updatePassword') {
                this.updateCustomerPassword({token:this.securityCode,password:this.newPassword,customer_id:this.customerId});
            }
        },
        submitForm(e, type) {
            if(type == 'forgotPassword') {
                this.doForgotPassword();
            }
            if(type == 'validateToken') {
                this.validateNewPasswordToken();
            }
            if(type == 'createNewPassword') {
                this.updateCustomerPassword({token:this.securityCode,password:this.newPassword,customer_id:this.customerId});
            }
        },
        
    }
}
</script>

<style lang="less" scoped>
    .field {
        input {
            padding: 15px 15px 13px !important;
        }
    }
</style>