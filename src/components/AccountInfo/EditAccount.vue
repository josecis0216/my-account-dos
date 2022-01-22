<template>
  <div class="overview-section personal-fields">
    <div class="title-block flex">
      <h4 style="flex: 1;">Personal Details</h4>
      <button
        v-if="!editAccount"
        @click="startEditAccount"
        class="btn no-margin"
      >
        Edit
      </button>
    </div>
    <div class="flex account-info-fields">
      <div class="field uk-width-1-1">
        <h6 class="subtitle-2">First Name</h6>
        <TextField
          name="firstName"
          :customClass="{ disabled: !editAccount }"
          :value="firstName"
          @update-firstName="handleInput($event, 'FirstName', 'account')"
        >
          {{ firstName_error }}</TextField
        >
      </div>
      <div class="field uk-width-1-1">
        <h6 class="subtitle-2">Last Name</h6>
        <TextField
          name="lastName"
          required=""
          :customClass="{ disabled: !editAccount }"
          :value="lastName"
          @update-lastName="handleInput($event, 'LastName', 'account')"
          >{{ lastName_error }}</TextField
        >
      </div>
      <div class="field uk-width-1-1">
        <h6 class="subtitle-2">
          Email<span style="font-size:75%;color:#A3A3A3;"
            >(This is your username)</span
          >
        </h6>
        <TextField
          name="email"
          :customClass="{ disabled: !editAccount }"
          :value="email"
          @update-email="handleInput($event, 'Email', 'account')"
          >{{ email_error }}</TextField
        >
      </div>

      <div v-if="!editAccount" class="field uk-width-1-1">
        <h6 class="subtitle-2">Address</h6>
        <p class="subtitle-2">
          {{ accountStreetAddress }} {{ accountApt }}<br />{{ accountCity }},
          {{ accountState }} {{ accountZip }}
        </p>
      </div>

      <div class="field uk-width-1-2@m uk-width-1-1 address" v-if="editAccount">
        <h6 class="subtitle-2">Address Line 1</h6>
        <transition name="fade" mode="out-in">
          <TextField
            v-if="editAccount"
            name="accountStreetAddress"
            :value="accountStreetAddress"
            @update-accountStreetAddress="
              handleInput($event, 'StreetAddress', 'address')
            "
            >{{ accountStreetAddress_error }}</TextField
          >
        </transition>
      </div>

      <div class="field uk-width-1-2@m uk-width-1-1 address" v-if="editAccount">
        <h6 class="subtitle-2">Address Line 2</h6>
        <transition name="fade" mode="out-in">
          <TextField
            v-if="editAccount"
            name="accountApt"
            :value="accountApt"
            @update-accountApt="handleInput($event, 'Apt', 'address')"
            >{{ accountApt_error }}</TextField
          >
        </transition>
      </div>

      <div class="field uk-width-1-2@m uk-width-1-1 address" v-if="editAccount">
        <h6 class="subtitle-2">City</h6>
        <transition name="fade" mode="out-in">
          <TextField
            v-if="editAccount"
            name="accountCity"
            :value="accountCity"
            @update-accountCity="handleInput($event, 'City', 'address')"
            >{{ accountCity_error }}</TextField
          >
        </transition>
      </div>

      <div class="field uk-width-1-5@m uk-width-1-2" v-if="editAccount">
        <h6 class="subtitle-2">State</h6>
        <transition name="fade" mode="out-in">
          <TextField
            v-if="editAccount"
            name="accountState"
            :value="accountState"
            @update-accountState="
              handleInput($event, 'AddressState', 'address')
            "
            >{{ accountState_error }}</TextField
          >
        </transition>
      </div>

      <div class="field uk-width-1-5@m uk-width-1-2" v-if="editAccount">
        <h6 class="subtitle-2">Zipcode</h6>
        <transition name="fade" mode="out-in">
          <TextField
            v-if="editAccount"
            name="accountZip"
            :value="accountZip"
            @update-accountZip="handleInput($event, 'Zip', 'address')"
            >{{ accountZip_error }}</TextField
          >
        </transition>
      </div>

      <div class="field uk-width-1-1">
        <h6 class="subtitle-2">Account Phone Number</h6>
        <TextField
          name="accountPhone"
          :customClass="{ disabled: !editAccount }"
          :value="accountPhone"
          @update-accountPhone="handleInput($event, 'Phone', 'account')"
          >{{ accountPhone_error }}</TextField
        >
      </div>

      <div class="field uk-width-1-2">
        <h6 class="subtitle-2">Authorized User 1</h6>
        <TextField
          name="authorizedUser"
          :customClass="{ disabled: !editAccount }"
          :value="authorizedUser1"
          @update-authorizedUser="
            handleInput($event, 'AuthorizedUser1', 'account')
          "
        />
      </div>

      <div class="field uk-width-1-2">
        <h6 class="subtitle-2">Authorized User 2</h6>
        <TextField
          name="authorizedUser"
          :customClass="{ disabled: !editAccount }"
          :value="authorizedUser2"
          @update-authorizedUser="
            handleInput($event, 'AuthorizedUser2', 'account')
          "
        />
      </div>

      <div
        class="field"
        :class="{ 'uk-width-1-1': editAccount, 'uk-width-1': !editAccount }"
      >
        <h6 class="subtitle-2">Security Pin</h6>
        <TextField
          name="security_pin"
          :customClass="{ disabled: !editAccount }"
          :value="security_pin"
          @update-security_pin="handleInput($event, 'Pin', 'account')"
          >{{ account_pin_error }}</TextField
        >
      </div>

      <div class="field uk-width-1-1">
        <h6 class="subtitle-2">Security Questions</h6>
        <div class="flex security-quest">
          <SecurityQuestionDropdown
            number="1*"
            name="question1"
            v-if="editAccount"
            :disabledClass="!editAccount"
            :customClass="{ disabled: !editAccount }"
            :value="securityQuestions.question1"
            @update-question1="handleInputSecurity($event, 'question1')"
          >
          </SecurityQuestionDropdown>

          <TextField
            placeholder="Security Answer 1*"
            name="answer1"
            label="answer1label"
            :customClass="{ disabled: !editAccount }"
            :value="securityQuestions.answer1"
            @update-answer1="handleInputSecurity($event, 'answer1')"
          >
            <ErrorMessage :error-message="securityQuestions.question1Error" />
          </TextField>
        </div>
        <div class="flex security-quest">
          <SecurityQuestionDropdown
            number="2*"
            name="question2"
            v-if="editAccount"
            :value="securityQuestions.question2"
            :disabledClass="!editAccount"
            :customClass="{ disabled: !editAccount }"
            @update-question2="handleInputSecurity($event, 'question2')"
          >
          </SecurityQuestionDropdown>

          <TextField
            placeholder="Security Answer 2*"
            name="answer2"
            label="answer2label"
            :customClass="{ disabled: !editAccount }"
            :value="securityQuestions.answer2"
            @update-answer2="handleInputSecurity($event, 'answer2')"
          >
            <ErrorMessage :error-message="securityQuestions.question2Error" />
          </TextField>
        </div>
      </div>

      <button
        class="btn no-margin left"
        @click="resetPassword"
        v-if="!editAccount"
      >
        Reset Password
      </button>

      <transition name="fade" mode="out-in">
        <div v-if="passwordResetStatus">
          <PasswordReset @close-password="closePasswordReset"></PasswordReset>
        </div>
      </transition>
    </div>

    <button
      v-if="editAccount"
      @click="saveMyAccountInfo"
      class="btn no-margin left"
    >
      Save Changes
    </button>
    <button
      v-if="editAccount"
      @click="cancelSaveAccountInfo"
      class="link margin"
    >
      Cancel
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import TextField from "@/components/FormFields/TextField";
import SelectField from "../FormFields/SelectField";
import ErrorMessage from "@/components/FormFields/ErrorMessage";
import SecurityQuestionDropdown from "../FormFields/SecurityQuestionDropdown";
import PasswordReset from "./PasswordReset";

export default {
  name: "EditAccount",
  components: {
    PasswordReset,
    TextField,
    ErrorMessage,
    SecurityQuestionDropdown
  },
  async mounted() {
    // this.setIsEditingInfoStatus(false);
    await this.handleInitAddresses(this.token);
    this.setIsLoadingStatus(false);
  },
  data() {
    return {
      phone: "",
      noPhone: false,
      answer2: false,
      infoWasChanged: false,
      editAccount: false,
      passwordResetError: "",
      passwordResetMessage: "",
      passwordResetStatus: false
    };
  },
  computed: {
    ...mapGetters(["getDateTime"]),
    ...mapGetters("account", [
      "account_number",
      "account_activation",
      "firstName",
      "lastName",
      "email",
      "accountPhone",
      "authorizedUser1",
      "authorizedUser2",
      "security_pin",
      "password",
      "passwordVisible",
      "genericModalStatus",
      "securityQuestions"
    ]),
    ...mapGetters("address", [
      "accountStreetAddress",
      "accountState",
      "accountCity",
      "accountApt",
      "accountZip"
    ]),
    ...mapGetters("auth", ["token"])
  },

  methods: {
    closePasswordReset() {
      this.passwordResetStatus = false;
    },
    handleInputSecurity(value, key) {
      console.log(value);
      console.log(key);
      this.setSecurityQuestionKeyValue({
        key,
        value,
        errorType: `${key}Error`
      });
    },
    handleInput(event, type, actionType) {
      event =
        actionType === "account"
          ? event
          : { value: event, type: "accountAddress" };
      this._data.infoWasChanged = true;
      this.$store.dispatch(`${actionType}/set${type}`, event, { root: true });
    },

    ...mapActions("account", ["setPasswordModalVisibility"]),

    startEditAccount() {
      this.editAccount = true;
    },
    async saveMyAccountInfo() {
      if (!this.firstName) {
        this.firstName_error = "* " + "Required";
      }
      if (!this.lastName) {
        this.lastName_error = "* " + "Required";
      }
      if (!this.email) {
        this.card_name_error = "* " + "Required";
      }
      if (!this.accountStreetAddress) {
        this.accountStreetAddress_error = "* " + "Required";
      }
      if (!this.accountApt) {
        this.accountApt_error = "* " + "Required";
      }
      if (!this.accountCity) {
        this.accountCity_error = "* " + "Required";
      }
      if (!this.accountState) {
        this.accountState_error = "* " + "Required";
      }
      if (!this.accountZip) {
        this.accountZip_error = "* " + "Required";
      }
      if (!this.accountPhone) {
        this.accountPhone_error = "* " + "Required";
      }
      if (!this.security_pin) {
        this.security_pin_error = "* " + "Required";
      }

      this.setIsLoadingStatus(true);
      try {
        this.editAccount = false;
        if (this._data.infoWasChanged) {
          // dispatch api calls
          await this.saveAccountInfo();
          await this.saveAccountAddress();
        }
        this.setIsLoadingStatus(false);
      } catch (error) {
        console.log({ error });
      }
    },
    cancelSaveAccountInfo() {
      this.editAccount = false;
    },
    async resetPassword() {
      this.setIsLoadingStatus(true);
      let resp = await this.requestPasswordReset();
      if (resp) {
        this.passwordResetStatus = true;
        this.passwordResetError = false;
        this.passwordResetMessage = "";
        this.setIsLoadingStatus(false);
      } else {
        this.passwordResetError = true;
        this.passwordResetMessage =
          "We were unable to send you your password reset token at this time. Please try again later.";
      }
    },
    ...mapActions("address", ["handleInitAddresses", "saveAccountAddress"]),
    ...mapActions("account", [
      "initCustomerState",
      "saveAccountInfo",
      "requestPasswordReset"
    ]),
    ...mapActions(["setIsLoadingStatus"])
  }
};
</script>

<style lang="less" scoped>
.required :after {
  content: "*";
}
.security-quest {
  flex: 1;
  select {
    padding-right: 20px;
  }
}
</style>
