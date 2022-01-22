<template>
  <div>
    <PhoneLog></PhoneLog>
    <TextLog></TextLog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PhoneLog from "@/components/Logs/PhoneLog";
import TextLog from "@/components/Logs/TextLog";
export default {
  name: 'LogsOverview',
  components: {
    PhoneLog,
    TextLog
  }
}
</script>

<style lang="less" scoped>
</style>