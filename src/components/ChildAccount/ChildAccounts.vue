<template>
  <section class="overview-section" v-if="childAccounts.length > 0">
    <div class="title-block flex">
      <h3 style="flex: 1">Child Accounts</h3>
      <router-link class="uk-visible@m btn no-margin new-line-btn" to="/new-line/">
        Add A New Line
      </router-link>
    </div>
    <div class="devices flex uk-child-width-1-3@m uk-child-width-1-1">
      <ChildAccount
        v-for="account in childAccounts"
        :key="account.gabb_id"
        v-bind="account"
        :account="account"
        :lines="account.lines"
      ></ChildAccount>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ChildAccount from "@/components/ChildAccount/ChildAccount";

export default {
  name: "Devices",
  components: {
    ChildAccount,
  },
  props: {
    mobileBtn: String,
  },
  computed: {
    ...mapGetters("devices", ["devices", "existingLines"]),
    ...mapGetters("childAccounts", ["childAccounts"])
  },
};
</script>

<style lang="less">
.flex.devices {
  margin-left: 0px !important;
  flex-wrap: wrap !important;
  gap: 20px;
  .device {
    margin-left: 0px !important;
    margin-right: 0 !important;
    @media (min-width: 960px) {
      flex: 0 0 31%;
    }
  }
  @media (max-width: 960px) {
    flex-wrap: wrap;
  }
}
.devices-page {
  @media (max-width: 960px) {
    .title-block {
      margin-bottom: 30px;
    }
    .title-block h3 {
      font-size: 20px;
      margin-bottom: 0;
      align-self: center;
    }
  }
}
</style>
