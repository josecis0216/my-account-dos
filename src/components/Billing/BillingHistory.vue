<template>
  <section class="overview-section billing-history">
    <transition name="fade-slide" mode="out-in">
      <div v-if="$route.name == 'history'">
        <div class="title-block flex">
          <h3>Billing History</h3>
          <div class="select-box">
            <select @change="getSelectedDate($event.target.value)" class="billing-year-to-date" :value="selectedDate">
              <option v-for="date in getSortingDates" :key="date" :value="date">{{date}}</option>
            </select>
          </div>
          <router-link
            to="/billing"
            class="btn no-margin right uk-visible@m"
            >Back To Current Bill</router-link
          >
        </div>
        <div style="text-align:center;padding: 10vh 0;display:block;" v-if="loadingError">
          <h4>Whoops!<br></h4>
          <p>Looks like we are having trouble getting your history, please try again later.</p>
        </div>
        <div style="text-align:center;padding: 10vh 0;display:block;" v-if="!loadingError && (!transactions || transactions.length < 1)">
          <h4 v-if="getSortingDates.length <= 1">It looks like you're a new customer!<br></h4>
          <h4 v-if="getSortingDates.length > 1">It looks like you have no bills in {{selectedDate}}<br></h4>
          <p v-if="getSortingDates.length <= 1">As soon as you receive your first monthly invoice, it will appear in your billing history.</p>
          <p v-if="getSortingDates.length > 1">As soon as you receive your first bill for {{selectedDate}}, it will appear in your billing history.</p>
          <button @click="getSelectedDate(getSortingDates[1])" v-if="getSortingDates.length > 1" class="btn center">View {{getSortingDates[1]}}</button>
        </div>
        <table v-if="!loadingError && transactions && transactions.length > 0">
          <thead>
            <tr>
              <th></th>
              <th>Payment Date</th>
              <th>Billing Cycle</th>
              <!-- <th>Subscriptions</th> -->
              <th>Total Bill</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bill in transactions" :key="bill.Id">
              <td class="view">
                <router-link
                  :to="'/billing/history/'+bill.Id">
                  View Bill
                </router-link>
              </td>
              <td class="date">{{paymentDate(bill.Date)}}</td>
              <td class="cycle">{{getBillingCylcle(bill.Date)}}</td>
              <!-- <td>-</td> -->
              <td class="amount">${{bill.Amount}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </transition>
    <transition name="fade-slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Billing",
  components: {},
  data() {
    return {
      // selectedDate: new Date().getFullYear(),
      selectedDate: 2021,
    }
  },
  mounted() {
    this.getCustomerBillingHistory(this.selectedDate);
  },
  computed: {
    ...mapGetters("payment", ["lastPaymentInfo", "transactions", "loadingError"]),
    ...mapGetters("devices", ["existingLines"]),
    ...mapGetters("account", ["account_activation", "billCycle"]),
    currentDate() {
      var theDate = new Date();
      return theDate.getFullYear();
    },
    getSortingDates() {
      var d = new Date(this.account_activation);
      var first = d.getFullYear();

      var s = new Date();
      var second = s.getFullYear();
      var arr  = Array();

      for(let i = first; i <= second; i++) arr.push(i);

      return arr.reverse();
    }
  },
  methods: {
    ...mapActions("account", ["getCustomerBillingHistory"]),
    getSelectedDate(date) {
      this.selectedDate = date;
      this.getCustomerBillingHistory(date);
    },
    paymentDate(date) {
      const d = new Date(date);
      return d.toDateString().substring(3,20);
    },
    getBillingCylcle(date) {
      var newDate = new Date(this.account_activation);
      var currentDate = new Date(date);
      var filteredDate = new Date(date);
      filteredDate.setMonth(filteredDate.getMonth()-1)
      var startDate = filteredDate.getMonth()+1+'/'+(this.billCycle+1)+'/'+filteredDate.getFullYear();
      var endDate = (currentDate.getMonth()+1)+'/'+this.billCycle+'/'+currentDate.getFullYear();
      
      var cycle = startDate+' - '+endDate;
      return cycle;
    },
  },
};
</script>

<style lang="less" scoped>
  .billing-history {
    .select-box {
      flex: 1;
      padding-right: 10px;
      position: relative;
      select {
        display: table;
        margin: 0 0 0 auto;
        border-radius: 20px;
        border-right: 0;
        border-left: 1px solid transparent;
        border-left: 1px solid #E2E2E2;
        border-top: 1px solid #E2E2E2;
        border-bottom: 1px solid #E2E2E2;
        padding: 12px 40px 10px 15px;
        position: relative;
        z-index: 2;
        -webkit-appearance: none;
      }
      &:after {
        content: '\f105';
        color: #00B1E3;
        font-family: 'icomoon' !important;
        speak: never;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        transform: rotate(90deg);
        right: 30px;
        z-index: 2;
        position: absolute;
        top: 15px;
        display: table;
        font-size: 15px;
      }
    }
    table {
      border-collapse: collapse;
      width: 100%;
      thead {
        tr {
          th {
            color: #313638;
            padding: 10px 0;
            text-align: left;
            font-weight: 600;
            font-family: 'gotham';
            &:last-child {
              text-align: center;
            }
          }
        }
        @media (max-width: 960px) {
          display: none;
        }
      }
      tbody tr {
        border-bottom: 6px solid #ffffff;
        td:first-child {
          background: transparent;
        }
        td {
          color: #313638;
          padding: 10px 0;
          background: #F5F5F5;
          &:nth-child(2) {
            padding-left: 20px;
            border-radius: 10px 0 0px 10px;
          }
          &:last-child {
            text-align: right;
            padding-right: 20px;
          }
        }
        @media (max-width: 960px) {
          display: flex;
          flex-wrap: wrap;
          border-radius: 10px;
          border-bottom: 10px solid #ffffff;
          td {
            width: 50%;
            &:first-child {
              background: #F5F5F5;
              order: 4;
              padding-right: 20px;
              flex: 1;
              text-align: right;
              padding-top: 0px;
              font-size: 14px;
              border-radius: 0 10px 10px 0;
            }
            &:nth-child(2) {
              border-radius: 0;
              order: 1;
              width: 50%;
              padding-left: 20px;
              padding-bottom: 0;
              font-size: 14px;
              border-radius: 10px 0px 0px 0;
            }
            &:last-child {
              order: 2;
              flex: 1;
              display: block !important;
              padding-bottom: 0;
              font-size: 14px;
              font-family: gotham;
              font-weight: 500;
              border-radius: 0px 10px 0px 0;
            }
            &:nth-child(3) {
              order: 3;
              padding-left: 20px;
              padding-top: 0px;
              color: #8E8E8E;
              font-size: 12px;
              border-radius: 0px 0px 0px 10px;
            }
          }
        }
      }
    }
    @media (max-width: 700px) {
      .title-block {
        flex-wrap: wrap;
      }
      .select-box {
        flex: none;
        width: 100%;
        margin-bottom: 30px;
        select {
          margin: 0 auto 0 0;
        }
        &:after {
          left: 90px;
        }
      }
    }
  }
</style>
