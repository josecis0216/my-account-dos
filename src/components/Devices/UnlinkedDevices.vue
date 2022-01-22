<template>
  <section class="overview-section" v-if="getUnassignedDevices.length > 0">
    <div class="title-block flex">
      <h3 style="flex: 1">
        <span v-if="childAccounts.length < 1">Devices</span>
        <span v-if="childAccounts.length > 0">Other Devices</span>
      </h3>
    </div>
    <div class="devices flex uk-child-width-1-3@m uk-child-width-1-1">
      <DeviceNotLinked
        v-for="device in getUnassignedDevices"
        :key="device.external_id"
        v-bind="device"
        :device="device"
        :usage="device.usage"
      ></DeviceNotLinked>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import DeviceNotLinked from "@/components/Devices/DeviceNotLinked";

export default {
  name: "Devices",
  components: {
    DeviceNotLinked,
  },
  props: {
    mobileBtn: String,
  },
  computed: {
    ...mapGetters("devices", ["existingLines", "devices", "getUnassignedDevices"]),
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
