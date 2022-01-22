<template>
    <div>
        <transition name="fade-slide-delay" mode="out-in">
            <div class="box white" v-if="this.$route.name == 'upgrade' && !upgradeDevice">
                <h4 v-if="childDevices.length >= 1" class="uk-text-center">Select A Line To Upgrade</h4>
                <div v-if="childDevices.length >= 1" class="current-devices flex uk-flex-center">
                    <div v-for="device in childDevices" :key="device.mdn" class="gabb-device uk-width-1-3@m uk-width-1-1">
                        <picture>
                            <!-- <source> -->
                            <img :src="'https://gabbwireless.com/wp-content/uploads/2021/10/product-'+device.product_id+'.png'">
                        </picture>
                        <h6 class="name">{{device.name}}</h6>
                        <p class="price">{{device.mdn}}</p>
                        <button class="btn center" @click="selectDevice(device)">Select</button>
                    </div>
                </div>
                <div style="text-align:center;padding: 10vh 0;display:block; width:100%;max-width:600px;margin:0 auto;" v-if="childDevices.length < 1">
                    <h4>Your Devices can't be upgraded!<br></h4>
                    <p>The only devices that can be upgraded currently are the Gabb Watch and the Gabb Watch Lite.<br><br>Do you need to replace a device?</p>
                    <a class="btn center outline" href="/replace-device">Replace Device</a>
                </div>
            </div>
        </transition>
        <transition name="fade-slide-delay" mode="out-in">
            <div class="box white" v-if="this.$route.name == 'upgrade' && upgradeDevice">
                <h4 class="uk-text-center" style="max-width: 450px;text-align:center;margin:10px auto 10px;">What would you like to do with your current device?</h4>
                <div class="current-devices flex uk-flex-center">
                    <div class="gabb-device uk-width-1-3@m uk-width-1-1">
                        <picture>
                        <!-- <source> -->
                            <img :src="'https://gabbwireless.com/wp-content/uploads/2021/10/product-'+upgradeDevice.product_id+'.png'">
                        </picture>
                        <h6 class="name">{{upgradeDevice.name}}</h6>
                        <p class="price">{{upgradeDevice.mdn}}</p>
                    </div>
                </div>
                <div style="max-width: 340px;margin: 0 auto;">
                    <h6><b>Select An Option</b></h6>
                    <SelectField :name="'upgrade_type'" :options="upgradeOptions" :value="'transfer'"></SelectField>
                    <button class="btn center" @click="startTransfer()">Continue</button>
                </div>
            </div>
        </transition>
        <transition name="fade-slide-delay" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SelectField from "../FormFields/SelectField";

export default {
    name: 'UpgradeDevice',
    components: {
        SelectField
    },
    props: {},
    data() {
        return {
            upgradeOptions: [
                {
                    name:'Transfer Phone Number To New Device',
                    value:'transfer',
                }
            ],
        }
    },
    mounted() {
        if(this.$route.name == 'upgrade') {
            this.setUpgradeDevice(false);
        }
    },
    computed: {
        ...mapGetters("devices", ["existingLines", "newDevices","getDeviceByMDN", "upgradeDevice"]),
        ...mapGetters("childAccounts", ["childAccounts"]),
        ...mapGetters("product", ["productInfo"]),
        childDevices() {
            let devices = [];
            let usedMdns = [];
            if(this.childAccounts.length > 0) {
                this.childAccounts.forEach(element => {
                    element.lines.forEach(line => {
                        if(line.product != 'Gabb Z2') {
                            let lineDevice = this.getDeviceByMDN(line.mdn);
                            lineDevice.name = element.firstName;

                            devices.push(lineDevice);
                            usedMdns.push(line.mdn);
                        }
                    });
                });
            }
            this.existingLines.forEach(element => {
                if(!usedMdns.includes(element.mdn)) {
                    let deviceName = '';
                    if(element.product_id == 2) {
                        deviceName = 'Gabb Z2';
                    }
                    if(element.product_id == 11) {
                        deviceName = 'Gabb Watch';
                    }
                    if(element.product_id == 15) {
                        deviceName = 'Gabb Watch Lite';
                    }
                    if(element.product_id != 2) {
                        devices.push({name: deviceName, mdn: element.mdn, product_id: element.product_id, contract_id: element.contract_id});
                    }
                } 
                
            });
            return devices;
        },
    },
    methods: {
        ...mapActions("devices", ["setUpgradeDevice"]),
        selectDevice(device) {
            this.setUpgradeDevice(device);
        },
        startTransfer() {
            // if(this.upgradeStatus) {
            //     if(this.upgradeStatus == 'transfer') {
            //         this.$router.push('/new-line/upgrade/upgrade-to/');
            //     } else {
            //         this.$router.push('/new-line/upgrade/tradein/');
            //     }
            // } else {
                this.$router.push('/new-line/upgrade/upgrade-to');
            // }
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