<template>
  <div class="field" :class="customClass">
    <div class="form-field" :class="{ 'no-label': !placeholder }">
      <input
        type="text"
        :placeholder="placeholder"
        :name="name"
        :value="value"
        @input="handleInput($event.target.value)"
        @keypress="isNumber($event)"
        @keyup="checkKey($event)"
        :disabled="restrictInput"
      />
      <label :for="name">{{ placeholder }}</label>
      <i class="fas fa-info-circle" v-if="toolTip" :uk-tooltip="toolTip"></i>
    </div>
    <div class="error">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextField",
  mounted() {
    if (this.value === null) {
      // console.log(this.name);
    }
  },
  props: [
    'toolTip',
    'customClass',
    'placeholder',
    'name',
    'value',
    'restrictInput',
  ],
  methods: {
    handleInput(payload) {
      this.$emit("update-" + this.name, payload);
    },
    isNumber: function(evt) {
      if(this.name == 'childAccountAge') {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault();;
        } else {
          return true;
        }
      }
    },
    checkKey(e) {
      if(e.key == 'Enter') {
        this.$emit("submit-form", true);
      }
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
    i {
      margin-left: 10px;
    }
    input {
      width: 100%;
      border: none;
      background-color: #f9f9f9;
      padding: 10px;
      border-radius: 5px;
      box-sizing: border-box;
    }
  }
  .error {
    color: red;
    text-align: left;
    font-size: 12px;
    margin: -5px 0 10px 10px;
  }
}
#account-app .disabled {
    .form-field input {
      color: #313638 !important;
      opacity: 0.8 !important;
      background: transparent !important;
      border: none !important;
      outline: none !important;
      padding: 0 !important;
      pointer-events: none;
    }
    .form-field label {
      display: none;
    }
  }
</style>
