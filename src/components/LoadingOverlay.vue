<template>
  <div class="cart-loader">
    <div class="body">
      <div class="animation">
        <lottie
            :options="defaultOptions"
            :height="200"
            :width="200"
            v-on:animCreated="handleAnimation"
        />
      </div>
      <div class="message">
        <h3>Processing...</h3>
        <h4>Do not press back or refresh the page.</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Lottie from "vue-lottie";
import animationData from "./../img/gabb-loader.json";
export default {
  name: "LoadingOverlay",
  computed: {
    ...mapState(["isLoading"]),
  },
  components: {
    lottie: Lottie,
  },
  data() {
    return {
      defaultOptions: {
        animationData: animationData,
      },
    };
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
    },
  },
};
</script>

<style lang="less" scoped>
.cart-loader {
  position: fixed;
  height: 100%;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 300ms;
  z-index: 1001 !important;
  .body {
    display: flex;
    flex-direction: column;

    .animation {
    }

    .message {
      //position: fixed;
      top: 40vh;
      width: 90%;
      max-width: 600px;
      margin: auto;
      text-align: center;
      h3,
      h4 {
        color: white;
        padding: 10px 0;
      }
    }
  }
}
</style>
