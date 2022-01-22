<template>
  <section class="overview-section">
    <PersonalInfo :account="myAccount"></PersonalInfo>
    <ChildDevices :account="myAccount"></ChildDevices>
    <div class="flex logs-container">
      <PhoneLog :account="myAccount"></PhoneLog>
      <TextLog :account="myAccount"></TextLog>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import ChildSubscriptions from './ChildSubscriptions.vue';
import PersonalInfo from './PersonalInfo.vue';
import ChildDevices from './ChildDevices.vue';
import PhoneLog from '../Logs/PhoneLog';
import TextLog from '../Logs/TextLog';

export default {
  name: "SingleChildAccount",
  components: {
      PersonalInfo,
      // ChildSubscriptions,
      ChildDevices,
      PhoneLog,
      TextLog
  },
  computed: {
    ...mapGetters("childAccounts", ["getchildAccountById", "getchildAccountByName"]),
    myAccount() {
      return this.getchildAccountByName(this.$route.params.child);
    },
  },
  methods: {
    ...mapActions("devices", ["setStatusModalVisibility"]),
  },
};
</script>

<style lang="less">
  .account-tab {
    margin-bottom: 40px;
    .box {
      background: #ffffff;
      border-radius: 14px;
      box-shadow: -3px 4px 14px rgba(0, 0, 0, 0.2) !important;
    }
  }
  .logs-container {
    .overview-section {
      flex: 1;
    }
    @media (max-width: 960px) {
      flex-direction: column;
      .overview-section p {
        text-align: center;
      }
    }
  }
</style>
