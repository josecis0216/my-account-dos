<template>
    <div class="modal-overlay">
        <div class="account-modal new-modal" :class="injectedClass">
            <button class="close-modal" @click="closeModal"></button>
            <div class="modal-dialog">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import GenericButton from "@/components/FormFields/GenericButton";

export default {
    name: 'GenericModal',
    props: {
      injectedClass: String,
      actionType: String,
      action: String,
    },
    computed: {
        ...mapGetters("account", ["genericModalStatus"]),
    },
    methods: {
        ...mapActions("account", ["setGenericModalVisibility"]),
        handleInput(type, action) {
            this.$store.dispatch(`${type}/set${action}`, false);
        },
        closeModal() {
            if(typeof window.closeModal == 'function') {
          window.closeModal();
        };
            if(this.action) {
                this.handleInput(this.actionType, this.action);
            } else {
                this.setGenericModalVisibility(false);
            }
        },
    }
}
</script>

<style lang="less">
    .quick-transitions {
        transition: all 0.2s ease-in-out 0s;
        -moz-transition: all 0.2s ease-in-out 0s;
        -webkit-transition: all 0.2s ease-in-out 0s;
    }
    .transitions {
        transition: all 0.5s ease-in-out 0s;
        -moz-transition: all 0.5s ease-in-out 0s;
        -webkit-transition: all 0.5s ease-in-out 0s;
    }
    .modal-overlay {
        background: rgba(0,0,0,0.7) !important;
        position: fixed;
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        z-index: 100000000;
        .new-modal {
            background: #FFFFFF;
            border-radius: 14px;
            box-sizing: border-box;
            padding: 40px;
            position: fixed;
            top: 50%;
            transform: translate(-50%,-50%);
            left: 50%;
            max-width: 560px;
            width: 90%;
            overflow: hidden;
            &.extra-padding {
                max-width: 600px;
            }
            &.forgot_password {
                overflow: hidden;
                .field {
                    max-width: 400px;
                    margin: 20px auto;
                    input {
                        padding: 17px 15px 10px !important;
                    }
                }
            }
            .modal-intro {
                flex: 1;
                p {
                    max-width: 410px;
                }
                hr {
                    margin-bottom: 30px;
                    margin-top: 40px;
                    width: 50px;
                }
            }
            .health-btn {
                border: 0;
                border-radius: 5px;
                padding: 5px 10px;
                margin-right: 30px;
                opacity: 0.2;
                font-size: 14px;
                font-family: gotham-med;
                color: #ffffff;
                .quick-transitions();
                &.active {
                    opacity: 1;
                }
                &[status="healthy"] {
                    background: #00B1E3;
                    .quick-transitions();
                }
                &[status="high"] {
                    background: #DD9000;
                    .quick-transitions();
                }
                &[status="unhealthy"] {
                    background: #ED3F00;
                    .quick-transitions();
                }
                &[status="very_unhealthy"] {
                    background: #E30000;
                    .quick-transitions();
                }
            }
            .health-bar {
                display: block;
                height: 8px;
                border-radius: 30px;
                background: #8E8E8E;
                margin: 20px auto 30px;
                position: relative;
                .fill {
                    display: block;
                    height: 8px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    border-radius: 30px;
                    .transitions();
                }
                .health-limit {
                    position: absolute;
                    display: block;
                    left: 50%;
                    &:before {
                        content: '';
                        position: absolute;
                        background: #F1F1F1;
                        height: 8px;
                        width: 1px;
                    }
                    b {
                        &:before {
                            content: '';
                            width: 0;
                            height: 0;
                            border-top: 4px solid transparent;
                            border-bottom: 4px solid transparent;
                            border-right: 5px solid #8E8E8E;
                            position: relative;
                            transform: rotate(90deg);
                            display: block;
                            margin: 0 auto -1px;
                        }
                        position: absolute;
                        left: 50%;
                        transform: translate(-50%,0);
                        top: 12px;
                        font-family: gotham-book;
                        font-size: 10px;
                    }
                }
                &.healthy {
                    .fill {
                        width: 20%;
                    }
                    .status, 
                    .fill {
                        background: #00B1E3;
                    }
                }
                &.high {
                    .fill {
                        width: 40%;
                    }
                    .status, 
                    .fill {
                        background: #DD9000;
                    }
                }
                &.unhealthy {
                    .fill {
                        width: 60%;
                    }
                    .status, 
                    .fill {
                        background: #ED3F00;
                    }
                }
                &.very_unhealthy {
                    .fill {
                        width: 95%;
                    }
                    .status, 
                    .fill {
                        background: #E30000;
                    }
                }
            }
            .health-info {
                height: 140px;
                div {
                    position: absolute;
                }
            }
        }
    }
    
    @media (max-width: 960px) {
        .modal-overlay .new-modal.account-modal {
            padding: 20px;
            .modal-intro {
                h4 {
                    max-width: 200px;
                }
                hr {
                    position: relative !important;
                    margin-bottom: 10px;
                    margin-top: 15px;
                    width: 50px;
                    right: auto;
                }
            }
            .modal-dialog {
                .health-select {
                    display: flex;
                    overflow: scroll;
                    width: 100%;
                    .health-btn {
                        display: table;
                        line-height: 14px;
                        font-size: 12px;
                        height: 25px;
                        margin-bottom: 15px;
                        margin-right: 15px;
                        &:nth-child(4) {
                            box-sizing: content-box;
                            display: block;
                            position: relative;
                            width: 200px;
                        }
                    }
                }
            }
            .health-info {
                height: 240px;
                p.subtitle-2 {
                    max-width: 80%;
                }
            }
        }
    }
</style>