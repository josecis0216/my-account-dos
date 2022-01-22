<template>
<div class="animation-container">
  <div>
    <ReferralsOverview></ReferralsOverview>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ReferralsOverview from "../components/Referrals/ReferralsOverview";
export default {
  name: 'Referrals',
  components: {
    ReferralsOverview
  }
}
</script>

<style lang="less" scoped>
</style>