<template>
  <div class="dashboard">
    <div class="uk-container">
      <link rel="stylesheet" src="/wp-content/themes/gabb-redesign/css/gabb-account-ads.css" >
      <AccountNav></AccountNav>
      <div class="uk-width-expand">
        <transition name="fade" mode="out-in">
          <ul class="breadcrumbs" v-if="$route.name != 'overview'">
            <li>
              <div>
                <span class="icon-angle-left"></span>
                <router-link :to="'/dashboard'">
                  Dashboard
                  <span class="crumb-divider">/</span>
                </router-link>
              </div>
            </li>
            <li
              v-for="(crumb, index) in breadCrumbs"              
              :key="crumb.href"
              :to="crumb.href"
            >
              <div>
                <router-link v-if="!crumb.disabled && crumb.text != 'Accounts'" :to="crumb.href">
                  {{ crumb.text }}
                  <span v-if="index < breadCrumbs.length" class="crumb-divider"
                    >/</span
                  >
                </router-link>
                <span v-if="crumb.disabled" class="disabled">{{
                  ($route.params.child ? $route.params.child + '\'s ' : '') + crumb.text + ($route.params.order ? $route.params.order : '') + ($route.params.previousBill ? ' '+$route.params.previousBill : '')
                }}</span>
              </div>
            </li>
          </ul>
        </transition>

        <transition name="fade-slide" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <HealthStatusModal v-if="deviceStatus"></HealthStatusModal>
      <GenericModal v-if="genericModalStatus"></GenericModal>
      <GenericModal v-if="feedbackForm.show" actionType="account" action="FeedbackForm">
        <FeedbackForm></FeedbackForm>
      </GenericModal>
      <GenericModal v-if="isRedirecting">
        <h4 class="uk-text-center">Going to checkout</h4><p class="uk-text-center">Please wait while we take you to checkout...</p>
      </GenericModal>
      <SimSwap :inputDevice="simSwapModal.old" :newDevice="simSwapModal.new" v-if="simSwapModal"></SimSwap>
    </transition>
    <transition name="fade" mode="out-in">
      <GenericModal v-if="welcomeModal" actionType="account" action="WelcomeModalVisibility" :injectedClass="'welcome_modal'">
        <WelcomePopup></WelcomePopup>
      </GenericModal>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AccountNav from "../components/Dashboard/AccountNav";
import HealthStatusModal from "../components/Devices/HealthStatusModal";
import GenericModal from "../components/GenericModal";
import SimSwap from "../components/Devices/SimSwap";
import FeedbackForm from "../components/AccountInfo/FeedbackForm";
import WelcomePopup from "../components/Dashboard/WelcomePopup";

export default {
  name: "Dashboard",
  components: {
    AccountNav,
    HealthStatusModal,
    GenericModal,
    SimSwap,
    FeedbackForm,
    WelcomePopup
  },
  mounted() {
    this.setRedirectModal(false);
    this.runThis();
  },
  methods: {
    ...mapActions(["setRedirectModal", "showFeedbackPopup"]),
    runThis() {
      setTimeout(function() {
        this.showFeedbackPopup;
      }, 1000);
      return true;
    },
  },
  computed: {
    ...mapGetters(["isRedirecting", "feedbackDismissed", "feedbackDialog"]),
    ...mapGetters("devices", ["getchildAccountById", "deviceStatus", "childStatus"]),
    ...mapGetters("account", ["genericModalStatus", "feedbackForm", "welcomeModal"]),
    ...mapGetters("devices", ["simSwapModal"]),
    ...mapActions("account", ["setGenericModalVisibility", "setWelcomeModalVisibility"]),
    myAccount() {
      return this.getchildAccountById(this.$route.params.child);
    },
    breadCrumbs() {
      let pathArray = this.$route.path.split("/");

      const breadCrumbs = [];
      // needed to handle the intermediary entries for nested vue routes
      let breadcrumb = "";
      let lastIndexFound = 0;
      let links = false;
      for (let i = 0; i < pathArray.length; ++i) {
        breadcrumb = `${breadcrumb}${"/"}${pathArray[i]}`;
        if (
          this.$route.matched[i] &&
          Object.hasOwnProperty.call(this.$route.matched[i], "meta") &&
          Object.hasOwnProperty.call(this.$route.matched[i].meta, "breadCrumb")
        ) {
          if(links) {
            links = links+breadcrumb;
          } else {
            if(this.$route.matched[i].meta.breadCrumb != 'Dashboard') {
              links = breadcrumb;
            }
          }
          if(this.$route.matched[i].meta.breadCrumb != 'Dashboard') {
            breadCrumbs.push({
              href: links,
              disabled: i + 1 === pathArray.length,
              text: this.$route.matched[i].meta.breadCrumb || pathArray[i],
            });
          }
          lastIndexFound = i;
          breadcrumb = "";
        }
      }
      return breadCrumbs;
    },
  },
};
</script>

<style lang="less" scoped>
.dashboard {
  padding: 50px 0;
  overflow-x: hidden;
  .uk-container {
    display: flex;
    align-items: flex-start;
  }
  @media (max-width: 960px) {
    padding: 20px 0;
  }
}
.breadcrumbs {
  position: relative;
  padding-left: 0;
  list-style: none;
  display: flex;
  margin-bottom: 5px;
  li {
    font-size: 13px;
    a {
      color: #313638;
      font-family: gotham-book;
    }
    span.disabled {
      opacity: 0.4;
    }
    .crumb-divider {
      padding-right: 5px;
    }
  }
  @media (max-width: 960px) {
    margin-bottom: 20px;
  }
}
</style>
