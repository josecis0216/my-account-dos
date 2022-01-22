<template>
  <div>
    <div class="animation-container">
      <AccountInfoBlock></AccountInfoBlock>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AccountInfoBlock from "../components/AccountInfo/AccountInfo";
export default {
  name: 'AccountInfo',
  components: {
    AccountInfoBlock
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
</style>