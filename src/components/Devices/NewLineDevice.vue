<template>
    <div>
        <!-- {{$route.params}} -->
        <SelectedDevice v-if="!this.$route.meta.upgrade"></SelectedDevice>
        <transition name="fade-slide" mode="out-in">
            <div class="box white" v-if="!$route.params.addon">
                <h4 class="uk-text-center">Select A Plan</h4>
                <div class="current-plans flex uk-flex-center">
                    <div class="gabb-plan uk-width-1-3@m uk-width-1-1" v-for="plan in conditionalPlans" :key="plan.sku">
                        <div class="border">
                            <h6 class="name">{{plan.name}}</h6>
                            <hr>
                            <p class="price"><b>${{plan.price}}</b><br><span>Per Month</span></p>
                            <button class="btn center" @click="selectDevice(plan.nameId)">Select</button>
                        </div>
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
    name: 'NewLineDevice',
    components: {
        SelectedDevice
    },
    props: {},
    computed: {
        ...mapGetters("devices", ["newDevices", "getNewDevice", "upgradeDevice"]),
        conditionalPlans() {
            var plans = false;
            let setPlans = this.getNewDevice(this.$route.params.line).plans;
            if(this.$route.meta.upgrade) {
                var newPlans = [];
                if(this.upgradeDevice.contract_id == 3) {
                    newPlans.push(setPlans.find(plan => plan.nameId == '2yr-contract'));
                }
                if(this.upgradeDevice.contract_id == 2) {
                    newPlans.push(setPlans.find(plan => plan.nameId == '2yr-contract'));
                    newPlans.push(setPlans.find(plan => plan.nameId == '1yr-contract'));
                }
                if(this.upgradeDevice.contract_id == 1) {
                    newPlans.push(setPlans.find(plan => plan.nameId == '2yr-contract'));
                    newPlans.push(setPlans.find(plan => plan.nameId == '1yr-contract'));
                    newPlans.push(setPlans.find(plan => plan.nameId == 'no-contract'));
                }
                plans = newPlans;
            } else {
                plans = setPlans;
            }
            return plans;
        }
    },
    methods: {
        selectDevice(id) {
            if(this.$route.meta.upgrade) {
                this.$router.push('/new-line/upgrade/upgrade-to/'+this.$route.params.line+'/'+id);
            } else {
                this.$router.push('/new-line/device/'+this.$route.params.line+'/'+id);
            }
        }
    },
}
</script>

<style lang="less" scoped>
    .current-plans {
        max-width: 700px;
        margin: 0 auto;
        width: 100%;
        .gabb-plan {
            padding: 10px 15px;
            .border {
                border: 1px solid #D5D5D5;
                border-radius: 10px;
                padding: 30px 20px 20px;
                hr {
                    margin: 5px auto 20px;
                }
            }
            .name {
                margin-bottom: 0;
                font-family: gotham-med;
                font-size: 20px;
            }
            .price {
                margin-top: 0;
                font-size: 18px;
                padding: 10px 0;
                b {
                    color: #2F3A3E;
                    font-size: 18px;
                }
                span {
                    font-weight: 300;
                    font-family: gotham;
                    font-size: 14px;
                }
            }
            .name,
            .price {
                text-align: center;
            }
        }
    }
</style>