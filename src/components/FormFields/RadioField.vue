<template>
  <div class="checkbox-container radio flex">
    <div class="custom-checkbox" v-for="option in options" :key="option.value">
      <input
        type="radio"
        :name="name"
        :value="option.value"
        :checked="value == option.value"
        @click="handleInput($event.target.value)"
      />
      <label v-if="option.label">{{option.label}}</label>
      <span class="checkmark"></span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "RadioField",
  props: ['options', 'name', 'value'],
  computed: {},
  methods: {
    handleInput(payload) {
      this.$emit("update-" + this.name, payload);
    }
  },
};
</script>

<style scoped lang="less">
.transitions {
  transition: all 0.4s ease-in-out 0s;
  -moz-transition: all 0.4s ease-in-out 0s;
  -webkit-transition: all 0.4s ease-in-out 0s;
}

.quick-transitions {
  transition: all 0.2s ease-in-out 0s;
  -moz-transition: all 0.2s ease-in-out 0s;
  -webkit-transition: all 0.2s ease-in-out 0s;
}

.checkbox-container {
  text-align: left;
  .custom-checkbox {
    color: #080909;
    display: table;
    position: relative;
    padding-bottom: 5px;
    padding-top: 5px;
    padding-left: 30px !important;
    cursor: pointer;
    font-size: 14px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
    margin-left: 30px;
    &:first-child {
      margin-left: 0;
    }
    label {
      cursor: pointer;
    }
    &.center {
      margin: 5px auto;
    }
    input {
      cursor: pointer;
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      left: 0;
      z-index: 2;
      &:checked ~ .checkmark {
        border: 1px solid #00B1E3;
        &:after {
          top: 10px;
          left: 3px;
          opacity: 1;
          border-radius: 0;
          background: transparent;
          transform: none;
          height: 0.6em !important;
          width: 0.25em !important;
        }
      }
    }
    .checkmark {
      background: #F5F5F5;
      border: 1px solid #E2E2E2;
      border-radius: 5px;
      height: 18px;
      width: 18px;
      display: block;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      &:after {
        top: 8px;
        left: 3px;
        transform: scaleX(-1) rotate(135deg) !important;
        opacity: 0;
        height: 0.6em !important;
        width: 0.25em !important;
        transform-origin: left top;
        border-left: 0 !important;
        border-bottom: 0 !important;
        border-right: 2px solid #00B1E3 !important;
        border-top: 2px solid #00B1E3 !important;
        border-radius: 0;
        background: transparent;
        transform: none;
        content: "";
        position: absolute;
      }
      &.disabled {
        background-color: #b5b5b5;
      }
    }

    &:hover input ~ .checkmark {
      opacity: 0.8;
      .quick-transitions();
      &.disabled {
        background-color: #b5b5b5;
      }
    }

    /* When the checkbox is checked, add a blue background */
    input:checked ~ .checkmark {
      /* Show the checkmark when checked */
      &:after {
        display: block;
        .quick-transitions();
      }
    }
  }
}
</style>
