<template>
  <div :v-if="errorMessage" class="error">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: ["errorMessage"],
  computed: {},
};
</script>

<style scoped lang="less">
.error {
  color: red;
  text-align: left;
  font-size: 12px;
  margin: -5px 0 10px 10px;
}
</style>
