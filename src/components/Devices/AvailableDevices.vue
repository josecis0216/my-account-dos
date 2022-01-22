<template>
    <div>
        <transition name="fade-slide-delay" mode="out-in">
            <SelectedDevice v-if="this.$route.meta.upgrade && this.$route.name != 'upgradeTo'" :deviceActions="'upgrade'" :injectedDevice="upgradeDevice"></SelectedDevice>
        </transition>
        <transition name="fade-slide" mode="out-in">
            <div class="box white" v-if="this.$route.name == 'device'">
                <h4 class="uk-text-center">Select A Device</h4>
                <div class="current-devices flex">
                    <div v-for="device in newDevices" :key="device.productId" class="gabb-device uk-width-1-3@m uk-width-1-1">
                        <picture>
                            <!-- <source> -->
                            <img :src="'https://gabbwireless.com/wp-content/uploads/2021/10/product-'+device.productId+'.png'">
                        </picture>
                        <h6 class="name">{{device.name}}</h6>
                        <p class="price">${{device.price}}</p>
                        <button class="btn center" @click="selectDevice(device.nameId)">Select</button>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade-slide" mode="out-in">
            <div class="box white" v-if="this.$route.name == 'upgradeTo'">
                <h4 class="uk-text-center">Upgrade to</h4>
                <div class="current-devices flex uk-flex-center">
                    <div v-for="device in upgradeDevices" :key="device.productId" class="gabb-device uk-width-1-3@m uk-width-1-1">
                        <picture>
                            <!-- <source> -->
                            <img :src="'https://gabbwireless.com/wp-content/uploads/2021/10/product-'+device.productId+'.png'">
                        </picture>
                        <h6 class="name">{{device.name}}</h6>
                        <p class="price">${{device.price}}</p>
                        <button class="btn center" @click="selectUpgradeDevice(device.nameId)">Select</button>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade-slide" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SelectedDevice from "./SelectedDevice";

export default {
    name: 'AvailableDevices',
    components: {
        SelectedDevice
    },
    props: {},
    computed: {
        ...mapGetters("devices", ["newDevices","upgradeDevice"]),
        ...mapGetters("childAccounts", ["childAccounts"]),
        upgradeDevices() {
            let upgradeableDevices = [];
            this.newDevices.forEach(element => {
                if(element.productId == 2) {
                    upgradeableDevices.push(element);
                }
                if(this.upgradeDevice.productId == 15) {
                    if(element.productId == 11) {
                        upgradeableDevices.push(element);
                    }
                }
            });
            return upgradeableDevices;
        }
    },
    methods: {
        selectDevice(id) {
            this.$router.push('/new-line/device/'+id);
        },
        selectUpgradeDevice(id) {
            this.$router.push('/new-line/upgrade/upgrade-to/'+id);
        }
    },
}
</script>

<style lang="less">
    .current-devices {
        max-width: 700px;
        margin: 0 auto;
        width: 100%;
        .gabb-device {
            img {
                display: block;
                margin: 0 auto;
            }
            .name {
                margin-bottom: 0;
                font-family: gotham-med;
                font-size: 20px;
            }
            .price {
                margin-top: 0;
                font-size: 18px;
            }
            .name,
            .price {
                text-align: center;
            }
        }
    }
</style>