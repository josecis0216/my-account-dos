<template>
    <div class="box grey new-selected-line" :class="{'plan-change': deviceActions == 'planChange'}">
        <div v-if="injectedDevice && deviceActions" class="selected-device" style="flex-wrap:wrap;margin-right:20px;">
            <p class="label" style="display: table-caption;margin-bottom: 10px;">
                <span v-if="deviceActions == 'upgrade'">Current Line</span>
                <span v-if="deviceActions == 'planChange'">Current Plan</span>
            </p>
            <div class="image">
                <picture>
                    <img :src="'https://gabbwireless.com/wp-content/uploads/2021/11/new-line-'+injectedDevice.product_id+'.png'">
                </picture>
            </div>
            <div class="details" v-if="deviceActions == 'upgrade'">
                <p class="heading">{{injectedDevice.name}}</p>
                <p class="price">{{injectedDevice.mdn}}</p>
            </div>
            <div class="details" v-if="deviceActions == 'planChange'">
                <p class="heading">{{contract(injectedDevice).name}}</p>
                <p class="price">${{contract(injectedDevice).price}}/mo</p>
            </div>
        </div>
        <transition name="fade-slide-old" mode="out-in">
            <div v-if="nextDevice" class="selected-device">
                <p v-if="!injectedDevice && !deviceActions" class="label" style="display: table-caption;margin-bottom: 10px;">
                    New Line
                </p>
                <p v-if="injectedDevice && deviceActions" class="label" style="display: table-caption;margin-bottom: 10px;">
                    Upgrading To
                </p>
                <div class="image">
                    <picture>
                        <img :src="'https://gabbwireless.com/wp-content/uploads/2021/11/new-line-'+nextDevice.productId+'.png'">
                    </picture>
                </div>
                <div class="details" v-if="deviceActions != 'planChange'">
                    <p class="heading">{{nextDevice.name}}</p>
                    <p class="price">${{nextDevice.price}}</p>
                </div>
                <div class="details" v-if="deviceActions == 'planChange'">
                    <p class="heading">{{contract(nextDevice, true).name}}</p>
                    <p class="price">${{contract(nextDevice, true).price}}/mo</p>
                    <p v-if="mms" class="price" style="margin-top:-10px;">$5.00/mo(MMS)</p>
                </div>
            </div>
        </transition>
        <transition name="fade-slide-old" mode="out-in">
            <div v-if="$route.params.addon" class="plus">+</div>
        </transition>
        <transition name="fade-slide-old" modef="out-in">
            <div v-if="$route.params.addon" class="selected-device">
                <p class="label" style="display: table-caption;margin-bottom: 10px;opacity:0;">Plan</p>
                <div class="details">
                    <p class="heading">{{getSelectedPlan().name}}</p>
                    <p class="price">${{getSelectedPlan().price}}/mo</p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'SelectedDevice',
    components: {},
    props: ['injectedDevice', 'deviceActions', 'mms'],
    computed: {
        ...mapGetters("devices", ["newDevices", "getNewDevice", "getDevcieContract", "newPlan"]),
        nextDevice() {
            let device = false;
            if(this.deviceActions == 'planChange') {
                device = this.injectedDevice;
                device.productId = device.product_id;
                device.newContract = this.newPlan.contract_id;
            } else {
                device = this.getNewDevice(this.$route.params.line);
            }
            return device;
        }
    },
    methods: {
        contract(device, newDevice) {
            if(newDevice) {
                return this.getDevcieContract({product_id: device.product_id, contract_id: device.newContract});
            } else {
                return this.getDevcieContract({product_id: device.product_id, contract_id: device.contract_id});
            }
        },
        getSelectedPlan() {
            let newLine = this.newDevices.find(line => line.nameId == this.$route.params.line);
            let plan = newLine.plans.find(plan => plan.nameId == this.$route.params.addon);
            return plan;
        }
    }
}
</script>

<style lang="less">
    .box {
        &.new-selected-line {
            margin-bottom: 30px;
            padding-top: 10px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            &.plan-change {
                .selected-device {
                    flex: 1;
                    display: flex;
                    flex-wrap: wrap;
                }
            }
            p.label {
                font-size: 12px;
                margin-bottom: 0;
                width: 100%;
            }
            .plus {
                padding: 0 20px;
                font-size: 20px;
                font-weight: 500;
                font-family: gotham;
                color: #313638;
            }
            @media (max-width: 960px) {
                flex-direction: column;
            }
        }
    }
    .selected-device {
        // display: table;
        .image {
            display: table-cell;
            vertical-align: middle;
            img {
                margin-right: 20px;
            }
        }
        .details {
            display: table-cell;
            vertical-align: middle;
            .heading {
                font-weight: 600;
                color: #313638;
                font-size: 20px;
                font-family: gotham;
                margin-top: 0;
                margin-bottom: 0;
            }
            .price {
                margin-top: 0;
            }
        }
    }
</style>