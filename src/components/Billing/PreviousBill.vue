<template>
  <section ref="billView">
    <section class="overview-section">
      <div class="title-block flex">
        <h3>Previous Bill: {{(paymentDate())}}</h3>
        <router-link
          to="/billing"
          class="link no-margin right uk-visible@m"
          >View Latest Bill ></router-link
        >
      </div>
      <div class="payment-info flex">
        <div class="box upcoming uk-width-1-1 flex">
          <div class="inner-box">
            <div class="previous">
              <h6 class="bill-title">Total Charged</h6>
              <h3 class="previous-payment">
                ${{ previousBill.Amount }}
              </h3>
              <h6>
                {{ existingLines.length }} <span v-if="existingLines.length > 1 || existingLines.length < 1">Devices</span><span v-if="existingLines.length == 1">Device</span>
              </h6>
              <span style="font-size: 14px;">Paid On: {{getDateTime(paymentDate())}}</span>
              <a class="btn" v-if="previousBill && previousBill.InvoicePDFUrl" :href="previousBill.InvoicePDFUrl" target="_BLANK">Download PDF</a>
            </div>
            <div class="box-block cycles new">
              <p style="max-width: 300px;">Download the PDF for a full breakdown of your bill.</p>
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
        </div>
      </div>
    </section>

    <BillCharges :billObject="previousBill" :billDate="previousBill.Date" v-if="hasBreakdown"></BillCharges>
    <BillPayment hideUpdate="true" :billObject="previousBill" :billDate="previousBill.Date" :billAmount="previousBill.Amount"></BillPayment>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import html2pdf from 'html2pdf.js'
import BillCharges from "./BillCharges";
import BillPayment from "./BillPayment";

export default {
  name: "PreviousBill",
  components: {
    BillCharges,
    BillPayment
  },
  props: {
    title: String,
    hasBreakdown: Boolean,
  },
  computed: {
    ...mapGetters("payment", ["transactions", "getBillCycle"]),
    ...mapGetters("devices", ["existingLines"]),
    ...mapGetters(["getDateTime"]),
    previousBill() {
        return this.getBillCycle(this.$route.params.previousBill);
    }
  },
  methods: {
    paymentDate() {
      const d = new Date(this.previousBill.Date);
      return d.toDateString().substring(4,20);
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

<style lang="less" scoped>
.overview-section {
  .link {
    flex: 1;
    text-align: right;
    align-self: center;
  }
  .previous {
    flex: 1;
  }
  .cycles.new {
    flex: none;
    p {
      max-width: 300px;
      vertical-align: middle;
      top: 50%;
      position: relative;
      transform: translate(0,-50%);
      margin-top: 0;
    }
  }
}
</style>
