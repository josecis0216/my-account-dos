<template>
    <div>
        <div class="title-block">
            <h4 >Add A New Line</h4>
        </div>
        <div class="box white">
          <div class="flex">
            <div class="current-devices flex uk-flex-center">
              <div v-for="option in lineOptions" :key="option.name" class="gabb-device uk-width-1-3@m uk-width-1-1">
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
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'NoDevices',
    data() {
        return {
        lineOptions: [
            {name: 'Add New Device',route: 'device'}
        ]
        }
    },
    components: {
        // AvailableDevices
    },
    computed: {
        ...mapGetters("devices", ["newDevices", "getNewDevice", "mms", "skippedMms", "upgradeDevice"]),
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

</style>