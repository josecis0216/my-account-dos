<template>
    <div class="modal-overlay">
        <div class="account-modal child-account-modal new-modal">
            <button class="close-modal" @click="closeModal"></button>
            <transition name="fade-slide" mode="out-in">
                    <div class="modal-dialog flex" v-if="!this.savedChildAccount.progress || this.savedChildAccount.progress == 'creation'">
                        <div class="device-info">
                            <img :src="'https://gabbwireless.com/wp-content/uploads/2021/10/product-'+device.product_id+'.png'" />
                            <div>
                                <h5 class="device-name">{{ deviceName }}</h5>
                                <h5 class="device-number">{{ device.mdn }}</h5>
                            </div>
                        </div>
                        <div class="create-account-form">
                            <div class="form">
                                <h5>Create A Child Account</h5>
                                <ImageUploader 
                                    name="childAccountImage"
                                    :value="savedChildAccount.image"
                                    @update-childAccountImage="handleInput($event, 'ChildAccountImage', 'childAccounts')"
                                ></ImageUploader>
                                <div class="form-fields">
                                    <div class="field uk-width-1-1">
                                        <h6 class="subtitle-2"><b>Name</b></h6>
                                        <TextField
                                            name="childAccountName"
                                            :value="savedChildAccount.name"
                                            @update-childAccountName="handleInput($event, 'ChildAccountName', 'childAccounts')"
                                        >
                                            {{name_error}}
                                        </TextField>
                                    </div>
                                    <div class="field birthday uk-width-1-1">
                                        <h6 class="subtitle-2"><b>Birthday</b></h6>
                                        <DateField
                                            name="childAccountAge"
                                            :value="savedChildAccount.age"
                                            @update-childAccountAge="handleInput($event, 'ChildAccountAge', 'childAccounts')"
                                        />
                                    </div>
                                    <div class="field radio uk-width-auto@m uk-width-1-1@m uk-width-auto">
                                        <h6 class="subtitle-2"><b>Gender</b></h6>
                                        <RadioField :value="savedChildAccount.gender" name="childAccountGender" :options="[{label: 'Boy', value: 'male'},{label: 'Girl', value: 'female'}]" @update-childAccountGender="handleInput($event, 'ChildAccountGender', 'childAccounts')"></RadioField>
                                    </div>
                                </div>
                                <div class="actions">
                                    <button class="link" @click="closeModal">Cancel</button>
                                    <button class="btn" @click="nextStep()">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </transition>
            <transition name="fade-slide" mode="out-in">
                <div class="modal-dialog confirmation" v-if="this.savedChildAccount.progress == 'confirmation'">
                    <h5 class="title">Create & Assign Child Account</h5>
                    <p class="descript">Once a device has been assigned, it can still be transferred to other child accounts.</p>
                    <div class="account-box flex">
                        <div class="device-info flex">
                            <img :src="'https://gabbwireless.com/wp-content/uploads/2021/10/product-'+device.product_id+'.png'" />
                            <div class="device-details">
                                <h5 class="device-name">{{ deviceName }}</h5>
                                <h5 class="device-number">{{ device.mdn }}</h5>
                            </div>
                        </div>
                        <div class="create-account-form flex">
                            <div class="profile-image">
                                <img :src="savedChildAccount.image">
                            </div>
                            <div class="account-info">
                                <h5><b>{{savedChildAccount.name}}</b></h5>
                            </div>
                        </div>
                    </div>
                    <div class="actions uk-width-1-1">
                        <button class="link" @click="previousStep()">Cancel</button>
                        <button class="btn" @click="confirmAccountCreation()">Confirm & Assign</button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ImageUploader from "@/components/FormFields/ImageUploader";
import TextField from "../FormFields/TextField";
import DateField from "../FormFields/DateField";
import RadioField from "../FormFields/RadioField";

export default {
    name: 'CreateAccount',
    props: ['device', 'deviceName'],
    components: {
        ImageUploader,
        TextField,
        RadioField,
        DateField
    },
    data() {
        return {
            name_error: '',
        }
    },
    computed: {
        ...mapGetters("childAccounts", ["savedChildAccount", "getchildAccountByName"]),
    },
    methods: {
        ...mapActions("childAccounts", ["setChildModalVisibility", "saveChildAccountData", "setChildAccountProgress"]),
        previousStep() {
            this.setChildAccountProgress('creation');
            return true;
        },
        nextStep() {
            if(this.savedChildAccount.name != '') {
                if(!this.getchildAccountByName(this.savedChildAccount.name)) {
                    this.setChildAccountProgress('confirmation');
                    return true;
                } else {
                    this.name_error = 'You have an account with this name';
                }
            } else {
                this.name_error = 'Account name is required';
            }
        },
        confirmAccountCreation() {
            var device = this.device;
            device.product = this.deviceName;
            if(typeof window.closeModal == 'function') {
                window.closeModal();
            };
            this.saveChildAccountData({device: device});
            return true;
        },
        closeModal() {
            if(typeof window.closeModal == 'function') {
                window.closeModal();
            };
            this.setChildModalVisibility(false);
        },
        handleInput(event, type, actionType) {
            // console.log('')
            // console.log(event, type, actionType)
            // event =
            //     actionType === "account"
            //     ? event 
            //     : { value: event, type: "accountAddress" };
            // console.log({ event, type });
            // console.log(`${actionType}/set${type}`, event);

            this.$store.dispatch(`${actionType}/set${type}`, event, { root: true });
        },
    }
}
</script>

<style lang="less" scoped>
    .modal-overlay .account-modal.new-modal {
        max-width: 800px;
        padding: 40px 60px;
    }
    .modal-dialog {
        &.confirmation {
            flex-wrap: wrap;
            align-items: center;
            margin: 0 auto;
            max-width: 570px;
            .title {
                text-align: center;
                font-size: 20px;
                font-family: gotham;
                font-weight: 500;
            }
            .descript {
                text-align: center;
                max-width: 375px;
                margin: 0 auto;
                font-size: 14px;
            }
            .account-box {
                background: #f5f5f5;
                border-radius: 10px;
                padding: 20px;
                margin: 30px auto;
                .device-info {
                    flex: 1;
                    align-items: center;
                    img {
                        max-height: 80px;
                        width: auto;
                        margin: 0 0 0 auto !important;
                    }
                    .device-details {
                        flex: 1;
                        .device-name {
                            margin-bottom: 5px;
                            line-height: 20px;
                            font-size: 20px;
                        }
                        .device-number {
                            font-size: 16px;
                            margin-bottom: 0;
                        }
                    }
                }
                .create-account-form {
                    flex: 1;
                    padding-left: 0;
                    h5 {
                        font-size: 20px;
                    }
                    &:before {
                        display: none;
                    }
                }
            }
            .flex {
                align-items: center;
            }
            .profile-image {
                max-height: 60px;
                max-width: 60px;
                margin-right: 10px;
            }
            .account-info {
                flex: 1;
            }
        }
        .device-info {
            flex-wrap: wrap;
            flex: 1;
            img {
                margin: 0 auto 0 0 !important;
            }
            &>* {
                text-align: left;
            }
        }
        .create-account-form {
            padding-left: 40px;
            position: relative;
            flex: 1.5;
            .form {
                max-width: 300px;
                .field.age {
                    padding-right: 30px;
                    max-width: 130px;
                    flex: none;
                }
            }
            &:before {
                content: '';
                background: #8E8E8E;
                display: block;
                height: 100%;
                left: 0;
                width: 1px;
                position: absolute;
            }
        }
        .profile-image {
            border-radius: 100px;
            height: 80px;
            width: 80px;
            margin: 10px auto;
            overflow: hidden;
            position: relative;
        }
    }
    @media (max-width: 960px) {
        .modal-overlay .account-modal.new-modal.child-account-modal {
            padding: 20px 30px;
            .modal-dialog {
                flex-direction: column;
            }
            .device-info {
                display: table;
                margin: auto;
                img {
                    max-height: 80px;
                    display: table-cell;   
                    margin: 0 auto !important;
                    margin-left: -10px !important;
                }
                div {
                    display: table-cell;   
                    vertical-align: middle;
                }
                h5 {
                    text-align: center;
                }
            }
            .create-account-form {
                padding-left: 0;
                margin-top: 10px;
                padding-top: 15px;
                .upload-example {
                    margin: 5px auto 1rem;
                }
                &::before {
                    height: 2px;
                    width: 100%;
                    top: 0;
                    left: 0;
                }
                .form {
                    h5 {
                        font-size: 20px;
                        font-weight: 500;
                        font-family: gotham;
                    }
                }
                .actions {
                    flex-direction: row-reverse;
                    max-width: 200px;
                }
            }
        }
    }
</style>