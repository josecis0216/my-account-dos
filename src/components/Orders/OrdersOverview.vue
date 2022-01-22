<template>
  <section class="overview-section">
    <transition name="fade-slide" mode="out-in">
      <div class="title-block" v-if="!$route.params.order">
        <h3>Your Orders</h3>
      </div>
    </transition>
    <transition name="fade-slide" mode="out-in">
      <div class="flex" v-if="!$route.params.order">
        <OrderBox
          v-for="order in sortedOrders"
          :key="order.name"
          v-bind="order"
          :order="order"
        ></OrderBox>
        <div style="text-align:center;padding: 10vh 0;display:block; width:100%;" v-if="sortedOrders.length < 1">
          <h4>It looks like you're a new customer!<br></h4>
          <p>As soon as you make your first order, it will appear in your order history.</p>
        </div>
      </div>
    </transition>
    <transition name="fade-slide" mode="out-in">
      <div class="title-block single-order" v-if="$route.params.order">
        <h3>Order #{{ $route.params.order }}</h3>
        <div class="flex order-details">
          <p>
            <b>Order placed: </b
            ><span
              >{{ getDateTime(getOrderById($route.params.order).created_at) }}
            </span>
          </p>
          <p v-if="getOrderById($route.params.order).status != 'completed'">
            <b> Tracking Number: </b>
            <a
              :href="$route.params.order"
              v-if="getOrder($route.params.order, 'tracking') != 'pending' && getOrder($route.params.order, 'tracking') != ''"
            >
              <span>{{getOrder($route.params.order, 'tracking')}}</span>
            </a>
            <span v-if="!getOrder($route.params.order).tracking">{{ ((getOrder($route.params.order).status == 'cancelled' ? 'Cancelled' : getOrder($route.params.order).tracking ? getOrder($route.params.order).tracking : 'Pending')) }}</span>
          </p>
        </div>
      </div>
    </transition>
    <transition name="fade-slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import OrderBox from "@/components/Orders/OrderBox";

export default {
  name: "OrdersOverview",
  components: {
    OrderBox
  },
  computed: {
    ...mapGetters("orders", ["orderModal", "orders", "getOrderById"]),
    ...mapGetters(["getDateTime"]),
    sortedOrders: function() {
      const currentOrders = this.orders;
      return currentOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    },
  },
  methods: {
    getOrder(number, data = false) {
      var orderFound = "";
      this.orders.forEach(order => {
        if (order.number == number) {
          orderFound = order;
        }
      });

      if (data) {
        return orderFound[data];
      } else {
        return orderFound;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.single-order {
  color: #313638;
  margin-bottom: 20px;
  h3 {
    margin-bottom: 0;
  }
  p {
    span {
      opacity: 0.9;
    }
  }
  @media (min-width: 1200px) {
    p:first-child {
      padding-right: 20px;
    }
  }
  @media (max-width: 960px) {
    flex-direction: column;
    .order-details {
      flex-direction: column;
    }
    h3 {
      margin-bottom: 10px;
    }
    p {
      margin: 0px;
    }
  }
}
</style>
