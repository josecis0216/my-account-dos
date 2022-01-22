<template>
    <div class="modal-overlay">
        <div class="account-modal new-modal">
            <div class="title-block flex">
                <div class="modal-intro">
                    <h4>What does this mean?</h4>
                    <p class="subtitle-2">This indicates your childs overall cell phone usage. To encourage your kids to live off the screen, this level shows the maximum healthy suggested cell phone usage.</p>
                    <hr class="small">
                </div>
                <div>
                    <button class="close-modal" @click="closeModal"></button>
                </div>
            </div>
            <div class="health-modal">
                <div class="health-select">
                    <button class="health-btn active" @click="changeStatus('healthy')" status="healthy" color="">Healthy</button>
                    <button class="health-btn" @click="changeStatus('high')" status="high" color="">High</button>
                    <button class="health-btn" @click="changeStatus('unhealthy')" status="unhealthy" color="">Unhealthy</button>
                    <button class="health-btn" @click="changeStatus('very_unhealthy')" status="very_unhealthy" color="">Very Unhealthy</button>
                </div>
                <div class="health-bar healthy">
                    <span class="fill"></span>
                    <span class="health-limit subtitle-3"><b>Unhealthy</b></span>
                </div>
                <div class="health-info healthy">
                    <transition name="fade-up">
                        <div v-if="healthy">
                            <h6>Healthy</h6>
                            <p class="light subtitle-2"><b>&#60; 3,000 Texts/mo  & &#60; 1,000 Minutes/mo</b></p>
                            <p class="subtitle-2">
                                Cell phone usage in the “healthy” range indicates that the phone is being primarily used for communication. This level of usage allows for a thriving school, social, and family life.
                            </p>
                        </div>
                    </transition>
                    <transition name="fade-up">
                        <div v-if="high">
                            <h6>High</h6>
                            <p class="light subtitle-2"><b>&#60; 4,500 Texts/mo  &  &#60; 1,500 Minutes/mo</b></p>
                            <p class="subtitle-2">
                                Cell phone usage in the “high” range indicates that while usage is still within a healthy limit, users should be mindful to avoid moving into the “unhealthy” range.
                            </p>
                        </div>
                    </transition>
                    <transition name="fade-up">
                        <div v-if="unhealthy">
                            <h6>Unhealthy</h6>
                            <p class="light subtitle-2"><b>&#60; 6,000 Texts/mo  &  &#60; 2,000 Minutes/mo</b></p>
                            <p class="subtitle-2">
                                Cell phone usage in the “unhealthy” range indicates that the phone may often be used as a distraction, and may begin to interfere with the social, school, or personal life of the user. 
                            </p>
                        </div>
                    </transition>
                    <transition name="fade-up">
                        <div v-if="very_unhealthy">
                            <h6>Very Unhealthy</h6>
                            <p class="light subtitle-2"><b>&#62; 6,000 Texts/mo  &  &#62; 6,000 Minutes/mo</b></p>
                            <p class="subtitle-2">
                                Cell phone usage in the “very unhealthy” range indicates that the phone may often be used as a distraction, and may begin to impact a user’s amount and quality of sleep in addition to potential negative impacts on the school, social, or personal life of the user.
                            </p>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import GenericButton from "@/components/FormFields/GenericButton";

export default {
    name: 'HealthStatusModal',
    components: {
        // GenericButton
    },
    computed: {
        ...mapGetters("devices", ["deviceStatus"]),
    },
    data() {
        return {
            healthy: true,
            high: false,
            unhealthy: false,
            very_unhealthy: false,
        }
    },
    methods: {
        ...mapActions("devices", ["setStatusModalVisibility"]),
        changeStatus: function (status) {
            if (status) {
                var elems = document.querySelectorAll(".health-btn");
                [].forEach.call(elems, function(el) {
                    el.classList.remove("active");
                });

                if ( document.querySelector(".health-modal .health-bar").classList.contains('healthy') ) {
                    document.querySelector(".health-modal .health-bar").classList.remove('healthy');
                }
                if ( document.querySelector(".health-modal .health-bar").classList.contains('high') ) {
                    document.querySelector(".health-modal .health-bar").classList.remove('high');
                }
                if ( document.querySelector(".health-modal .health-bar").classList.contains('unhealthy') ) {
                    document.querySelector(".health-modal .health-bar").classList.remove('unhealthy');
                }
                if ( document.querySelector(".health-modal .health-bar").classList.contains('very_unhealthy') ) {
                    document.querySelector(".health-modal .health-bar").classList.remove('very_unhealthy');
                }

                if(status == 'healthy') {
                    this.healthy = true;
                } else {
                    this.healthy = false;
                }
                if(status == 'high') {
                    this.high = true;
                } else {
                    this.high = false;
                }
                if(status == 'unhealthy') {
                    this.unhealthy = true;
                } else {
                    this.unhealthy = false;
                }
                if(status == 'very_unhealthy') {
                    this.very_unhealthy = true;
                } else {
                    this.very_unhealthy = false;
                }
                

                document.querySelector(".health-modal .health-bar").classList.add(status);
                document.querySelector(".health-btn[status='"+status+"']").classList.add('active')
            }
        },
        closeModal() {
            if(typeof window.closeModal == 'function') {
          window.closeModal();
        };
            this.setStatusModalVisibility(false);
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
        background: rgba(0,0,0,0.5);
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
                position: relative;
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
                    display: none;
                }
            }
            .health-modal {
                .health-select {
                    display: flex;
                    overflow: scroll;
                    width: 100%;
                    align-items: center;
                    .health-btn {
                        display: table;
                        line-height: 14px;
                        font-size: 12px;
                        height: 25px;
                        margin-bottom: 10px;
                        margin-right: 5px;
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
                height: 270px;
                p.subtitle-2 {
                    max-width: 80%;
                }
            }
        }
    }
</style>