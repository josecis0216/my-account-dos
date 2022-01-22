<template>
  <div class="account device">
    <div class="main-block">
      <div class="device-info uk-grid-collapse" uk-grid>
        <div class="uk-width-1-1@m uk-width-1-3">
          <picture v-if="ImageExist">
            <!-- <source> -->
            <img class="profile-image" :src="accountImage" />
          </picture>
          <picture v-if="!ImageExist">
            <!-- <source> -->
            <img width="80" height="80" src="https://gabbwireless.com/wp-content/uploads/2021/11/gabb-profile-blank-1.png" />
          </picture>
        </div>
        <div class="uk-width-1-1@m uk-width-2-3 device-details">
          <h5 class="device-name">{{ firstName }}</h5>
          <!-- <p>{{firstName+lastName.charAt(0)}}</p> -->
          <div v-if="lines && lines.length > 0">
            <h5 class="device-number" v-for="line in lines" :key="line.mdn">{{ line.mdn }}</h5>
          </div>
        </div>
        <HealthStatus v-if="foundDevice" :usage="(foundDevice.usage ? foundDevice.usage : '')"></HealthStatus>
      </div>
    </div>
    <div class="view">
      <router-link
          :to="'/accounts/' + firstName"
        >
        <span>
          View Details
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import HealthStatus from "../Devices/HealthStatus";

export default {
  name: "ChildAccount",
  components: {
    HealthStatus
  },
  props: [
    'account',
    'accountImage',
    'firstName',
    'lastName',
    'username',
    'gabb_id',
    'birthDay',
    'gender',
    'lines',
  ],
  computed: {
    ...mapGetters("auth", ["token"]),
    ...mapGetters("devices", ["getDeviceByMDN"]),
    foundDevice() {
      if(this.lines && this.lines.length > 0) {
        var device = this.getDeviceByMDN(this.lines[0].mdn)
      } else {
        device = false;
      }
      if(device) {
        return device;
      } else {
        return false;
      }
    },
    ImageExist() {
        var img = new Image();
        img.src = this.accountImage;
        return img.height != 0;
    }
  },
};
</script>

<style lang="less">
.account {
  padding: 10px 0 0;
  .profile-image {
    border-radius: 100px;
    height: 80px;
    width: 80px;
    margin: 10px auto;
    overflow: hidden;
    position: relative;
    margin-bottom: 15px !important;
  }
  .main-block {
    padding: 0 8px;
    h6,
    p {
      margin: 5px auto;
      font-size: 12px;
      color: #8E8E8E;
    }
    img {
      margin-bottom: 20px;
    }
    .device-number {
      color: #313638;
      opacity: 0.8;
    }
    .device-status {
      background: #f1f1f1;
      padding: 15px 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      h6 {
        padding-right: 6px;
        color: #080909;
      }
      p {
        color: #313638;
        opacity: 0.5;
      }
    }
  }
}
</style>
