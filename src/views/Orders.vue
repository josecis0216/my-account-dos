<template>
<div class="animation-container">
  <div>
    <OrdersOverview></OrdersOverview>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import OrdersOverview from "../components/Orders/OrdersOverview";
export default {
  name: "Orders",
  components: {
    OrdersOverview
  },
  mounted() {
    this.getOrdersAndProducts
  },
  computed: {
    ...mapActions("orders", ["getOrdersAndProducts"]),
  }
};
</script>

<style lang="less" scoped></style>
