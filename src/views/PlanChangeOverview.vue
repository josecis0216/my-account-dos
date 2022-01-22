<template>
<div class="animation-container">
  <div>
    <div class="title">
      <h3>
        {{$route.meta.title}}
      </h3>
    </div>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'PlanChangeOverview',
  components: {
  }
}
</script>

<style lang="less" scoped>
</style>