<template>
  <div class="account-tab">
      <div class="title-block flex" v-if="!$route.params.order">
        <h3>Devices</h3>
      </div>
      <div class="deivce-box box" v-for="device in account.lines" :key="device.mdn">
        <picture>
          <!-- <source> -->
          <img :src="'https://gabbwireless.com/wp-content/uploads/2021/10/product-'+getDeviceByMDN(device.mdn).product_id+'.png'" />
        </picture>
        <div class="device-details" :class="{porting: getDeviceByMDN(device.mdn).is_port}">
          <h4>{{getNewDeviceById(device.product_id).name}}</h4>
          <h5 v-if="getDeviceByMDN(device.mdn).product_id != 15">{{device.mdn}}</h5>
          <p>{{deviceStatus(getDeviceByMDN(device.mdn).status,getDeviceByMDN(device.mdn).activation_date)}}</p>
        </div>
        <div class="actions">
          <p style="margin-bottom:5px;"><b>Coming Soon:</b></p>
          <!-- @click="changePlan(device)" -->
          <button  class="link disabled" :class="{'uk-hidden': (device.product_id == 11 && device.contract_id == 3)}">Change Plan</button>
          <!-- @click="replaceDevice(device)" -->
          <button  class="link disabled">Replace Device</button>
          <!-- @click="startSimSwap(device)" -->
          <button  class="link disabled">Swap SIM Number</button>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ChildDevices",
  components: {
  },
  props: ['account'],
  computed: {
    ...mapGetters("auth", ["token"]),
    ...mapGetters("devices", ["getDeviceByMDN", "getNewDeviceById"]),
  },
  mounted() {
    this.setPlanChangeDevice(false);
  },
  methods: {
    ...mapActions("devices", ["setStatusModalVisibility", "setSimSwapModalVisibility", "setPlanChangeDevice", "setReplaceDevice"]),
    changePlan(line) {
      this.setPlanChangeDevice(line);
      this.$router.push('/plan-change');
    },
    replaceDevice(line) {
      this.setReplaceDevice(line);
      this.$router.push('/new-line/replace');
    },
    startSimSwap(line) {
      var devices = {};
      if(line) {
        var currentLine = {};
        currentLine.mdn = line.mdn;
        currentLine.productId = this.getDeviceByMDN(line.mdn).product_id;
        currentLine.name = this.account.firstName;
        devices.old = currentLine;
      }
      if(this.account.pendingDevice) {
        var newLine = {};
        newLine.mdn = '-';
        newLine.productId = this.account.pendingDevice.product_id;
        newLine.name = this.account.pendingDevice.name;
        newLine.sim = this.account.pendingDevice.icc;
        devices.old = newLine;
      }
      this.setSimSwapModalVisibility(devices);
    },
    deviceStatus: function(status,date) {
      var text = '';
      var formatDate = new Date(date.replace(' 00:', 'T00:'));
      if(status == 'Active') {
        text = 'Activated: '+(formatDate.getMonth() + 1)+'/'+formatDate.getDate()+'/'+formatDate.getFullYear();
      }
      if(status == 'Porting') {
        text = 'Number Port Pending...';
      }
      if(status == 'not-active') {
        text = 'Not Active';
      }
      return text;
    },
  },
};
</script>

<style lang="less" scoped>
  .account-tab {
    margin-bottom: 40px;
  }
  .box {
    margin-bottom: 30px;
  }
  .deivce-box {
    display: flex;
    align-items: center;
    .device-details {
      h4,h5 {
        margin-bottom: 5px;
      }
      p {
        margin-top: 0;
        opacity: 0.6;
      }
      &.porting {
        h5 {
          opacity: 0.2;
        }
        p {
          opacity: 1;
        }
      }
    }
    .actions {
      display: table;
      width: 200px;
      margin: 0 0 0 auto;
      .link {
        text-decoration: underline;
        padding-bottom: 10px;
        font-size: 14px;
        padding-left: 0;
        &.disabled {
          color: #999;
          // pointer-events: none;
          cursor: not-allowed !important;
        }
      }
    }
    @media (max-width: 700px) {
      flex-wrap: wrap;
      .actions {
        margin: -10px auto 0 !important;
        width: auto;
      }
    }
  }
</style>
