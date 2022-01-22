<template>
    <div>
        <transition name="fade-slide-delay" mode="out-in">
            <div class="box white" v-if="$route.name == 'replace'">
                <div style="text-align:center;padding: 5vh 0;display:block; width:100%;max-width:450px;margin:0 auto;">
                    <h4 style="line-height: 120%;max-width: 300px;margin: 0 auto 20px;">Why do you need to replace this device?</h4>
                    <div class="actions flex">
                        <router-link to="/new-line/replace/new-device" class="btn center">It's Broken or Lost</router-link>
                        <router-link v-if="defectiveTimeline" to="/new-line/replace/support" class="btn center">It's Defective</router-link>
                    </div>
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
import SelectField from "../FormFields/SelectField";

export default {
    name: 'ReplaceDevice',
    props: {},
    mounted() {
    },
    computed: {
        ...mapGetters("devices", ["replaceDevice"]),
        defectiveTimeline() {
            var available = false;
            
            var created = new Date(this.replaceDevice.created_at); //Year, Month, Date    
            var expirationDate = new Date(created.getMonth()+'-'+created.getDate()+'-'+(created.getYear() + 1))
            var currentDate = new Date(); //Year, Month, Date    
            if (expirationDate < currentDate) {    
                available = true;
            } 
            return available;
        }
    },
    methods: {},
}
</script>

<style lang="less">
</style>