<template>
<div class="animation-container">
  <div>
    <SubscriptionsOverview></SubscriptionsOverview>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SubscriptionsOverview from "../components/Subscriptions/SubscriptionsOverview";
export default {
  name: 'Subscriptions',
  components: {
    SubscriptionsOverview
  }
}
</script>

<style lang="less" scoped>
</style>