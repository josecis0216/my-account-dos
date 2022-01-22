<template>
<div class="animation-container">
  <div class="single-device">
    <div v-if="!getDeviceById">
      <div class="overview-section">
        <h4>No Device found</h4>
        <p>It looks like you don't have a device selected that belongs to you.</p>
      </div>
    </div>
    <DeviceDetails 
      v-if="getDeviceById"
      :device="getDeviceById"
    ></DeviceDetails>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DeviceDetails from "../components/Devices/DeviceDetails";
export default {
  name: 'SingleDevice',
  components: {
    DeviceDetails
  },
  computed: {
    ...mapGetters("devices", ["devices"]),
    getDeviceById() {
      let arr = this.devices;
      let value = this.$route.query.id;
      for (var i=0, iLen=arr.length; i<iLen; i++) {
        if (arr[i].device_id == value){
          return arr[i];
        }
      }
      return false;
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>