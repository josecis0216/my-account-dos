<template>
    <div>
        <transition name="fade-slide-delay" mode="out-in">
            <div class="box white" v-if="$route.params.line == 'gabb-z2' && !skippedMms">
                <div class="title" style="display:table;margin:0 auto;">
                    <picture style="display:table-cell;">
                        <img src="https://gabbwireless.com/wp-content/themes/gabb-redesign/img/mms_option.png">
                    </picture>
                    <h4 style="display:table-cell;vertical-align:middle;" class="uk-text-center addon-title">Include MMS?</h4>
                </div>
                <div class="current-addons flex">
                    <div class="gabb-addon uk-width-1-1">
                        <div class="border bg">
                            <div class="flex">
                                <img width="190px" src="https://gabbwireless.com/wp-content/uploads/2022/01/mms-addon-group.png">
                                <p><span>Enable group & picture messaging on your childs phone.</span></p>
                            </div>
                        </div>
                        
                        <button class="btn outline center" :class="{active: mms}" @click="activateMMS">
                            <transition name="fade-out" mode="out-in">
                                <span v-if="!mms">Add MMS for $5.00/mo</span>
                            </transition>
                            <transition name="fade-out" mode="out-in">
                                <span v-if="mms">Remove MMS for $5.00/mo</span>
                            </transition>
                        </button>
                        <button class="btn center" @click="skipAddon">
                            <transition name="fade-out" mode="out-in">
                                <span v-if="!mms">Skip</span>
                            </transition>
                            <transition name="fade-out" mode="out-in">
                                <span v-if="mms">Continue</span>
                            </transition>
                        </button>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade-slide-delay-last" mode="out-in">
            <div class="box white" v-if="($route.params.line != 'gabb-z2' || skippedMms)">
                <div class="title" style="display:table;margin:0 auto;">
                    <picture style="display:table-cell;">
                        <img src="https://cdn.gabbwireless.com/wp-content/uploads/2021/02/gabb-protect.png" width="26px" height="31px" style="margin-right: 5px;">
                    </picture>
                    <h4 style="display:table-cell;vertical-align:middle;" class="uk-text-center addon-title">Add Warranty</h4>
                </div>
                <div class="current-addons flex">
                    <div class="gabb-addon uk-width-1-1">
                        <div class="border bg warranty">
                            <div class="flex">
                                <img style="border-radius:10px;" width="170px" src="https://cdn.gabbwireless.com/wp-content/uploads/2021/02/trade-in-packing-600x386.jpg">
                                <p><span>Covers damage from drops and spills</span></p>
                            </div>
                        </div>
                        <button class="btn outline center" :class="{active: active}" @click="activateAddon()">
                            <transition name="fade-out" mode="out-in">
                                <span v-if="!active">Add Gabb Protect for ${{addWarranty.price}}/mo</span>
                            </transition>
                            <transition name="fade-out" mode="out-in">
                                <span v-if="active">Remove Gabb Protect for ${{addWarranty.price}}/mo</span>
                            </transition>
                        </button>
                        <button class="btn center" @click="selectDevice($route.params.line, $route.params.addon, addWarranty.sku)">Checkout</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'LineAddon',
    components: {},
    data() {
        return {
            active: false,
            skipped: false,
        }
    },
    mounted() {
        this.setMms(false);
        this.skipMms(false);
    },
    computed: {
        ...mapGetters("devices", ["newDevices", "getNewDevice", "mms", 'skippedMms']),
        addWarranty() {
            return this.getNewDevice(this.$route.params.line).warranty;
        }
    },
    methods: {
        ...mapActions("devices", ["setMms", 'skipMms']),
        ...mapActions(["setRedirectModal"]),
        activateMMS() {
            if(this.mms) {
                this.setMms(false);
            } else {
                this.setMms(true);
            }
        },
        skipAddon() {
            this.skipMms(true);
        },
        activateAddon() {
            if(!this.active) {
                this.active = true;
            } else {
                this.active = false;
            }
        },
        selectDevice(device, plan, warranty) {
            // deviceSku
            // planSku
            let deviceSku = this.newDevices.find(line => line.nameId == device);
            let planSku = deviceSku.plans.find(devicePlan => devicePlan.nameId == plan);

            let productId = deviceSku.sku+','+planSku.sku;
            if(this.mms) {
                productId = productId.replace('basic','plus');
            }
            if(this.active) {
                productId = productId+','+warranty;
            }
            
            let data = { session_id: window.GVue.$store.state.session_id, product_id:productId, quantity:1 };
            
            window.GVue.$store.dispatch("addPhoneItem", data).then((item)=>{});

            document.querySelectorAll('#global-coverage-check .uk-modal-body').innerhtml = '<h4 class="uk-text-center">Going to checkout</h4><p class="uk-text-center">Please wait while we take you to checkout...</p>';
            
            this.setRedirectModal(true);
            setTimeout(function() {
                window.location.href = '/checkout';
            }, 1200);
        }
    },
}
</script>

<style lang="less">
    h4.addon-title {
        margin-bottom: 5px;
    }
    .current-addons {
        max-width: 700px;
        margin: 0 auto;
        width: 100%;
        p {
            text-align: center;
        }
        .gabb-addon {
            padding: 10px 15px;
            max-width: 450px;
            margin: 0 auto;
            .border {
                border: 1px solid #D5D5D5;
                border-radius: 10px;
                padding: 15px 0px 20px;
                &.bg {
                    border: none;
                    position: relative;
                    padding: 0;
                    &.warranty {
                        padding: 10px 0;
                    }
                    img {
                        position: relative;
                        z-index: 2;
                    }
                    p {
                        max-width: 220px;
                        text-align: left;
                        padding: 15px 0;
                        margin: 0 auto;
                        position: relative;
                        font-size: 16px;
                        width: 50%;
                        span {
                            position: relative;
                            z-index: 2;
                        }
                        &:before {
                            content: '';
                            border-radius: 10px;
                            background: #EDEDED;
                            position: absolute;
                            right: 0;
                            top: 0;
                            width: 150%;
                            height: 100%;
                            display: block;
                            z-index: 1;
                        }
                    }
                }
                .flex {
                    align-items: center;
                }
                hr {
                    margin: 5px auto 20px;
                    width: 90%;
                }
            }
            .name {
                margin-bottom: 0;
                font-family: gotham-med;
                font-size: 20px;
                margin-bottom: 0;
                width: 50%;
                text-align: left;
            }
            .price {
                margin-top: 0;
                margin-bottom: 0;
                text-align: right;
                width: 50%;
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
            .outline:not(.active) {
                color: green;
            }
            .name,
            .price {
                text-align: center;
            }
        }
    }
</style>