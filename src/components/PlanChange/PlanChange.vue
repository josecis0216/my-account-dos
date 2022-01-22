<template>
    <div class="box white">
        <div class="container">
            <div class="title" style="text-align:center;display:block; width:100%;max-width:600px;margin:0 auto 40px;">
                <h4>What would you like to change?<br></h4>
            </div>
            <PlanSelection :injectedAddon="mms"></PlanSelection>
            <hr v-if="planDevice.productId == 2">
            <div class="addon flex" v-if="planDevice.productId == 2">
                <div class="info">
                    <div class="title" style="display:table;">
                        <picture style="display:table-cell;">
                            <img src="https://gabbwireless.com/wp-content/themes/gabb-redesign/img/mms_option.png">
                        </picture>
                        <h4 style="display:table-cell;vertical-align:middle;" class="uk-text-center addon-title">MMS</h4>
                    </div>
                    <img width="150px" src="https://gabbwireless.com/wp-content/uploads/2022/01/mms-addon-group.png">
                    <p><span>Enable group & picture messaging on your child's phone.</span></p>
                    <!-- <a href="/MMS" class="link">Addtional Details</a> -->
                </div>
                <div class="plan-contract">
                    <p class="price">$5.00/mo</p>
                        <transition name="fade-custom" mode="out-in">
                            <button v-if="!mms" class="btn outline" @click="addMMS(true)">
                                <span>Add MMS</span>
                            </button>
                        </transition>
                        <transition name="fade-custom" mode="out-in">
                            <button v-if="mms" class="btn outline" @click="addMMS(false)">
                                <span>MMS Added</span>
                            </button>
                        </transition>
                    <transition name="fade" mode="out-in">
                        <button v-if="mms" class="link" @click="addMMS(false)">
                            <span>Remove</span>
                        </button>
                    </transition>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PlanSelection from './PlanSelection.vue';

export default {
    name: 'PlanChange',
    components: { PlanSelection },
    data() {
        return {
            planDevice: {
                productId: 2,
            },
        }
    },
    computed: {
        ...mapGetters("devices", ["planChangeDevice", "mms"]),
    },
    methods: {
        ...mapActions("devices", ["setMms"]),
        addMMS(toggle) {
            if(toggle) {
                this.setMms(true);
            } else {
                this.setMms(false);
            }
        }
    },
}
</script>

<style lang="less">
    .box .container {
        max-width: 610px;
        width:90%;
        margin: 0 auto;
        padding: 3vh 0;
    }
    .addon {
        align-items: center;
        display: flex;
        gap: 0px;
        .info {
            flex: 1;
            p {
                max-width: 270px;
                color: #313638;
            }
            .link {
                text-decoration: underline;
                font-size: 14px;
            }
        }
        .plan-contract {
            display: table;
            margin: 0 auto 0 0;
            .contract-title {
                font-size: 18px;
                font-family: gotham;
                font-weight: 500;
                color: #2F3A3E;
                margin-bottom: 0;
            }
            hr {
                margin-top: 5px;
                margin-bottom: 5px;
            }
            .price {
                font-size: 18px;
                font-family: gotham;
                font-weight: 500;
                color: #2F3A3E;
                margin-top: 0;
                span {
                    color: #8E8E8E;
                    font-weight: 400;
                    font-size: 14px;
                    display: block;
                }
            }
        }
        @media (max-width: 960px) {
            flex-direction: column; 
            .title {
                margin: 0 auto;
            }
            .info {
                text-align: center;
            }
            .plan-contract {
                margin: 0 auto;
                .contract-title, 
                .price {
                    font-size: 17px;
                    text-align: center;
                }
                .btn {
                    margin: 0 auto;
                }
            }
        }
    }
</style>