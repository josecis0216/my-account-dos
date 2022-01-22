<template>
  <button
      :disabled="isDisabled"
      :class="[injectedClass, { disabled: isDisabled }]"
      @click.stop.prevent="handleClick"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "GenericButton",
  props: {
    text: String,
    clickType: String,
    injectedClass: {
      default: "primary",
    },
    isDisabled: {
      default: false,
    },
  },
  methods: {
    handleClick() {
      this.$emit(this.clickType);
    },
  },
};
</script>

<style scoped lang="less">
button.btn {
  z-index: 1;
  &.disabled {
    background-color: gray;
  }
}

.secondary {
}

.skip {
  background: #ffffff;
  color: #236cd8;
  border: none;
  cursor: pointer;
}
</style>
