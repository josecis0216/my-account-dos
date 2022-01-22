<template>
  <div class="field" :class="customClass">
    <div class="form-field" :class="{ 'no-label': !placeholder }">
      <textarea
        :placeholder="placeholder"
        :name="name"
        @input="handleInput($event.target.value)"
        @keypress="isNumber($event)"
        @keyup="checkKey($event)"
        :disabled="restrictInput"
        :rows="rows"
      >
      </textarea>
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
  name: "TextAreaField",
  mounted() {
    if (this.value === null) {
      // console.log(this.name);
    }
  },
  props: {
    toolTip: { type: String, default: "", required: false },
    customClass: { type: String, default: "", required: false },
    placeholder: { type: String, default: "", required: false },
    name: { type: String, default: "", required: true },
    value: { required: true },
    restrictInput: { type: Boolean, default: false },
    rows: {type: String},
  },
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
    textarea {
      font-family: gotham;
      font-weight: 400;
      color: #313638;
      width: 100%;
      border: none;
      padding: 25px 15px;
      background-color: #F5F5F5;
      border-radius: 5px;
      box-sizing: border-box;
    }
    &.no-label textarea{
      padding: 15px;
    }
  }
  .error {
    color: red;
    text-align: left;
    font-size: 12px;
    margin: -5px 0 10px 10px;
  }
}
</style>
