<template>
  <section class="order-box box white uk-width-1-1" :class="{cancelled: order.status == 'cancelled'}">
    <div v-if="order.status == 'cancelled'" class="cancel-message">
      <p>Order Cancelled</p>
    </div>

    <div class="overview flex">
      <div class="details uk-width-expand@m uk-width-1-1">
        <p>
          <b>Order Number:</b> <span>{{ order.external_customer_order_id }}</span>
        </p>
        <p>
          <b>Order Placed:</b> <span>{{ getDateTime(order.created_at) }}</span>
        </p>
        <p v-if="order.status == 'completed' || order.status == 'cancelled'">
          <b>Status:</b> <span>{{(order.status != 'cancelled' ? 'Delivered' : 'Cancelled')}}</span>
        </p>
        <p class="tracking-numb" v-if="order.status != 'completed' && order.status != 'cancelled'">
          <b>Tracking Number:</b> <span>{{ ((order.status == 'cancelled' ? 'Cancelled' : order.tracking ? order.tracking : 'Pending')) }}</span>
        </p>
      </div>
      <div class="order-total uk-width-1-4@m uk-width-1-1">
        <p><b>Order Total</b></p>
        <h3>${{ order.total.toFixed(2) }}</h3>
      </div>
    </div>
    <div class="order-review flex">
      <div class="order-items uk-width-expand@m uk-width-1-1">
        <OrderDevice
          v-for="item in order.items"
          :key="item.id"
          v-bind="item"
          :item="item"
        ></OrderDevice>
      </div>
      <div class="order-actions uk-width-1-4@m uk-width-1-1">
        <a class="link" href="https://gabbwireless.com/contact/"
          >Contact Support</a
        >
        <button class="link">Request Refund</button>
        <router-link
          class="btn"
          :to="'/orders/' + order.external_customer_order_id"
        >
          View Order Details
        </router-link>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import OrderDevice from "@/components/Orders/OrderDevice";

export default {
  name: "OrderBox",
  props: {
    order: { type: Object }
  },
  components: {
    OrderDevice
  },
  computed: {
    ...mapGetters(["getDateTime"])
  },
  methods: {
    ...mapActions("orders", ["pairedOrderItems"]),
  }
};
</script>

<style lang="less" scoped>
.order-box {
  display: block;
  margin-bottom: 30px;
  padding: 15px 20px;
  position: relative;
  text-align: center;
  &.cancelled {
    background: #f6f6f6;
   .cancel-message {
     box-sizing: border-box;
     position: absolute;
     z-index: 2;
     width: 100%;
     height: 100%;
     left: 0;
     top: 0;
     p {
      top: 50%;
      position: relative;
      transform: translate(0,-50%);
      margin: 0;
      font-family: gotham;
      font-weight: 500;
    }
   }
   .overview,
   .order-review {
     opacity: 0.1;
   }
  }
  @media (min-width: 960px) {
    padding: 20px 40px;
    .uk-width-1-4\@m {
      width: 220px;
    }
    .order-total {
      text-align: right;
    }
  }
  @media (max-width: 960px) {
    .tracking-numb {
      flex-direction: column;
      span {
        margin-top: 5px;
      }
    }
    .order-total {
      h3 {
        font-size: 36px;
      }
    }
  }
  .overview {
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 10px;
    p {
      color: #313638;
      margin: 5px 0;
      @media (max-width: 960px) {
        font-size: 16px;
      }
    }
    .details {
      p {
        margin: 12px 0;
        display: flex;
        flex-wrap: wrap;
        b {
          width: 170px;
        }
        span {
          opacity: 0.9;
          flex: 1;
        }
      }
      @media (max-width: 960px) {
        margin-bottom: 20px;
        padding-right: 10px;
      }
    }
  }
  .order-items {
    padding: 10px 0;
    .order-item {
      max-width: 385px;
    }
  }
  .order-actions {
    align-self: flex-start;
    padding-top: 30px;
    @media (max-width: 960px) {
      padding-top: 10px;
    }
    .link {
      margin-bottom: 15px;
      text-align: right;
      margin-right: 0;
      margin-left: auto;
      @media (max-width: 960px) {
        margin-right: auto;
        margin-left: 0;
      }
    }
    button.btn, .btn {
      padding: 10px 25px;
      text-align: right;
      margin-right: 0;
      margin-left: auto;
      @media (max-width: 960px) {
        margin: 25px auto 20px 0;
      }
    }
  }
  a.link,
  button.link {
    font-size: 14px;
    padding: 0;
    text-decoration: underline;
    font-family: gotham-book;
  }
}
</style>
