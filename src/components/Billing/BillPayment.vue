<template>
    <section class="overview section payment-info">
        <div class="title-block">
            <h3>Payment Information</h3>
        </div>
        <div class="box">
            <div class="payment-date">
                <span class="subtitle-1">Payment Made: {{paymentDate()}}</span>
                <h3>${{billAmount}}</h3>
                <a class="btn" v-if="billObject && billObject.InvoicePDFUrl" :href="billObject.InvoicePDFUrl" target="_BLANK">Download PDF</a>
            </div>
            <div class="payment-method">
                <span class="subtitle-1">Payment Made: {{paymentDate()}}</span>
                <p style="margin-top:10px;">Card Ending in <b>{{(billObject && billObject.CardNumber && billObject.CardNumber != '' ? billObject.CardNumber : lastFour)}}</b></p>
                <router-link v-if="!hideUpdate" to="/account-info/#payment" class="link">Update Payment Information</router-link>
            </div>
        </div>
    </section>    
</template>
<script>
import { mapGetters } from "vuex";
import html2pdf from 'html2pdf.js'

export default {
  name: "BillPayment",
  components: {},
  mounted() {
  },
  props: ['billDate', 'billAmount', 'hideUpdate', 'billObject'],
  computed: {
      ...mapGetters("payment", ["lastFour"]),
  },
  methods: {
    paymentDate() {
        let d = new Date(this.billDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [month, day, year].join('/');
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
.payment-info {
    .box {
        display: flex;
        div {
            flex: 1;
            h3 {
                font-size: 60px;
                font-family: gotham;
                font-weight: 400;
            }
            .subtitle-1 {
                font-family: gotham;
                font-weight: 500;
                font-size: 14px;
                color: #313638;
            }
            p {
                margin-bottom: 0;
                margin-top: 0;
            }
            &.payment-method {
                .subtitle-1 {
                    margin-bottom: 20px;
                }
            }
            .link {
                margin-top: 20px;
            }
        }
        @media (max-width: 960px) {
            flex-direction: column;
        }
    }
}
</style>