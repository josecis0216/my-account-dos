<template>
  <div class="basic-data">
    <BillingOverview v-if="lastPaymentInfo" title="Dashboard"></BillingOverview>
    <ChildAccounts v-if="childAccounts"></ChildAccounts>
    <UnlinkedDevices v-if="existingLines.length > 0"></UnlinkedDevices>
    <NoDevices v-if="existingLines.length < 1"></NoDevices>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import BillingOverview from "@/components/Billing/BillingOverview";
import UnlinkedDevices from "@/components/Devices/UnlinkedDevices";
import ChildAccounts from "@/components/ChildAccount/ChildAccounts";
import NoDevices from './NoDevices';
export default {
  name: "AccountOverview",
  components: {
    BillingOverview,
    UnlinkedDevices,
    ChildAccounts,
    NoDevices,
  },
  computed: {
    ...mapGetters("childAccounts", ["childAccounts"]),
    ...mapGetters("devices", ["existingLines"]),
    ...mapGetters("payment", ["lastPaymentInfo"]),
  },
  methods: {},
};
</script>
<style lang="less">
.basic-data {
  h3 {
    line-height: 30px;
    margin-bottom: 30px;
  }
}
.overview-section {
  margin-bottom: 35px;
}
.flex {
  display: flex;
  flex-wrap: wrap;
}
.box {
  background: #f6f6f6;
  padding: 30px 25px;
  border-radius: 7px;
  margin-right: 20px;
  box-sizing: border-box;
  &.white {
    background: #ffffff;
    box-shadow: -1px 4px 14px rgba(0,0,0,0.2);
  }
  &.flex {
    display: flex;
  }

  &.previous {
    margin-right: 0px;
  }
  .previous-payment {
    color: #8e8e8e;
  }
  @media (max-width: 960px) {
    padding: 15px 20px;
    margin-right: 0;
    width: 100%;
  }
}
</style>
