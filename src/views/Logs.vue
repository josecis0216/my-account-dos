<template>
<div class="animation-container">
  <div>
    <LogsOverview></LogsOverview>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LogsOverview from "../components/Logs/LogsOverview";
export default {
  name: 'AccountInfo',
  components: {
    LogsOverview
  }
}
</script>

<style lang="less" scoped>
</style>