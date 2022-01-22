<template>
  <div class="device">
    <div class="main-block">
      <div class="device-info uk-grid-collapse" uk-grid>
        <div class="uk-width-1-1@m uk-width-1-3">
          <picture>
            <!-- <source> -->
            <img :src="'https://gabbwireless.com/wp-content/uploads/2021/10/product-'+product_id+'.png'" />
          </picture>
        </div>
        <div class="uk-width-1-1@m uk-width-2-3 device-details">
          <h5 class="device-name">{{ productName(product_id) }}</h5>
         <h5 class="device-number">{{ device.mdn }}</h5>
        </div>
      </div>
      <div class="actions">
        <button @click="showModal()" class="btn center" style="text-align:center;">Create Child Account</button>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <CreateAccount :device="device" :deviceName="productName(product_id)" v-if="childStatus == device.mdn"></CreateAccount>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CreateAccount from "../ChildAccount/CreateAccount";

export default {
  name: "DeviceNotLinked",
  components: {
    CreateAccount
  },
  props: {
    device: { type: Object },
    type: { type: String, default: "" },
    number: { type: String, default: "" },
    name: { type: String, default: "" },
    plan: { type: String, default: "Gabb Plan" },
    plan_price: { type: String, default: "$17.99" },
    usage: { type: Object },
    product_id: { type: Number, required: true },
    mdn: { required: true },
  },
  computed: {
    ...mapGetters("childAccounts", ["childStatus"]),
  },
  methods: {
    ...mapActions("childAccounts", ["setChildModalVisibility"]),
    showModal() {
      if(typeof window.openModal == 'function') {
          window.openModal();
        }
      return this.setChildModalVisibility(this.device.mdn);
    },
    productName(id) {
      if(id == 2) {
        return 'Gabb Z2';
      }
      if(id == 11) {
        return 'Gabb Watch';
      }
      if(id == 15) {
        return 'Gabb Watch Lite';
      }
    }
  },
};
</script>

<style lang="less">
.device {
  background: #ffffff;
  border-radius: 14px;
  box-shadow: -3px 4px 14px rgba(0, 0, 0, 0.2);
  .main-block {
    padding: 0 8px;
    h6,
    p {
      margin: 0;
    }
    .device-status {
      background: #f1f1f1;
      padding: 15px 15px;
      border-radius: 8px;
      h6 {
        padding-right: 6px;
        color: #080909;
      }
      p {
        color: #313638;
        opacity: 0.5;
      }
      .plan {
        margin-bottom: 10px;
      }
      .status-bar {
        h6 {
          flex: 1;
        }
        .fas {
          color: #8e8e8e;
        }
      }
      .bar {
        display: block;
        height: 8px;
        border-radius: 30px;
        background: #8e8e8e;
        margin: 10px auto 30px;
        position: relative;
        .fill {
          display: block;
          height: 8px;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 30px;
        }
        .health-limit {
          position: absolute;
          display: block;
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
      }
      .status {
        color: #ffffff;
        padding: 4px;
        border-radius: 5px;
      }
      .Healthy {
        .status,
        .fill {
          background: #00b1e3;
        }
      }
      .High {
        .status,
        .fill {
          background: #dd9000;
        }
      }
      .Unhealthy {
        .status,
        .fill {
          background: #ed3f00;
        }
      }
      .Dangerous {
        .status,
        .fill {
          background: #e30000;
        }
      }
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
