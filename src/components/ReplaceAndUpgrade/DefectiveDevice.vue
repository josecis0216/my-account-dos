<template>
    <div>
        <transition name="fade-slide-delay" mode="out-in">
            <div class="box white">
                <div style="text-align:center;padding: 3vh 0;display:block; width:100%;max-width:600px;margin:0 auto;">
                    <h4 style="line-height: 120%;margin: 0 auto 20px;">Contact Customer Support</h4>
                    <p>We apologize that your device is having problems. We’ll need some more information so we can help you as smoothly as possible.</p>
                    <TextAreaField
                        name="support_message"
                        placeholder="Please describe what the problem is…"
                        :value="''"
                        rows="10"
                        @update-support_message="handleInput($event, 'SupportMessage', 'account')"
                    ></TextAreaField>
                    <button class="btn center">Submit</button>
                </div>
            </div>
        </transition>
        <transition name="fade-slide-delay" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TextAreaField from "../FormFields/TextAreaField";

export default {
    name: 'ReplaceDevice',
    components: {
        TextAreaField
    },
    computed: {},
    methods: {
        sendToSupport() {
            console.log('sending to support');
        }
    },
}
</script>

<style lang="less" scoped>
.btn {
    margin-bottom: 0;
}
</style>