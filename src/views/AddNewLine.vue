<template>
  <div class="animation-container">
    <div class="overview-section new-line-devices">
      <transition name="fade-slide-delay" mode="out-in">
        <div class="title-block">
          <h4 v-if="!this.$route.meta.upgrade && !this.$route.meta.replace">Add A New Line</h4>
          <h4 v-if="this.$route.meta.upgrade && !this.$route.meta.replace">Upgrade Device</h4>
          <h4 v-if="!this.$route.meta.upgrade && this.$route.meta.replace">Replace Device</h4>
        </div>
      </transition>
      <transition name="fade-slide-delay" mode="out-in">
        <div class="box white" v-if="this.$route.name == 'new-line'">
            <div class="flex">
              <div class="current-devices flex uk-flex-center">
                <div v-for="option in filteredLineOptions" :key="option.name" class="gabb-device uk-width-1-3@m uk-width-1-1">
                    <picture>
                        <!-- <source> -->
                        <img v-if="option.route != 'upgrade'" :src="'https://gabbwireless.com/wp-content/uploads/2021/10/product-2.png'">
                        <img v-if="option.route == 'upgrade'" style="max-height:120px;padding:15px;" :src="'https://gabbwireless.com/wp-content/uploads/2022/01/product-upgrade.png'">
                    </picture>
                    <h6 class="name">{{option.name}}</h6>
                    <button class="btn center" @click="selectOption(option.route)">Select</button>
                </div>
              </div>
              <!-- <AvailableDevices></AvailableDevices> -->
            </div>
        </div>
      </transition>
      <transition name="fade-slide-delay" mode="out-in">
        <router-view></router-view>
      </transition>
      <a @click="goBack()" class="btn outline">Back</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AvailableDevices from "@/components/Devices/AvailableDevices";

export default {
  name: 'AddNewLine',
  data() {
    return {
      lineOptions: [
        {name: 'Upgrade Device',route: 'upgrade'},
        {name: 'Add New Device',route: 'device'}
      ]
    }
  },
  components: {
    // AvailableDevices
  },
  computed: {
    ...mapGetters("devices", ["newDevices", "getNewDevice", "mms", "skippedMms", "upgradeDevice", "existingLines"]),
    filteredLineOptions() {
      let options = this.lineOptions;
      if(this.existingLines.length < 1) {
        options = options.splice(1,1);
      }
      return options;
    }
  },
  methods: {
    ...mapActions("devices", ["setMms", "skipMms", "setUpgradeDevice"]),
    goBack() {
      if(this.$route.params.line) {
        if(this.skippedMms){
          this.skipMms(false);
        } else {
          this.$router.go(-1)
        }
      } else {
        if(this.upgradeDevice) {
          this.setUpgradeDevice(false);
        } else {
          this.$router.go(-1)
        }
      }
    },
    selectOption(route) {
      this.$router.push('/new-line/'+route);
    }
  },
}
</script>

<style lang="less" scoped>
  .new-line-devices {
    .box {
      box-sizing: border-box;
      margin: 30px 0 10px;
    }
  }
</style>