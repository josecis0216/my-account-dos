<template>
<div class="animation-container">
  <div>
      <AccountOverview></AccountOverview>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AccountOverview from "../components/Dashboard/AccountOverview";
export default {
  name: 'Overview',
  components: {
    AccountOverview
  }
}
</script>

<style lang="less" scoped>
</style>