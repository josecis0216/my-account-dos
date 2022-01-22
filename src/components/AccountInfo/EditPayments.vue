<template>
  <div class="address_and_payment">
    <div class="overview-section payment-fields">
      <div class="title-block flex">
        <h4 style="flex: 1;">Payment Information</h4>
        <button
          v-if="!editPayment"
          @click="editThePayment"
          class="btn no-margin"
        >
          Edit
        </button>
      </div>
      <div>
        <div
          class="payment"
          v-for="method in payment_methods"
          :key="method.card_number"
          :class="{ 'edit-payment': editPayment }"
        >
          <div class="field" v-if="!editPayment">
            <h6 class="subtitle-2">{{ method.type }}</h6>
            <p class="subtitle-2">
              <span>
                <h6 class="subtitle-2">Name</h6>
                {{ method.name }}</span
              >
              <br />
              <span
                ><h6 class="subtitle-2">Card Number</h6>
                {{ method.lastDigits }}</span
              >
              <br />
              <span
                ><h6 class="subtitle-2">
                  Expiration Date
                </h6>
                {{ method.card_expiration }}
              </span>
            </p>
          </div>
          <div class="field uk-width-1-1" v-if="editPayment">
            <h6 class="subtitle-2">Name On Card</h6>
            <transition name="fade" mode="out-in">
              <TextField
                v-if="editPayment"
                name="name"
                :value="method.name"
                @update-name="handleInputPayment($event, 'PaymentMethod')"
              />
            </transition>
          </div>
          <div class="field uk-width-1-1" v-if="editPayment">
            <h6 class="subtitle-2">Card Number</h6>
            <transition name="fade" mode="out-in">
              <TextField
                v-if="editPayment"
                name="card_number"
                class="hide-label"
                placeholder="0000 0000 0000 0000"
                :value="method.card_number"
                @update-card_number="handleInput($event, 'PaymentMethod')"
              />
            </transition>
          </div>
          <div class="field uk-width-1-2" v-if="editPayment">
            <h6 class="subtitle-2">Expiration Date</h6>
            <transition name="fade" mode="out-in">
              <TextField
                v-if="editPayment"
                name="expiration_date"
                class="hide-label"
                placeholder="00/00"
                :value="expiration_date"
                @update-expiration_date="
                  handleInput($event, 'PaymentMethod', 'account')
                "
              />
            </transition>
          </div>
          <div class="field uk-width-1-3" v-if="editPayment">
            <h6 class="subtitle-2">CVV</h6>
            <transition name="fade" mode="out-in">
              <TextField
                v-if="editPayment"
                name="cvv"
                class="hide-label"
                placeholder="000"
                :value="cvv"
                @update-cvv="handleInput($event, 'PaymentMethod', 'account')"
              />
            </transition>
          </div>
        </div>
      </div>
    </div>

    <div class="overview-section billing-fields">
      <div class="title-block flex">
        <h6 class="subtitle-2" style="flex: 1;">Billing Address</h6>
      </div>
      <div
        class="flex account-info-fields billing"
        v-for="method in payment_methods"
        :key="method.card_number"
        :class="{ 'edit-billing': editPayment }"
      >
        <div
          class="field uk-width-1-2@m uk-width-1-1 address"
          v-if="editPayment"
        >
          <h6 class="subtitle-2">Address Line 1</h6>
          <transition name="fade" mode="out-in">
            <TextField
              v-if="editPayment"
              name="name"
              :value="firstName"
              @update-email="handleInput($event, 'name')"
            />
          </transition>
        </div>
        <div
          class="field uk-width-1-2@m uk-width-1-1 address"
          v-if="editPayment"
        >
          <h6 class="subtitle-2">Address Line 2</h6>
          <transition name="fade" mode="out-in">
            <TextField
              v-if="editPayment"
              name="name"
              :value="name"
              @update-email="handleInput($event, 'name')"
            />
          </transition>
        </div>
        <div
          class="field uk-width-1-2@m uk-width-1-1 address"
          v-if="editPayment"
        >
          <h6 class="subtitle-2">City</h6>
          <transition name="fade" mode="out-in">
            <TextField
              v-if="editPayment"
              name="city"
              :value="city"
              @update-email="handleInput($event, 'city')"
            />
          </transition>
        </div>
        <div class="field uk-width-1-5@m uk-width-1-2" v-if="editPayment">
          <h6 class="subtitle-2">State</h6>
          <transition name="fade" mode="out-in">
            <SelectField
              v-if="editPayment"
              name="state"
              :value="state"
            ></SelectField>
          </transition>
        </div>
        <div class="field state uk-width-1-5@m uk-width-1-2" v-if="editPayment">
          <h6 class="subtitle-2">Zipcode</h6>
          <transition name="fade" mode="out-in">
            <TextField
              v-if="editPayment"
              name="zipcode"
              :value="shippingZip"
              @update-email="handleInput($event, 'zipcode')"
            />
          </transition>
        </div>
      </div>
      <button
        v-if="editPayment"
        @click="saveMyPaymentInfo"
        class="btn no-margin left"
      >
        Save Changes
      </button>
      <button v-if="editPayment" @click="cancelsavePayment" class="link margin">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import TextField from "@/components/FormFields/TextField";
import SelectField from "../FormFields/SelectField";

export default {
  name: "EditPayments",
  components: {
    TextField,
    SelectField
  },
  async mounted() {
    console.log(this.isEditingInfo);
    // this.setIsEditingInfoStatus(false);
    this.editPayments(false);
    await this.initCustomerState(this.token);
    await this.handleInitAddresses(this.token);
    this.setIsLoadingStatus(false);
  },

  data() {
    return {
      infoWasChanged: false,
      editPayment: false,
      card_name: this.firstName + " " + this.lastName,
      card_number: "",
      expiration_date: "",
      cvv: "",
      // ERRORS
      card_name_error: "",
      card_number_error: "",
      date_error: "",
      cvv_error: "",
      address_error: "",
      city_error: "",
      state_error: "",
      zip_error: ""
    };
  },
  props: {
    title: String
  },
  computed: {
    ...mapGetters(["getDateTime"]),
    ...mapGetters("account", [
      "genericModalStatus",
      "account_number",
      "account_activation",
      "firstName",
      "lastName",
      "email",
      "accountPhone",
      "authorizedUser1",
      "authorizedUser2",
      "isEditingInfo",
      "security_pin",
      "password",
      "payment_methods",
      "editPayment",
      "passwordVisible"
    ]),
    ...mapGetters("address", [
      "accountStreetAddress",
      "accountState",
      "accountCity",
      "accountApt",
      "accountZip",
      "shippingStreetAddress",
      "shippingApt",
      "shippingState",
      "shippingCity",
      "shippingZip"
    ]),
    ...mapGetters("auth", ["token"])
  },

  methods: {
    ...mapActions("account", ["setSecurityQuestionKeyValue"]),

    ...mapActions("account", [
      "setIsEditingInfoStatus",
      "editPayments",
      "setPasswordModalVisibility"
    ]),
    editThePayment() {
      this.editPayment = true;
    },
    async saveMyPaymentInfo() {
      this.setIsLoadingStatus(true);
      try {
        this.editPayment = false;
        if (this._data.infoWasChanged) {
          // dispatch api calls
          await this.savePaymentInfo();
          await this.saveAccountAddress();
        }
        this.setIsLoadingStatus(false);
      } catch (error) {
        console.log({ error });
      }
    },
    savePayment() {
      if (!this.expiration_date) {
        this.date_error = "Required";
      }
      if (!this.cvv) {
        this.cvv_error = "Required";
      }
      if (!this.card_name) {
        this.card_name_error = "Required";
      }
      if (!this.card_number) {
        console.log("test");
        this.card_number_error = "Required";
      }
      if (!this.accountStreetAddress) {
        this.address_error = "Required";
      }
      if (!this.accountCity) {
        this.city_error = "Required";
      }
      if (!this.accountState) {
        this.state_error = "Required";
      }
      if (!this.accountZip) {
        this.zip_error = "Required";
      }
      // this.editPayment = false;
    },
    cancelsavePayment() {
      this.editPayment = false;
    },
    ...mapActions("account", ["setSecurityQuestionKeyValue"]),
    handleInputPayment(value, key) {
      console.log(value);
      console.log(key);
      this.setPaymentMethod({
        key,
        value,
        errorType: `${key}Error`
      });
    },
    // handleInputPaymentInfo(event, type, actionType) {
    //   console.log("");
    //   console.log(event, type, actionType);
    //   event =
    //     actionType === "payment"
    //       ? event
    //       : { value: event, type: "accountAddress" };
    //   this._data.infoWasChanged = true;
    //   console.log({ event, type });
    //   console.log(`${actionType}/set${type}`, event);

    //   this.$store.dispatch(`${actionType}/set${type}`, event, { root: true });
    // },

    handleInput(event, type, actionType) {
      console.log("");
      console.log(event, type, actionType);
      event =
        actionType === "account"
          ? event
          : { value: event, type: "accountAddress" || "paymentMethod" };
      this._data.infoWasChanged = true;
      console.log({ event, type });
      console.log(`${actionType}/set${type}`, event);

      this.$store.dispatch(`${actionType}/set${type}`, event, { root: true });
    },

    async saveMyAccountInfo() {
      this.setIsLoadingStatus(true);
      try {
        this.editPayment = false;
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
      this.setIsEditingInfoStatus(false);
      console.log("Cancel");
    },

    // cancelsavePayment() {
    //   this.editPayments(false);
    //   console.log("Cancel");
    // },
    ...mapActions("address", ["handleInitAddresses", "saveAccountAddress"]),
    ...mapActions("account", [
      "initCustomerState",
      "saveAccountInfo",
      "savePaymentInfo",
      "requestPasswordReset",
      "saveBillingAddress",

    ]),
    ...mapActions(["setIsLoadingStatus"])
  }
};
</script>

<style lang="less" scoped>
.address_and_payment {
  @media (max-width: 960px) {
    margin-top: 60px;
  }
}
.field {
  .form-field {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    .select-box {
      flex: 1;
      padding-right: 10px;
      position: relative;
      select {
        display: table;
        width: 100%;
        border: none;
        background-color: #f9f9f9;
        padding: 17px 15px;
        border-radius: 5px;
        box-sizing: border-box;
        position: relative;
        z-index: 2;
        -webkit-appearance: none;
      }
      &:after {
        content: "\f105";
        color: #00b1e3;
        font-family: "icomoon" !important;
        speak: never;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        transform: rotate(90deg);
        right: 30px;
        z-index: 2;
        position: absolute;
        top: 27px;
        display: table;
        font-size: 15px;
      }
    }
    i {
      margin-left: 10px;
    }
    .arrow {
      padding-right: 10px;
    }
    .error {
      color: red;
      text-align: left;
      font-size: 12px;
      margin: -5px 0 10px 10px;
    }
  }
}
</style>
