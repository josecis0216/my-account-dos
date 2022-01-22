<template>
    <div>
        <transition name="fade-slide-delay" mode="out-in">
            <SelectedDevice :deviceActions="'planChange'" :injectedDevice="planChangeDevice" :mms="mms"></SelectedDevice>
        </transition>
        <div class="box white">
            <div style="text-align:center;padding: 5vh 0;display:block; width:100%;max-width:600px;margin:0 auto;">
                <h4>Plan Upgrade Confirmation</h4>
                <p style="max-width: 390px;margin-left:auto;margin-right:auto;">You’re monthly bill will be updated to reflect the new plan on your account.</p>
                <button @click="confirmUpdate()" class="btn center">Confirm and Upgrade</button>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SelectedDevice from "../Devices/SelectedDevice";

export default {
    name: 'PlanChangeConfirm',
    components: {
        SelectedDevice
    },
    computed: {
        ...mapGetters("devices", ["getNewDeviceByName", "availableContracts", "planChangeDevice", "mms"]),
        filteredPlans() { 
            let setPlans = this.getNewDeviceByName(this.planChangeDevice.product).plans;
            var newPlans = [];
            if(this.planChangeDevice.contract_id == 2) {
                newPlans.push(setPlans.find(plan => plan.nameId == '2yr-contract'));
                newPlans.push(setPlans.find(plan => plan.nameId == '1yr-contract'));
            }
            if(this.planChangeDevice.contract_id == 1) {
                newPlans.push(setPlans.find(plan => plan.nameId == '2yr-contract'));
                newPlans.push(setPlans.find(plan => plan.nameId == '1yr-contract'));
            }

            return newPlans;
        },
    },
    methods: {
        selectPlan(contractId) {
            this.$router.push('/plan-change/confirm');
        },
        confirmUpdate() {
            this.$router.push('/plan-change/new-plan/success');
        }
    },
}
</script>

<style lang="less">
    .contracts {
        display: flex;
        gap: 0px;
        .info {
            flex: 1;
            p {
                max-width: 250px;
                color: #313638;
            }
            .link {
                text-decoration: underline;
                font-size: 14px;
            }
            &.no-contracts {
                p {
                    max-width: 100%;
                }
                .link {
                    margin-bottom: 20px;
                }
            }
        }
        .plan-actions {
            flex: 1;
            gap: 20px;
            .plan-contract {
                flex: 1;
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
            &.single .plan-contract {
                flex: none;
                margin: 0 0 0 auto;
            }
        }
        @media (max-width: 960px) {
            flex-direction: column;
            margin-top: 30px;
            h4 {
                font-size: 25px;
            }
            .info {
                text-align: center;
                p {
                    max-width: 100%;
                }
                a {
                    margin: 0 auto 20px;
                }
            }
            .plan-actions {
                gap: 20px;
                .plan-contract {
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
    }
</style>