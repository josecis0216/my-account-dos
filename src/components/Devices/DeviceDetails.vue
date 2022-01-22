<template>
    <div class="single-device">
        <div class="overview-section">
            <div class="title-block">
                <h4 v-if="device.name">{{device.name}}'s Device</h4>
                <h4 v-if="!device.name">Device</h4>
            </div>
            <div class="device-box flex">
                <div class="device-info uk-width-auto flex">
                    <div class="uk-width-1-3">
                        <picture>
                            <!-- <source> -->
                            <img :src="'https://gabbwireless.com/wp-content/uploads/2021/09/'+ getImageType + '.png'">
                        </picture>
                    </div>
                    <div class="uk-width-2-3 device-details">
                        <h4 class="device-name">{{device.name}}</h4>
                        <p class="subtitle-4 device-type">{{device.type}}</p>
                        <h5 class="device-number">{{device.number}}</h5>
                        <button class="edit fas icon-pencil_edit"></button>
                        <div class="uk-width-1-1 plan uk-visible@m">
                            <div class="uk-width-expand">
                                <p class="subtitle-2">{{device.plan}}:</p>
                                <p class="subtitle-3">{{device.plan_price}}</p>
                            </div>
                            <button class="uk-width-auto fas icon-outline_info"></button>
                        </div>
                    </div>
                </div>
                <div class="uk-width-1-1 plan uk-hidden@m">
                    <div class="uk-width-expand">
                        <p class="subtitle-2">{{device.plan}}:</p>
                        <p class="subtitle-3">{{device.plan_price}}</p>
                    </div>
                    <button class="uk-width-auto fas icon-outline_info"></button>
                </div>
                <div class="actions uk-width-expand">
                    <div>
                        <a href="#change-plan">Change Plan</a>
                        <a href="#upgrade">Replace Device</a>
                        <a href="#upgrade">Upgrade Device</a>
                        <a href="#upgrade">SIM Swap</a>
                        <a href="#upgrade">Call/Texting Logs</a>
                    </div>
                </div>
            </div>
            <div class="device-status flex" :class="checkStatus('overall')">
                <h4 class="uk-width-1-1">Overall Usage Status: <span class="status">{{checkStatus('overall')}}</span></h4>
                <div class="status-element uk-width-1-1 uk-width-1-2@m">
                    <div class="status-box">
                        <h6><span>Voice Usage</span><button class="uk-width-auto fas icon-outline_info"></button></h6>
                        <div class="totals-container">
                            <a class="subtitle-2">{{device.voice_usage.total_minutes + ' Total Minutes Used'}}</a>
                            <p class="subtitle-3">{{device.voice_usage.local_minutes + ' Local Minutes'}}</p>
                        </div>
                        <div class="bar" :class="checkStatus('voice')">
                            <span class="fill" :style="'width:' +getHealthPercent(device.voice_usage.total_minutes, device.voice_usage.health_limit)+ '%;'"></span>
                            <span class="usage subtitle-3"><b>Current Usage</b><b class="uk-hidden@m" style="padding-left: 0;">: {{checkStatus('voice')}}</b></span>
                            <span class="health-limit subtitle-3"><b>Unhealthy</b></span>
                        </div>
                    </div>
                </div>
                <div class="status-element uk-width-1-1 uk-width-1-2@m">
                    <div class="status-box">
                        <h6><span>Current Texting Usage</span><button class="uk-width-auto fas icon-outline_info"></button></h6>
                        <div class="totals-container">
                            <a class="subtitle-2">{{device.text_usage.total_texts_sent + ' Total Texts Sent'}}</a>
                            <p class="subtitle-3">{{device.text_usage.mms_sent + ' MMS Messages Sent'}}</p>
                            <p class="subtitle-3">{{device.text_usage.sms_sent + ' SMS Messages Sent'}}</p>
                        </div>
                        <div class="bar" :class="checkStatus('text')">
                            <span class="fill" :style="'width:' +getHealthPercent(device.text_usage.total_texts_sent, device.text_usage.health_limit)+ '%;'"></span>
                            <span class="usage subtitle-3"><b>Current Usage</b><b class="uk-hidden@m" style="padding-left: 0;">: {{checkStatus('text')}}</b></span>
                            <span class="health-limit subtitle-3"><b>Unhealthy</b></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'Billing',
    components: {},
    props: {
        device: { type: Object, default: function(){}, required: true },
        // voice_usage: {
        //   total_minutes: 114,
        //   local_minutes: 120,
        //   health_limit: 400,
        // },
        // text_usage: {
        //   total_texts_sent: 324,
        //   mms_sent: 120,
        //   sms_sent: 204,
        //   health_limit: 400,
        // }
    },
    computed: {
        
        getImageType() {
            let string = 'Gabb Watch';
            string = this.device.type.toLowerCase();
            string = string.replace(' ', '_');
            
            return string;
        }
    },
    methods: {
        ...mapActions("devices", ["setStatusModalVisibility"]),
        checkStatus(type) {
            if(type == 'overall') {
                if(this.device.status < (this.device.health / 1.5)) {
                    return 'Healthy';
                }
                if(this.device.status > (this.device.health / 1.5) && this.device.status < this.device.health) {
                    return 'High';
                }
                if(this.device.status >= this.device.health && this.device.status <= (this.device.health + 10)) {
                    return 'Unhealthy';
                }
                if(this.device.status > (this.device.health + 10) && this.device.status < 98) {
                    return 'Very Unhealthy';
                }
                if(this.device.status >= 95) {
                    return 'Dangerous';
                }
            }

            if(type == 'voice') {
                if(this.device.voice_usage.total_minutes < (this.device.voice_usage.health_limit / 1.5)) {
                    return 'Healthy';
                }
                if(this.device.voice_usage.total_minutes > (this.device.voice_usage.health_limit / 1.5) && this.device.voice_usage.total_minutes < this.device.voice_usage.health_limit) {
                    return 'High';
                }
                if(this.device.voice_usage.total_minutes >= this.device.voice_usage.health_limit && this.device.voice_usage.total_minutes <= (this.device.voice_usage.health_limit + 10)) {
                    return 'Unhealthy';
                }
                if(this.device.voice_usage.total_minutes > (this.device.voice_usage.health_limit + 10) && this.device.voice_usage.total_minutes < 98) {
                    return 'Very Unhealthy';
                }
                if(this.device.voice_usage.total_minutes >= 95) {
                    return 'Dangerous';
                }
            }

            if(type == 'text') {
                if(this.device.text_usage.total_texts_sent < (this.device.text_usage.health_limit / 1.5)) {
                    return 'Healthy';
                }
                if(this.device.text_usage.total_texts_sent > (this.device.text_usage.health_limit / 1.5) && this.device.text_usage.total_texts_sent < this.device.text_usage.health_limit) {
                    return 'High';
                }
                if(this.device.text_usage.total_texts_sent >= this.device.text_usage.health_limit && this.device.text_usage.total_texts_sent <= (this.device.text_usage.health_limit + 10)) {
                    return 'Unhealthy';
                }
                if(this.device.text_usage.total_texts_sent > (this.device.text_usage.health_limit + 10) && this.device.text_usage.total_texts_sent < 98) {
                    return 'Very Unhealthy';
                }
                if(this.device.text_usage.total_texts_sent >= 95) {
                    return 'Dangerous';
                }
            }
            return false;
        },
        getHealthPercent(total, current) {
            return Math.round((total / current)*100);
        },
        showModal() {
            this.setStatusModalVisibility(true);
        },
    },
}
</script>

<style lang="less">
    .single-device {
        .device-box {
            background: #ffffff;
            border-radius: 14px;
            box-shadow: -3px 4px 14px rgba(0,0,0,0.2);
            padding: 20px 30px;
            margin-top: 30px;
            .device-info {
                min-width: 50%;
                .device-details {
                    position: relative;
                    .device-name {
                        font-family: gotham-med;
                        margin-bottom: 0;
                    }
                    .device-type {
                        margin: 5px 0;
                        font-size: 12px;
                    }
                    .device-number {
                        opacity: 0.2;
                        font-size: 20px;
                        margin-bottom: 30px;
                    }
                    .edit {
                        // font-size: 0;
                        position: absolute;
                        top: 0;
                        right: 0;
                        outline: none;
                        border: none;
                        background: none;
                    }                
                }
            }
            .plan {
                background: #F1F1F1;
                border-radius: 8px;
                display: flex;
                padding: 10px 15px;
                p {
                    margin: 0;
                }
                div {
                    display: flex;
                }
                .subtitle-2 {
                    font-family: gotham-med;
                    color: #313638;
                    margin: 0;
                    line-height: 20px;
                }
                .subtitle-3 {
                    color: #313638;
                    align-self: flex-end;
                    padding-left: 5px;
                }
                .icon-outline_info {
                    border: 0;
                    outline: none;
                }
            }
            .actions {
                align-self: flex-end;
                margin: 0 auto;
                div {
                    display: table;
                    margin: 0 0 0 auto;
                    padding-right: 40px;
                    @media (max-width: 960px) {
                        margin: 0 auto 0 0;
                        a {
                            margin: 20px 0;
                        }
                    }
                }
                a {
                    display: block;
                    margin-bottom: 5px;
                    text-decoration: underline;
                }
            }
        }
        .status-box {
            background: #ffffff;
            border-radius: 14px;
            box-shadow: -3px 4px 14px rgba(0,0,0,0.2);
            padding: 20px 30px;
            margin-top: 10px;
        }
        .device-status {
            margin-top: 40px;
            .status {
                font-family: gotham-med;
            }
            &.Healthy {
                .status {
                    color: #00B1E3;
                }
            }
            &.High {
                .status {
                    color: #DD9000;
                }
            }
            &.Unhealthy {
                .status {
                    color: #ED3F00;
                }
            }
            &.Dangerous {
                .status {
                    color: #E30000;
                }
            }
            .status-element {
                padding-left: 15px;
                padding-right: 15px;
                &:nth-child(2) {
                    padding-left: 0px;
                }
                &:last-child {
                    padding-right: 0px;
                }
                @media (max-width: 960px) {
                    padding-left: 0px;
                    padding-right: 0px;
                    margin-bottom: 10px;
                }
                .status-box {
                    .totals-container {
                        height: 65px;
                    }
                    h6 {
                        display: flex;
                        font-size: 20px;
                        font-family: gotham-med;
                        span {
                            flex: 1;
                        }
                        .icon-outline_info {
                            background: none;
                            border: 0;
                            outline: none;
                        }
                    }
                    .subtitle-2, .subtitle-3 {
                        margin: 2px 0;
                    }
                }
            }
            .bar {
                display: block;
                height: 8px;
                border-radius: 30px;
                background: #8E8E8E;
                margin: 10px auto 30px;
                position: relative;
                .fill {
                    display: block;
                    height: 8px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    border-radius: 30px;
                }
                .usage {
                    position: absolute;
                    display: block;
                    left: 0;
                    top: 15px;
                    &:before {
                        content: '';
                        background: #0e0e0e;
                        border-radius: 100px;
                        display: inline-block;
                        height: 8px;
                        width: 8px;
                    }
                    b {
                        color: #313638;
                        padding-left: 4px;
                        font-size: 10px;
                    }
                }
                .health-limit {
                    position: absolute;
                    display: block;
                    left: 85%;
                    &:before {
                        content: '';
                        position: absolute;
                        background: #F1F1F1;
                        height: 8px;
                        width: 1px;
                        top: -2px;
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
                        color: #313638;
                        position: absolute;
                        left: 50%;
                        transform: translate(-50%,0);
                        top: 12px;
                        font-family: gotham-med;
                        font-size: 10px;
                    }
                }
                &.Healthy {
                    .fill,
                    .usage:before {
                        background: #00B1E3;
                    }
                }
                &.High {
                    .fill,
                    .usage:before {
                        background: #DD9000;
                    }
                }
                &.Unhealthy {
                    .fill,
                    .usage:before {
                        background: #ED3F00;
                    }
                }
                &.Dangerous {
                    .fill,
                    .usage:before {
                        background: #E30000;
                    }
                }
            }
            @media (max-width: 960px) {
                h4 {
                    font-size: 20px;
                }
            }
        }
    }
</style>