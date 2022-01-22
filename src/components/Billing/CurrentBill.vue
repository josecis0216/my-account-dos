<template>
  <section ref="billView">
    <section class="overview-section">
      <div class="title-block flex" >
        <h3 v-if="!title">Billing</h3>
        <router-link
          to="/billing/history"
          class="btn no-margin right"
          >Billing History</router-link
        >
      </div>
      <div class="payment-info flex" >
        <div class="box upcoming uk-width-1-1 flex">
          <div class="inner-box">
            <div class="previous">
              <h6 class="bill-title">Last Bill Payment</h6>
              <h3 class="previous-payment">
                ${{ lastBill.amount }}
              </h3>
              <h6>
                {{ existingLines.length }} <span v-if="existingLines.length > 1 || existingLines.length < 1">Devices</span><span v-if="existingLines.length == 1">Device</span>
              </h6>
              <span style="font-size: 14px;">Paid On: {{getDateTime(lastBill.date)}}</span>
              <a class="btn" v-if="lastPaymentInfo.lastPaymentTransaction[0] && lastPaymentInfo.lastPaymentTransaction[0].InvoicePDFUrl" :href="lastPaymentInfo.lastPaymentTransaction[0].InvoicePDFUrl" target="_BLANK">Download PDF</a>
            </div>
            <!-- <div class="box-block cycles subscriptions">
              <div class="bill-cycle">
                <h6 class="subtitle-2">Service Plans</h6>
                <h6>--</h6>
              </div>
              <div class="next-month">
                <h6 class="subtitle-2">App Subscriptions</h6>
                <h6>--</h6>
              </div>
            </div> -->
          </div>
          <div class="box-block cycles new">
            <div class="bill-cycle">
              <h6 class="subtitle-2">Last Billing Cycle</h6>
              <h6>{{getNewBillCycle({date:lastBill.date, cycle:billCycle})}}</h6>
            </div>
            <div class="next-month">
              <h6 class="subtitle-2">Next Bill Due</h6>
              <h6>Due {{nextPaymentDate(lastBill.date)}}</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <BillCharges :billDate="lastPaymentInfo.lastPaymentDate" v-if="hasBreakdown"></BillCharges>
    <BillPayment :billDate="lastBill.date" :billAmount="lastBill.amount" :billObject="lastPaymentInfo.lastPaymentTransaction[0]"></BillPayment>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import html2pdf from 'html2pdf.js'
import BillCharges from "./BillCharges";
import BillPayment from "./BillPayment";

export default {
  name: "Billing",
  components: {
    BillCharges,
    BillPayment
  },
  props: {
    title: String,
    hasBreakdown: Boolean,
  },
  computed: {
    ...mapGetters("account", ["billCycle"]),
    ...mapGetters("payment", ["lastPaymentInfo", "getNewBillCycle"]),
    ...mapGetters("devices", ["existingLines"]),
    ...mapGetters(["getDateTime"]),
    lastBill() {
      var bill = {};
      if(this.lastPaymentInfo.lastPaymentTransaction && this.lastPaymentInfo.lastPaymentTransaction.length > 0) {
        bill.amount = this.lastPaymentInfo.lastPaymentTransaction[0].Amount;
        bill.date = this.lastPaymentInfo.lastPaymentTransaction[0].Date;
      } else {
        bill.amount = this.lastPaymentInfo.lastPaymentAmount;
        bill.date = this.lastPaymentInfo.lastPaymentDate;
      }
      return bill;
    }
  },
  methods: {
    nextPaymentDate(date) {
      const d = new Date(date);
      let nextBill = new Date(d.getFullYear(), d.getMonth() +1, d.getDate());
      return nextBill.toDateString().substring(4,10);
    },
    paymentDate(date) {
      const d = new Date(date);
      return d.toDateString().substring(4,10);
    },
    downloadBill () {
      // var receipt = '<h2>We are still working on this right now!</h2>';
      html2pdf(this.$refs.billView, {
        margin: 1,
        filename: 'Gabb Bill '+this.paymentDate()+'.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
      })
    }
  },
};
</script>

<style lang="less">
.box.upcoming {
  .inner-box {
    display: flex;
    flex: 2;
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
          font-size: 14px;
          margin-bottom: 0;
        }
        .previous-payment {
          margin-top: 0px;
          margin-bottom: 0px;
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
.previous  {
  button {
    color: #236CD8;
    text-decoration: underline;
    font-family: gotham;
    font-weight: 400;
    font-size: 14px;
  }
  .bill-title {
    font-family: gotham;
    font-weight: 500;
    color: #313638;
  }
}
.flex.payment-info {
  flex-wrap: nowrap;
}
.previous-payment {
  font-size: 60px;
  margin-top: 20px;
  color: #313638 !important;
  font-family: gotham;
  font-weight: 400;
}
@media (max-width: 960px) {
  .title-block {
    display: flex;
    .btn {
      margin: 0 0 0 auto;
      font-size: 14px;
      height: 30px;
      padding: 7px 30px;
    }
  }
  .flex.payment-info {
    flex-wrap: wrap;
  }
  .upcoming {
    margin-bottom: 20px;
  }
  .previous {
    display: flex;
    flex-wrap: wrap;
    border-right: 5px;
    h6.subtitle-2 {
      font-family: gotham-med;
      font-size: 14px;
      margin-bottom: 0;
      position: relative;
      top: 1px;
    }
    .previous-payment {
      font-size: 50px;
      margin-bottom: 5px;
      margin-top: 5px;
      width: 100%;
    }
    h6 {
      font-size: 14px;
      font-family: gotham-book;
    }
    .link {
      font-size: 14px;
      padding-right: 0;
    }
  }
}
.coming-up {
  flex: 2;
  padding: 0 20px 0 0;
  position: relative;
  &:after {
    content: "";
    display: block;
    width: 2px;
    height: calc(100% + 60px);
    background: #e0e0e0;
    position: absolute;
    right: 0;
    top: -30px;
  }
  @media (max-width: 960px) {
    display: flex;
    flex-wrap: wrap;
    flex: auto;
    padding: 0;
    width: 100%;
    align-items: center;
    h6 {
      margin-bottom: 0;
      font-size: 12px;
      top: 1px;
      position: relative;
      font-family: gotham-med;
    }
    &:after {
      display: none;
    }
    .link {
      font-size: 14px;
      padding-right: 0;
    }
    .upcoming-payment {
      font-size: 45px;
      width: 100%;
      margin-bottom: 0;
    }
    .device-count {
      margin-top: -5px;
      margin-bottom: 20px;
      font-size: 10px;
      &:before {
        content: "(";
      }
      &:after {
        content: ")";
      }
    }
  }
}
.cycles {
  flex: 1;
  padding: 0 30px 0 40px;
  &.subscriptions {
    padding-left: 50px;

  }
  &.new {
    position: relative;
    &:before {
      content: '';
      border-left: 2px solid #E0E0E0;
      height: calc(100% + 60px);
      position: absolute;
      display: block;
      left: 0;
      top: 50%;
      transform: translate(0,-50%);
    }
  }
  h6 {
    color: #313638;
    opacity: 0.8;
    font-family: gotham;
    font-weight: 400;
    font-size: 20px;
  }
  .subtitle-2 {
    color: #313638;
    font-family: gotham;
    font-weight: 500;
    opacity: 1;
    font-size: 14px;
  }
  @media (max-width: 960px) {
    display: flex;
    padding: 0;
    .bill-cycle {
      flex: 1;
    }
    .next-month {
      flex: 1;
    }
    h6.subtitle-2 {
      font-family: gotham-med;
    }
    h6 {
      font-size: gotham-book;
      font-size: 14px;
    }
  }
}
.bill-cycle {
  padding-bottom: 15px;
}
</style>
