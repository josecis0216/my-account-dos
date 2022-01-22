<template>
  <section class="single-order-box uk-width-1-1" ref="customer_order">
    <div class="box">
      <div class="overview flex">
        <div class="details uk-width-expand@m uk-width-1-1">
          <div class="shipping">
            <b>Shipping Information:</b>
            <span>{{ myOrder.shipping_address.address }}</span>
            <span>{{ myOrder.shipping_address.suite }}</span>
            <span>{{ myOrder.shipping_address.city }}, {{ myOrder.shipping_address.state }} {{ myOrder.shipping_address.zip }}</span>
          </div>
          <div class="payment" v-if="myOrder.payment">
            <b>Payment Method</b>
            <span>Coming Soon!</span>
          </div>
        </div>
        <div class="uk-width-2-5@m uk-width-1-1">
          <div class="totals">
            <b>Order Summary</b>
            <p class="flex" style="align-items: flex-start;">
              <span>Item Subtotal <i style="display:block;font-size:90%;width:70%;font-style:normal;opacity:0.5;margin-top:3px;padding-left:20px;">(Includes first month of service after activation)</i></span>
              <span style="width: auto;flex: none !important;">${{ myOrder.subtotal.toFixed(2) }}</span>
            </p>
            <p class="flex">
              <span>Shipping</span><span>${{ myOrder.shipping.toFixed(2) }}</span>
            </p>
            <p class="flex">
              <span>Tax</span><span>${{ myOrder.taxes.toFixed(2) }}</span>
            </p>
            <b class="flex"
              ><span>Order Total</span
              ><span class="total-price">${{ myOrder.total.toFixed(2) }}</span></b
            >
          </div>
        </div>
      </div>
    </div>
    <h5 class="order-items-title">Items In Your Order</h5>
    <div class="box white" style="box-shadow: none;">
      <div class="order-items">
        <OrderDevice
          v-for="item in myOrder.items"
          :key="item.id"
          v-bind="item"
          :item="item"
          :injectedClass="'order_page'"
        ></OrderDevice>
      </div>
      <div class="order-review flex" ref="customer_order">
        <div class="order-actions uk-width-1-1@m uk-width-1-1">
          <a class="link" href="javascript:$zopim.livechat.window.show();">Contact Support</a
          >
          <a class="link" href="javascript:$zopim.livechat.window.show();">Request Refund</a>
          <button @click="downloadOrder()" class="link">View or Print Invoice</button>
          <p
            style="font-size:12px;margin-bottom:5px;opacity:0.7;padding-left:5px;"
          >
            Order is non-cancelable after 6 hours
          </p>
          <a class="btn" :class="{disabled: calculateCancelTime}" @click="openChat($event, calculateCancelTime)" href="javascript:$zopim.livechat.window.show();">Cancel Order</a>
          <!-- <button class="btn" :class="{disabled: calculateCancelTime}" @click="showModal(calculateCancelTime)" style="margin-top:5px;">Cancel Order</button> -->
        </div>
      </div>
    </div>
    <a @click="$router.go(-1)" class="btn outline back-btn">Back to Orders</a>
    <transition name="fade" mode="out-in">
    <OrderModal v-if="orderModalStatus" title="Cancel Order">
      <p style="font-size: 110%;">Are you sure that you would like to cancel your order?</p>
      <div class="flex actions">
        <button class="link" @click="closeModal">Cancel</button>
        <a class="btn" href="javascript:$zopim.livechat.window.show();">Submit Request</a>
      </div>

    </OrderModal>
    </transition>
  </section>

</template>
<script>
import { mapGetters, mapActions } from "vuex";
import OrderDevice from "@/components/Orders/OrderDevice";
import OrderModal from "@/components/Orders/OrderModal";
import html2pdf from 'html2pdf.js'

export default {
  name: "Order",
  components: {
    OrderDevice,
    OrderModal
  },
  computed: {
    ...mapGetters(["getDateTime"]),
    ...mapGetters("account", ["fullName"]),
    ...mapGetters("orders", ["orderModal", "orderModalStatus", "orders", "getOrderById"]),
    ...mapActions("orders", ["setOrderModalStatus"]),
    ...mapGetters("address", [
      "shippingStreetAddress",
      "shippingApt",
      "shippingState",
      "shippingCity",
      "shippingZip"
    ]),
    myOrder() {
      return this.getOrderById(this.$route.params.order);
    },
    calculateCancelTime() {
      var orderDate = new Date(this.getOrderById(this.$route.params.order).created_at);
      var currentDate = new Date();
      var calcOrderDate = orderDate.getFullYear().toString() + (orderDate.getMonth() < 10 ? '0'+orderDate.getMonth().toString() : orderDate.getMonth().toString()) + (orderDate.getDate() < 10 ? '0'+orderDate.getDate().toString() : orderDate.getDate().toString())+orderDate.getTime().toString();
      var calcCurrentDate = currentDate.getFullYear().toString() + (currentDate.getMonth() < 10 ? '0'+currentDate.getMonth().toString() : currentDate.getMonth().toString()) + (currentDate.getDate() < 10 ? '0'+currentDate.getDate().toString() : currentDate.getDate().toString())+currentDate.getTime().toString();
      var timeDiff = parseInt(calcCurrentDate) - parseInt(calcOrderDate);

      if((timeDiff) > 21600000){
        return true; 
      } else {
        return false;
      }
    },
  },
  methods: {
    closeModal() {
      if(typeof window.closeModal == 'function') {
        window.closeModal();
      }
      return this.setOrderModalStatus(true);
    },
    showModal(disabled) {
      if(disabled) {
        return false;
      }
      if(typeof window.openModal == 'function') {
          window.openModal();
        }
      return this.setOrderModalStatus(true);
    },
    openChat(e, disabled) {
      if(disabled) {
        e.preventDefault();
      }
    },
    downloadOrder () {
      // var receipt = '<h2>We are still working on this right now!</h2>';
      html2pdf(this.$refs.customer_order, {
        margin: 10,
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        filename: 'Gabb Order'+this.getOrderById(this.$route.params.order).external_customer_order_id+'.pdf',
        image: { type: 'png', quality: 0.93 },
        jsPDF: { floatPrecision: 5, unit: 'mm', format: 'a4', orientation: 'p' }
      })
    },
  }
};
</script>

<style lang="less" scoped>
.single-order-box {
  display: block;
  margin-bottom: 30px;
  .back-btn {
    margin-top: 60px;
  }
  @media (min-width: 960px) {
    .uk-width-1-4\@m {
      width: 220px;
    }
  }
  .order-items-title {
    margin: 20px auto;
    @media (max-width: 960px) {
      font-size: 22px;
    }
  }
  .overview {
    padding-bottom: 10px;
    div {
      color: #313638;
      @media (max-width: 960px) {
        font-size: 16px;
      }
    }
    .details {
      div {
        b {
          display: block;
          margin-bottom: 5px;
        }
        &:first-child {
          padding-bottom: 30px;
        }
        span {
          display: block;
        }
      }
      .shipping {
        span {
          font-family: gotham-book !important;
          font-size: 14px;
        }
      }
      .payment {
        span {
          font-family: gotham-book !important;
          font-size: 14px;
        }
      }
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
      }
    }
    .totals {
      position: relative;
      &::before {
        content: '';
        width: 1px;
        background: #8E8E8E;
        height: 100%;
        position: absolute;
        left: -40px;
        top: 0;
        @media (max-width: 960px) {
          display: none;
        }
      }
      p {
        display: flex;
        font-size: 14px;
        opacity: 0.8;
        width: 100%;
        span {
          &:first-child {
            flex: 1;
            text-align: left;
          }
          &:last-child {
            flex: 1;
            text-align: right;
          }
        }
      }
      b {
        width: 100%;
        span {
          &:first-child {
            flex: 1;
            text-align: left;
          }
          &:last-child {
            flex: 1;
            text-align: right;
            font-size: 36px;
            line-height: 36px;
            color: #313638;
            font-family: gotham;
            font-weight: 400;
          }
        }
      }
    }
  }
  .order-items {
    border-bottom: 1px solid #e6e6e6;
    .order-item {
      padding-right: 15px;
    }
  }
  .order-review {
    padding-top: 30px;
  }
  .order-items {
    padding: 10px 0;
  }
  .order-actions {
    align-self: flex-end;
    .link {
      margin-bottom: 15px;
    }
    button.btn {
      padding: 10px 25px;
      @media (max-width: 960px) {
        margin: 25px auto 20px;
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
