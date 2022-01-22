<template>
    <div class="modal-overlay">
        <div class="account-modal new-modal edit-account">
            <button class="close-modal" @click="closeModal"></button>
            <transition name="fade" mode="out-in">
                    <div class="modal-dialog">
                        <div class="create-account-form">
                            <div class="form">
                                <h5 style="text-align:center;font-family:gotham;font-weight:500;">Edit Your Child’s<br> Personal Information</h5>
                                <ImageUploader 
                                    name="childAccountImage"
                                    :value="account.accountImage"
                                    @update-childAccountImage="handleInput($event, 'ChildAccountImage', 'childAccounts')"
                                ></ImageUploader>
                                <div class="form-fields">
                                    <div class="field uk-width-1-1">
                                        <h6 class="subtitle-2"><b>Name</b></h6>
                                        <TextField
                                            name="childAccountName"
                                            :value="account.firstName"
                                            @update-childAccountName="handleInput($event, 'ChildAccountName', 'childAccounts')"
                                        >
                                            {{name_error}}
                                        </TextField>
                                    </div>
                                    <div class="field birthday uk-width-1-1">
                                        <h6 class="subtitle-2"><b>Birthday</b></h6>
                                        <DateField
                                            name="childAccountAge"
                                            :value="account.birthDay"
                                            @update-childAccountAge="handleInput($event, 'ChildAccountAge', 'childAccounts')"
                                        />
                                    </div>
                                    <div class="field radio uk-width-auto@m uk-width-1-1">
                                        <h6 class="subtitle-2"><b>Gender</b></h6>
                                        <RadioField :value="account.gender" name="childAccountGender" :options="[{label: 'Boy', value: 'male'},{label: 'Girl', value: 'female'}]" @update-childAccountGender="handleInput($event, 'ChildAccountGender', 'childAccounts')"></RadioField>
                                    </div>
                                </div>
                                <div class="actions">
                                    <button class="link" @click="closeModal">Cancel</button>
                                    <button class="btn" @click="nextStep()">Save</button>
                                </div>
                            </div>
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
    name: 'EditAccount',
    props: ['account'],
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
        ...mapActions("childAccounts", ["setChildModalVisibility", "saveChildAccountData", "setChildAccountProgress", "setChildAccountName", "uploadAccountImage", "cancelAccountEdit"]),
        nextStep() {
            if(this.savedChildAccount.name != '') {
                var findAccount = this.getchildAccountByName(this.savedChildAccount.name);
                if(findAccount) {
                    console.log(findAccount.gabb_id);
                    if(findAccount.gabb_id != this.account.gabb_id) {
                        this.name_error = 'You have an account with this name';
                        return false;
                    }
                }
            } else {
                this.setChildAccountName(this.account.name);
            }
            this.uploadAccountImage({file: this.savedChildAccount.image,gabb_id: this.account.gabb_id,})
            if(typeof window.closeModal == 'function') {
                window.closeModal();
            };
            this.saveChildAccountData({account: this.account});
            return true;
        },
        closeModal() {
            this.cancelAccountEdit();
            if(typeof window.closeModal == 'function') {
                window.closeModal();
            };
            this.setChildModalVisibility(false);
        },
        handleInput(event, type, actionType) {
            console.log(event);
            this.$store.dispatch(`${actionType}/set${type}`, event, { root: true });
        },
    }
}
</script>

<style lang="less" scoped>
    .modal-overlay .account-modal.new-modal {
        max-width: 400px;
        padding: 40px 60px;
        &.edit-account {
            padding: 40px 30px;
        }
    }
    .modal-dialog {
        &.confirmation {
            flex-wrap: wrap;
            align-items: center;
            margin: 0 auto;
            max-width: 400px;
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
            padding-left: 0px;
            position: relative;
            flex: 1.5;
            .form {
                max-width: 300px;
                margin: 0 auto;
                .field.age {
                    padding-right: 30px;
                    max-width: 130px;
                    flex: none;
                }
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
</style>