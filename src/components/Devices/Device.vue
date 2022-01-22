<template>
  <div class="device">
    <div class="main-block">
      <div class="device-info uk-grid-collapse" uk-grid>
        <div class="uk-width-1-1@m uk-width-1-3">
          <picture>
            <!-- <source> -->
            <img
              :src="
                'https://gabbwireless.com/wp-content/uploads/2021/10/product-' +
                  product_id +
                  '.png'
              "
            />
          </picture>
        </div>
        <div class="uk-width-1-1@m uk-width-2-3 device-details">
          <h5 class="device-name">{{ name ? name : phoneInfo(product_id) }}</h5>
          <p v-if="name" class="subtitle-4 device-type">
            {{ phoneInfo(product_id) }}
          </p>
          <h5 class="device-number">{{ mdn }}</h5>
        </div>
      </div>
      <div class="device-status">
        <div class="plan flex uk-visible@m">
          <h6 class="subtitle-2">{{ contract(device).name }}:</h6>
          <p class="subtitle-3">${{ contract(device).price }}/mo</p>
        </div>
        <HealthStatus :usage="usage" injectedClass="no-padding"></HealthStatus>
      </div>
      <div class="plan flex uk-hidden@m">
        <h6 class="subtitle-2">
          {{ plan }}<span class="uk-visible@m">:</span>
        </h6>
        <p class="subtitle-3">{{ plan_price }}</p>
      </div>
      <div class="actions" v-if="!assignment">
        <button
          @click="showModal()"
          class="btn center"
          style="text-align:center;"
        >
          Create Child Account
        </button>
      </div>
    </div>
    <div class="view" v-if="assignment">
      <div>
        <router-link :to="'/accounts/' + assignment">
          <span>View Details</span>
        </router-link>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <CreateAccount
        :device="device"
        :deviceName="phoneInfo(product_id)"
        v-if="childStatus == device.mdn"
      ></CreateAccount>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import HealthStatus from "./HealthStatus";
import CreateAccount from "../ChildAccount/CreateAccount";

export default {
  name: "Device",
  props: {
    device: { type: Object },
    type: { type: String, default: "" },
    number: { type: String, default: "" },
    name: { type: String, default: "" },
    plan: { type: String, default: "Gabb Plan" },
    plan_price: { type: String, default: "$17.99" },
    usage: { type: Object },
    product_id: { type: Number, required: true },
    mdn: { required: true }
  },
  components: {
    HealthStatus,
    CreateAccount
  },
  mounted() {
    this.assignment = this.getAssignment;
  },
  data() {
    return {
      assignment: false
    };
  },
  computed: {
    ...mapGetters("childAccounts", ["childStatus"]),
    ...mapGetters("devices", ["checkDeviceAssignment", "getDevcieContract"]),
    getAssignment() {
      return this.checkDeviceAssignment(this.mdn);
    }
  },
  methods: {
    ...mapActions("childAccounts", ["setChildModalVisibility"]),
    contract(device) {
      return this.getDevcieContract({
        product_id: device.product_id,
        contract_id: device.contract_id
      });
    },
    showModal() {
      if (typeof window.openModal == "function") {
        window.openModal();
      }
      return this.setChildModalVisibility(this.device.mdn);
    },
    phoneInfo(id) {
      var name = "Gabb Product";
      if (id == 2) {
        name = "Gabb Z2";
      }
      if (id == 11) {
        name = "Gabb Watch";
      }
      if (id == 15) {
        name = "Gabb Watch Lite";
      }
      return name;
    }
  }
};
</script>

<style lang="less">
.device {
  background: #ffffff;
  border-radius: 14px;
  box-shadow: -3px 4px 14px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  .main-block {
    padding: 0 8px;
    h6,
    p {
      margin: 0;
    }
    .actions {
      width: 90%;
      margin: 15px auto 25px;
      a {
        display: block;
        margin-bottom: 5px;
        text-decoration: underline;
      }
    }
    flex: 1;
  }
  .view {
    background: #313638;
    color: #ffffff;
    font-size: 20px;
    text-align: center;
    padding: 10px;
    border-radius: 0 0 14px 14px;
    margin-top: 10px;
    a {
      color: #ffffff;
      display: flex;
      align-items: center;
      text-align: center;
      margin: 0 auto;
      text-decoration: none !important;
      span {
        display: flex;
        margin: 0 auto;
        &:after {
          content: "\f105";
          font-size: 30px;
          font-family: "icomoon";
          speak: never;
          font-style: normal;
          font-weight: normal;
          font-variant: normal;
          text-transform: none;
          line-height: 1;
          padding-left: 20px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      }
    }
  }
  .device-info {
    text-align: center;
    flex-wrap: wrap;
    img {
      display: block;
      margin: 0 auto;
      margin-top: 15px;
    }
    .device-name {
      font-family: "gotham-med";
    }
    .device-type {
      color: #313638;
      opacity: 0.8;
      font-size: 12px;
    }
    .device-number {
      color: #313638;
      margin-bottom: 20px;
      opacity: 0.8;
      font-size: 20px;
    }
  }
  @media (max-width: 960px) {
    margin-bottom: 40px;
    .status-bar {
      .subtitle-2 {
        font-family: gotham-med;
      }
      .health-limit b {
        color: #313638;
        font-family: gotham-med !important;
      }
    }
    .device-info img {
      margin-bottom: 10px;
      margin-top: 5px;
    }
    .device-details {
      display: table;
      align-self: center;
      padding-left: 20px;
    }
    .device-name {
      text-align: left;
      font-size: 20px;
      font-family: gotham-med;
      margin-bottom: 0;
    }
    .device-type {
      text-align: left;
      margin: 0px auto;
      font-size: 14px !important;
    }
    .device-status {
      padding: 10px 15px !important;
    }
    .device-number {
      margin-bottom: 0 !important;
      text-align: left;
    }
    .plan {
      margin: 0 auto;
      display: flex;
      padding-top: 15px;
      width: 90%;
      h6 {
        font-family: gotham-med;
        padding-right: 5px;
      }
      .subtitle-3 {
        align-self: flex-end;
      }
    }
    .actions {
      margin: 10px auto 20px !important;
      a {
        font-size: 14px;
      }
    }
    .view {
      font-size: 16px;
      a:after {
        font-size: 24px;
      }
    }
  }
}
</style>
