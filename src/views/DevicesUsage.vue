<template>
<div class="animation-container">
    <div class="devices-page">
      <Devices mobileBtn="true"></Devices>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Devices from "../components/Devices/DevicesOverview";
export default {
  name: 'DevicesUsage',
  components: {
    Devices
  }
}
</script>

<style lang="less" scoped>
</style>