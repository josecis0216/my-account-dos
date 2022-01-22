<template>
    <div>
        <div class="box white">
            <div v-if="!mms" style="text-align:center;padding: 5vh 0;display:block; width:100%;max-width:600px;margin:0 auto;">
                <h4>Your plan has been updated</h4>
                <p style="max-width: 390px;margin-left:auto;margin-right:auto;">Your monthly bill will be updated to reflect the new plan on your account.</p>
                <router-link to="/dashboard" class="btn center">Go to Dashboard</router-link>
            </div>
            <div v-if="mms" style="text-align:center;padding: 5vh 0;display:block; width:100%;max-width:600px;margin:0 auto;">
                <h4>Just A Few More Steps</h4>
                <p style="max-width: 450px;margin-left:auto;margin-right:auto;">To complete your MMS upgrade activation you’ll need to modify a few settings on your childs device.</p>
                <div class="flex mms-code">
                    <p><b>MMS Unlock Code</b></p>
                    <p class="code">00000000</p>
                </div>
                <button class="btn center">Instructions</button>
                <router-link class="link center" to="">Complete MMS Activation Later</router-link>

            </div>
        </div>
    </div>    
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'PlanChangeConfirm',
    computed: {
        ...mapGetters("devices", ["mms"]),
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
        }
    },
    methods: {
        selectPlan(contractId) {
            this.$router.push('/plan-change/confirm');
        }
    },
}
</script>

<style lang="less" scoped>
    .box {
        .mms-code {
            max-width: 400px;
            margin: 30px auto;
            gap: 15px;
            b {
                color: #313638;
            }
            p {
                text-align: center;
                &.code {
                    border-radius: 10px;
                    flex: 1;
                    padding: 10px 15px 10px !important;
                    background: #F5F5F5;
                    color: #313638;
                    outline: #00B1E3;
                    position: relative;
                    border: 1px solid #E2E2E2;
                    margin-top: 0;
                    text-align: left;
                }
            }
        }
        .link {
            text-decoration: underline;
            font-size: 14px;
        }
    }
</style>