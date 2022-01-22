<template>
  <div class="account-nav uk-visible@m">
    <div class="navigation">
      <ul>
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li>
          <router-link to="/account-info"
            >Account Information</router-link
          >
        </li>
        <li v-if="existingLines && existingLines.length > 0">
          <router-link to="/devices">
            Devices/Usages
          </router-link>
        </li>
        <!-- <li></li>
          <router-link to="/subscriptions">Subscriptions</router-link>
        </li> -->
        <li v-if="lastPaymentInfo && lastPaymentInfo.lastPaymentAmount && lastPaymentInfo.lastPaymentAmount != ''">
          <router-link to="/billing">
            Billing
          </router-link>
        </li>
        <!-- <li><router-link to="/logs">Call/Text Logs</router-link></li> -->
        <!-- <li><router-link to="/referrals">Referrals</router-link></li> -->
      </ul>
      <hr />
      <ul class="actions">
        <li>
          <router-link to="/new-line/">
            Add A Line
          </router-link>
        </li>
        <li>
          <router-link to="/orders">
            Your Orders
          </router-link>
        </li>
        <li>
          <a href="https://support.gabbwireless.com/" target="_BLANK">
            Help Center
          </a>
        </li>
        <li class="logout"><a @click="doLogout">Logout</a></li>
      </ul>
    </div>
    <button @click="showFeedBackForm({show: true,message:'',response:'Website',})" class="btn outline feedback">Share Feedback</button>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
// import GenericButton from "@/components/FormFields/GenericButton";
export default {
  name: "AccountNav",
  components: {
    // GenericButton,
  },
  computed: {
    ...mapGetters("childAccounts", ["childAccounts"]),
    ...mapGetters("payment", ["lastPaymentInfo"]),
    ...mapGetters("orders", ["orders"]),
    ...mapGetters("devices", ["existingLines"]),
  },
  methods: {
    ...mapActions("account",["setFeedbackForm"]),
    ...mapActions("auth", ["doLogout"]),
    showFeedBackForm() {
      if(typeof window.feedbackForm == 'function') {
        window.feedbackForm()
      }
    }
  }
};
</script>
<style scoped lang="less">
.feedback {
  background: #f6f6f6 !important;
  width: 100%;
  border-radius: 10px;
  color: #236CD8 !important;
  font-weight: 500;
  font-family: gotham;
  border: 1px solid #236CD8 !important;
}
.account-nav {
  padding-right: 40px;
}
.quick-transitions {
  transition: all 0.2s ease-in-out 0s;
  -moz-transition: all 0.2s ease-in-out 0s;
  -webkit-transition: all 0.2s ease-in-out 0s;
}
.navigation {
  background: #f6f6f6;
  border-radius: 8px;
  hr {
    border: 1px solid #dedede !important;
  }
  ul {
    list-style-type: none;
    padding-left: 0;
    padding: 30px 45px;
    margin-top: 0;
    li {
      color: #313638;
      padding-bottom: 15px;
      &:hover a:before {
        width: 100%;
        .quick-transitions();
      }
      a {
        text-decoration: none;
        color: #313638;
        position: relative;
        font-family: gotham-med;
        &:before {
          content: "";
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: #00b1e3;
          visibility: visible;
          -webkit-transform: scaleX(1);
          transform: scaleX(1);
          .quick-transitions();
        }
      }
      &:last-child {
        padding-bottom: 0;
      }
      &.logout {
        opacity: 0.5;
      }
    }
    &.actions li a {
      font-family: gotham-book;
    }
  }
}
</style>
