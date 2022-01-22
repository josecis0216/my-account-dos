<template>
  <div class="field">
    <div class="form-field" :class="{ 'no-label': !placeholder }">
      <div class="select-box">
        <select
          :name="name"
          :value="value"
          :disabled="restrictInput"
          v-if="name == 'state'"
        >
          <option value="" disabled selected>Select {{ name }}</option>
          <option v-for="state in states" :key="state" :value="state">{{
            state
          }}</option>
        </select>

        <select
          :name="name"
          :value="value"
          :disabled="restrictInput"
          @change="handleInput($event.target.value)"
          v-if="name != 'state'"
        >
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            >{{ option.name }}</option
          >
        </select>
      </div>
      <label :for="name">{{ placeholder }}</label>
      <span class="arrow"></span>
    </div>
    <div class="error"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: "TextField",
  props: {
    placeholder: { type: String, default: "", required: false },
    name: { type: String, default: "", required: true },
    value: { type: String, default: "", required: true },
    restrictInput: { type: Boolean, default: false },
    options: { type: Array },
    states: {
      type: Array,
      default: () => [
        "AL",
        "AK",
        "AZ",
        "AR",
        "CA",
        "CO",
        "CT",
        "DE",
        "FL",
        "GA",
        "HI",
        "ID",
        "IL",
        "IN",
        "IA",
        "KS",
        "KY",
        "LA",
        "ME",
        "MD",
        "MA",
        "MI",
        "MN",
        "MS",
        "MO",
        "MT",
        "NE",
        "NV",
        "NH",
        "NJ",
        "NM",
        "NY",
        "NC",
        "ND",
        "OH",
        "OK",
        "OR",
        "PA",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VT",
        "VA",
        "WA",
        "WV",
        "WI",
        "WY"
      ]
    }
  },
  methods: {
    handleInput(payload) {
      this.$emit("update-" + this.name, payload);
    }
  }
};
</script>

<style scoped lang="less">
.field {
  .form-field {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    .select-box {
      flex: 1;
      padding-right: 10px;
      position: relative;
      select {
        display: table;
        height: 51px;
        width: 120px;
        border: none;
        background-color: #f9f9f9;
        padding: 14px 10px;
        border-radius: 5px;
        box-sizing: border-box;
        position: relative;
        z-index: 2;
        -webkit-appearance: none;
      }
      &:after {
        content: "\f105";
        color: #00b1e3;
        font-family: "icomoon" !important;
        speak: never;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        transform: rotate(90deg);
        right: 30px;
        z-index: 2;
        position: absolute;
        top: 27px;
        display: table;
        font-size: 15px;
      }
    }
    i {
      margin-left: 10px;
    }
    .arrow {
      padding-right: 2px;
    }
    .error {
      color: red;
      text-align: left;
      font-size: 12px;
      margin: -5px 0 10px 10px;
    }
  }
}
</style>
