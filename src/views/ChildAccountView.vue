<template>
  <div>
    <div class="animation-container">
      <transition name="fade-slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ChildAccountView",
  components: {
    
  }
};
</script>

<style lang="less" scoped></style>
