<template>
  <section class="overview-section">
    <div class="title-block flex" :class="{ dashboard: title }">
      <h3 v-if="title">{{ title }}</h3>
      <h3 v-if="!title">Subscriptions</h3>
      <router-link
        to="/new-line/select-device"
        class="btn no-margin right"
        >Add Subsription</router-link
      >
    </div>
    <div class="payment-info flex" style="margin-bottom: 40px;">
      <div class="box upcoming uk-width-1-1 flex">
        <div class="inner-box">
          <div class="previous">
            <h6 class="bill-title">Total Monthly Subscriptions</h6>
            <button
              class="subtitle-2 link right uk-hidden@m"
              @click="viewPreviousBill"
            >
              View Billing
            </button>
            <h3 class="previous-payment">
              ${{ lastPaymentInfo.lastPaymentAmount }}
            </h3>
            <h6 class="count-box">
              ({{ existingLines.length }} <span v-if="existingLines.length > 1 || existingLines.length < 1">Subscriptions</span><span v-if="existingLines.length == 1">Subscription</span>)
            </h6>
            <button
              class="subtitle-2 link uk-visible@m"
              @click="viewPreviousBill"
            >
              View Billing
            </button>
          </div>
        </div>
        <div class="box-block cycles new">
          <div class="bill-cycle">
            <h6 class="subtitle-2">Shared</h6>
            <h6><span>2 Subscriptions</span> <span>$34.55/mo</span></h6>
          </div>
          <div class="next-month">
            <h6 class="subtitle-2">Individual</h6>
            <h6><span>5 Subscriptions</span> <span>$65.89/mo</span></h6>
          </div>
        </div>
      </div>
    </div>
    <ChildSubscriptions></ChildSubscriptions>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ChildSubscriptions from "../ChildAccount/ChildSubscriptions.vue";
export default
   {
  name: "Billing",
  components: { ChildSubscriptions },
  props: {
    title: String,
  },
  computed: {
    ...mapGetters("payment", ["lastPaymentInfo"]),
    ...mapGetters("devices", ["existingLines"]),
  },
  methods: {
    viewPreviousBill() {
      this.$router.push('/billing');
    },
    viewUpcomingBill() {
      //
    },
  },
};
</script>

<style lang="less" scoped>
.overview-section.flex {
  align-items: center;
}
.no-margin.right {
  margin: 0 0 0 auto;
}
.box.upcoming {
  .inner-box {
    display: flex;
    .count-box {
      font-size: 12px;
      color: #313638;
    }
  }
  .new {
    flex: 2;
    h6 {
      display: flex;
      span {
        flex: 1;
      }
    }
  }
  @media (max-width: 960px) {
    flex-direction: column;
    background: transparent;
    padding: 0;
    .inner-box {
      background: #F6F6F6;
      padding: 20px;
      flex-direction: column;
      margin-bottom: 20px;
      border-radius: 10px;
      .previous {
        .bill-title {
          align-self: center;
          font-size: 12px;
        }
        .previous-payment {
          margin-top: 10px;
          margin-bottom: 10px;
          font-size: 45px;
        }
        button.link {
          flex: 1;
          align-self: center;
          text-align: right;
        }
      }
      .subscriptions {
        padding: 20px 0 0;
        h6 {
          font-size: 14px;
        }
      }
    }
    .new {
      background: #F6F6F6;
      padding: 20px;
      border-radius: 10px;
      flex-direction: column;
      &:before {
        display: none;
      }
    }
  }
}
</style>
