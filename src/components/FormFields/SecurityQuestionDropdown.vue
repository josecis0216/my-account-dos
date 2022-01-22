<template>
  <div class="security-question-dropdown-container" :class="{'disabled': disabledClass}">
    <div class="select-box">
      <select
        required
        name="security=question"
        :id="name"
        @input="handleInput($event.target.value)"
        :value="(!value ? (usedQuestions.includes('What city were you born in?') ? 'What was the first concert you attended?' : 'What city were you born in?' ) : value)"
        class="security-question"
        :disabled="disableInput || disabledClass"
      >
        <option v-for="option in sortedOptions" :key="option.value" :value="option.value" :disabled="option.disabled">
          {{option.value}}
        </option>
      </select>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "SecurityQuestionDropdown",
  data() {
    return {
      options: [
        'What city were you born in?',
        'What was the first concert you attended?',
        'What school did you attend for sixth grade?',
        'In which city or town was your first job?',
        'What is the middle name of your oldest child?',
        'What was your favorite food as a child?',
      ],
    }
  },
  props: [
    'value',
    'number',
    'name',
    'disabledClass',
    'showLabel',
    'disableInput',
  ],
  computed: {
    ...mapGetters("account", ["usedQuestions"]),
    sortedOptions() {
      var usedOptions = this.usedQuestions;
      var newOptions = [];
      this.options.forEach(function(element) {
        if(!usedOptions.includes(element)) {
          newOptions.push({value: element, disabled: false})
        } else {
          newOptions.push({value: element, disabled: true})
        }
      });
      return newOptions;
    }
  },
  methods: {
    handleInput(payload) {
      this.$emit("update-" + this.name, payload);
    },
  },
};
</script>

<style lang="less" scoped>
.security-question-dropdown-container {
  @media (min-width: 960px) {
    flex: 1;
  }
  .select-box {
    flex: 1;
    padding-right: 10px;
    position: relative;
    select {
      display: table;
      width: 100%;
      border: none;
      background-color: #f9f9f9;
      padding: 17px 30px 17px 15px;
      border-radius: 5px;
      box-sizing: border-box !important;
      position: relative;
      z-index: 2;
      -webkit-appearance: none;
      white-space: pre-wrap;
    }
    &:after {
      content: '\f105';
      color: #00B1E3;
      font-family: 'icomoon' !important;
      speak: never;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      transform: translate(0,-50%) rotate(90deg);
      right: 30px;
      z-index: 2;
      position: absolute;
      top: 50%;
      display: table;
      font-size: 15px;
    }
  }
  &.disabled .select-box {
    select {
      -webkit-appearance: none;
      appearance: none;
      color: #313638;
      opacity: 0.8;
      background: transparent;
      border: none;
      outline: none;
      padding: 0;
      white-space: pre-wrap;
    }
    &:after {
      opacity: 0;
    }
  }
}
</style>
