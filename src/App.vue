<template>
  <div id="account-app">
    <div class="account-banner">
      <div class="uk-container">
        <h1 class="color-white">Your Account</h1>
      </div>
    </div>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
    <transition name="fade">
      <LoadingOverlay v-if="isLoading"></LoadingOverlay>
    </transition>
    <SiteStyles v-if="enviroment == 'development'"></SiteStyles>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LoadingOverlay from "@/components/LoadingOverlay";
import SiteStyles from "@/components/SiteStyles"

export default {
  components: { LoadingOverlay, SiteStyles },
  computed: {
    ...mapGetters(["isLoading"])
  },
  methods: {
    ...mapActions(["setIsLoadingStatus"])
  },
  data() {
    return {
      enviroment: process.env.NODE_ENV, 
    }
  },
  mounted() {
    this.setIsLoadingStatus(false);
  }
};
</script>

<style lang="less">
body {
  margin: 0;
}
#account-app {
  background: #ffffff;
  position: relative;
  z-index: 1;
}
#account-app .uk-container {
  position: relative;
  height: 100%;
  margin: 0 auto;
  width: 90%;
  max-width: 1200px;
}
#account-app .animation-container, #account-app .box {
  max-width: 905px;
}
.nowebp .account-banner {
  background-image: url("https://gabbwireless.com/wp-content/uploads/2021/11/gabb_account_banner.png");
}
.webp .account-banner {
  background-image: url("https://gabbwireless.com/wp-content/uploads/2021/11/gabb_account_banner.png.webp");
}
.account-banner {
  background-image: url("https://gabbwireless.com/wp-content/uploads/2021/11/gabb_account_banner.png");
  background-size: cover;
  background-position: center;
  height: 120px;
  position: relative;
  h1 {
    font-family: gotham;
    padding-bottom: 20px;
    margin: 0 auto;
    position: absolute;
    bottom: 10px;
    font-size: 36px;
    font-weight: 300;
  }
}
@media (max-width: 960px) {
  .account-banner {
    height: 180px;
    display: none;
  }
}
@media (max-width: 640px) {
  .account-banner {
    height: 140px;
  }
}
.btn {
  background: #236cd8;
  font-family: gotham-book;
}
.btn.no-margin {
  margin: 0 auto;
  display: table;
  height: 40px;
  box-sizing: border-box;
  display: block;
  line-height: 16px;
  &.right {
    margin: 0 0 0 auto;
  }
  &.left {
    margin: 0 auto 0 0;
  }
}

// TRANSITIONS
.slide-enter-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-leave-active {
  transition: opacity 0.6s, transform 0.5s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(30%);
}
.slide-leave-active {
  opacity: 0;
}

.fade-slide-old-enter-active {
  transition: opacity 0.6s;
}
.fade-slide-old-leave-active {
  transition: opacity 0.6s, transform 0.5s;
}
.fade-slide-old-enter,
.fade-slide-old-leave-to {
  opacity: 0;
  transform: translateX(30%);
}

.fade-slide {
  &-enter,
  &-leave-to { opacity: 0;transform: translateX(30%); }

  &-leave,
  &-enter-to { opacity: 1; transform: translateX(0%);}
  &-leave-active {
    position: absolute;
    z-index: 2;
  }
  &-enter-active,
  &-leave-active {
    width: 100%;
    transition: opacity 500ms, transform 500ms ease-in-out;
  }
  &-enter-active { transition-delay: 100ms }
}

.fade-slide-delay {
  &-enter,
  &-leave-to { opacity: 0;transform: translateX(30%); }

  &-leave,
  &-enter-to { opacity: 1; transform: translateX(0%);}
  &-leave-active {
    position: absolute;
    z-index: 2;
  }
  &-enter-active,
  &-leave-active {
    width: 100%;
    transition: opacity 500ms, transform 500ms ease-in-out;
  }
  &-enter-active { transition-delay: 500ms }
}
.fade-slide-delay-last {
  &-enter,
  &-leave-to { opacity: 0;transform: translateX(30%); }

  &-leave,
  &-enter-to { opacity: 1; transform: translateX(0%);}
  &-leave-active {
    position: absolute;
    z-index: 2;
  }
  &-enter-active,
  &-leave-active {
    width: 100%;
    transition: opacity 500ms, transform 500ms ease-in-out;
  }
  &-enter-active { transition-delay: 500ms }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  position: absolute;
  opacity: 0;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-out-leave,
.fade-out-leave-to {
  position: absolute;
  opacity: 0;
}

.custom-fade-enter-active{
  transition: opacity 0.8s;
  transition-delay: 300ms;
}
.custom-fade-leave-active {
  position: absolute;
  transition: opacity 0.2s;
}
.custom-fade-enter,
.custom-fade-leave-to {
  opacity: 0;
}
.form-fields {
  display: flex;
  flex-wrap: wrap;
}
.close-modal {
  cursor: pointer;
    outline: none;
    border: 0;
    position: absolute;
    height: 15px;
    width: 15px;
    background: transparent;
    padding: 0;
    vertical-align: top;
    right: 40px;
    z-index: 3;
    &:before,
    &:after {
        height: 100%;
        position: absolute;
        top: 0;
        left: 50%;
    }
    &:before {
        content: '';
        display: block;
        width: 1px;
        border: 1px solid #313638;
        border-radius: 60px;
        transform: translate(-50%,0) rotate(45deg);
        background: #313638;
    }
    &:after {
        content: '';
        display: block;
        width: 1px;
        border: 1px solid #313638;
        border-radius: 60px;
        transform: translate(-50%,0) rotate(-45deg);
        background: #313638;
    }
}
@import "./assets/css/checkout-presets.css";
</style>
