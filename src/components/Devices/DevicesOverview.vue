<template>
  <section class="overview-section">
    <div class="title-block flex">
      <h3 style="flex: 1">Devices</h3>
      <GenericButton
        v-if="childAccounts.length < 1"
        class="btn no-margin new-line-btn"
        :class="{ 'uk-visible@m': !mobileBtn }"
        text="Add A New Line"
      ></GenericButton>
    </div>
    <div class="devices flex uk-child-width-1-3@m uk-child-width-1-1">
      <Device
        v-for="device in existingLines"
        :key="device.external_id"
        v-bind="device"
        :device="device"
        :product_id="device.product_id"
        :usage="device.usage"
      ></Device>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import GenericButton from "@/components/FormFields/GenericButton";
import Device from "@/components/Devices/Device";

export default {
  name: "Devices",
  components: {
    GenericButton,
    Device,
  },
  props: {
    mobileBtn: String,
  },
  computed: {
    ...mapGetters("devices", ["existingLines", "devices"]),
    ...mapGetters("childAccounts", ["childAccounts"]),
  },
};
</script>

<style lang="less">
.flex.devices {
  margin-left: -20px;
  flex-wrap: nowrap;
  .device {
    margin-left: 20px;
    margin-right: 0;
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
