<template>
    <div class="contracts flex">
        <div class="info" :class="{'no-contracts': planChangeDevice.contract_id == 3}">
            <h4 v-if="planChangeDevice.contract_id != 3">Service Contract</h4>
            <p v-if="planChangeDevice.contract_id != 3">Upgrading your contract will lower your upcoming monthly bills but it won’t credit you for previous months.</p>
            <p v-if="planChangeDevice.contract_id == 3">Looks like you have a 2 year contract with this device, click link below to find out more about downgrading your contract.</p>
            <a href="/downgrade" class="link">Can I downgrade my contract?</a>
        </div>
        <div class="plan-actions flex" v-if="planChangeDevice.contract_id != 3" :class="{single: filteredPlans.length < 2}">
            <div class="plan-contract" :id="contract.nameId" v-for="contract in filteredPlans" :key="contract.sku">
                <p class="contract-title">
                    {{contract.name}}
                </p>
                <hr>
                <p class="price">${{contract.price}}/mo<span>+Taxes</span></p>
                <button class="btn" @click="selectPlan(contract.contract_id)">Select</button>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'PlanSelection',
    computed: {
        ...mapGetters("devices", ["getNewDeviceById", "availableContracts", "planChangeDevice"]),
        filteredPlans() { 
            let setPlans = this.getNewDeviceById(this.planChangeDevice.product_id).plans;
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
        }
    },
    methods: {
        ...mapActions("devices", ["setNewPlan"]),
        selectPlan(contractId) {
            this.setNewPlan({product_id: this.planChangeDevice.product_id, contract_id: contractId});
            this.$router.push('/plan-change/confirm');
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