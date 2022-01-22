<template>
  <section class="account-info-section">
    <div class="overview-section account-fields">
      <div class="title-block">
        <h4>Account Information</h4>
      </div>
      <div class="flex box account-overview">
        <div class="uk-width-1-4@m uk-width-1-2">
          <h6 class="subtitle-2">Account Number</h6>
          <p class="subtitle-2">{{ account_number }}</p>
        </div>
        <div class="uk-width-auto@m uk-width-1-2">
          <h6 class="subtitle-2">Customer Since</h6>
          <p class="subtitle-2">{{ account_activation.slice(0, -17) }}</p>
        </div>
      </div>
    </div>

    <EditAccount v-if="initData"></EditAccount>
    <EditPayments v-if="initData"></EditPayments>
    <transition name="fade" mode="out-in">
      <GenericModal v-if="errorModal" actionType="account" action="ErrorModal">
        <h4 style="text-align: center;">Changes Not Saved</h4>
        <p style="text-align: center;">
          Looks like we are having trouble making your changes... Please try
          again later
        </p>
      </GenericModal>
    </transition>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import GenericModal from "../GenericModal.vue";
import EditAccount from "./EditAccount";
import EditPayments from "./EditPayments";

export default {
  name: "AccountInfo",
  components: {
    EditAccount,
    EditPayments,
    GenericModal
  },
  data() {
    return {
      initData: true,
    }
  },
  async mounted() {
    this.initData = await this.initCustomerState(this.token);
    this.setIsLoadingStatus(false);
  },
  props: {
    title: String
  },
  computed: {
    ...mapGetters(["getDateTime"]),
    ...mapGetters("account", [
      "account_number",
      "account_activation",
      "errorModal"
    ]),
    ...mapGetters("auth", ["token"])
  },
  methods: {
    ...mapActions(["setIsLoadingStatus", "setErrorModal"]),
    ...mapActions("account", ["initCustomerState"]),
  }
};
</script>

<style lang="less">
.account-info-section {
  .box {
    background: #f1f1f1;
  }
  .overview-section {
    .flex {
      flex-wrap: wrap;
    }
    .account-overview {
      box-sizing: border-box;
      width: 100%;
    }
    .link {
      padding: 15px;
    }
    .account-info-fields {
      max-width: 700px;
      .uk-width-1-1.field {
        .field {
          width: 50%;
        }
        @media (max-width: 960px) {
          padding-right: 0;
          margin-bottom: 0;
          width: 100%;
          .field {
            padding-right: 0;
            width: 100%;
          }
        }
        input-group.names {
          display: flex;
        }
      }
      .uk-width-1-1.field.address {
        .field {
          width: 100%;
        }
      }
      &.billing {
        .field {
          margin-bottom: 5px;
        }
      }
    }
    h6 {
      color: #313638;
      font-family: "gotham-med";
    }
    p {
      margin-top: 5px;
    }
    .field {
      box-sizing: border-box;
      margin-bottom: 20px;
      padding-right: 10px;
      .form-field {
        box-sizing: border-box;
        input {
          box-sizing: border-box;
        }
      }
      h6 {
        color: #313638;
        font-family: "gotham-med";
      }
      p {
        color: #313638;
        opacity: 0.8;
        span {
          display: block;
        }
      }
      &.password {
        align-self: center;
        a {
          color: #00b1e3;
        }
        @media (max-width: 960px) {
          margin-bottom: 15px !important;
        }
      }
    }
    .edit-payment {
      max-width: 350px;
      display: flex;
      flex-wrap: wrap;
      .field {
        margin-bottom: 5px;
      }
    }
    &.personal-fields {
      margin-bottom: 100px;
      @media (max-width: 960px) {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
