<template>
  <div class="account-tab">
      <div class="title-block flex" v-if="!$route.params.order">
        <h3>Personal Info</h3>
        <button class="btn no-margin right" @click="openModal">Edit Personal Info</button>
      </div>
      <div class="box">
          <div class="flex" style="align-items: center;">
              <picture v-if="account.accountImage">
                <!-- <source> -->
                <img class="profile-image" :src="account.accountImage" />
            </picture>
            <picture v-if="!account.accountImage">
                <!-- <source> -->
                <img width="80" height="80" src="https://gabbwireless.com/wp-content/uploads/2021/11/gabb-profile-blank-1.png" />
            </picture>
            <div class="account-name">
                <h4>{{$route.params.child}}</h4>
                <!-- <p>jordanlove</p> -->
                <!-- <GenericButton injectedClass="link" text="Change Password"></GenericButton> -->
            </div>
          </div>
      </div>
      <transition name="fade" mode="out-in">
        <EditAccount v-if="childStatus" :account="account"></EditAccount>
      </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EditAccount from '../ChildAccount/EditAccount';

export default {
  name: "PersonalInfo",
  components: {
      EditAccount
  },
  props: ['account'],
  mounted() {
    if(this.account.lines) {
      var detailedLines = [];
      this.account.lines.forEach(element => {
        if(!element.contract_id) {
          var fullDetails = this.getDeviceByMDN(element.mdn);
          console.log(fullDetails);
          detailedLines.push(fullDetails);
        } else {
          detailedLines.push(element);
        }
      });
      this.updateChildDevices({account: this.account.gabb_id,lines: detailedLines})
    }
    // this.updateChildDevice()
  },
  computed: {
    ...mapGetters("childAccounts", ["childStatus"]),
    ...mapGetters("devices", ["getDeviceByMDN"]),
  },
  methods: {
    ...mapActions("devices", ["setStatusModalVisibility"]),
    ...mapActions("childAccounts", ["setChildModalVisibility","updateChildDevices"]),
    openModal() {
      if(typeof window.openModal == 'function') {
        window.openModal();
      };
      this.setChildModalVisibility(true);
    }
  },
};
</script>

<style lang="less" scoped>
  img {
    margin-right: 30px;
  }
  .account-name {
    h4 {
      margin-bottom: 5px;
    }
    p {
      margin-top: 0;
      margin-bottom: 5px;
    }
    .link,p {
      padding-left: 0;
      font-size: 14px;
    }
  }
  @media (max-width: 960px) {
    .box {
      margin-top: 10px;
    }
  }
</style>
