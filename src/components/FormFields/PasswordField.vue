<template>
  <div class="field">
    <div class="form-field">
      <input
          :type="passwordVisible ? 'text' : 'password'"
          :placeholder="placeholder"
          :name="name"
          @input="handleInput($event.target.value)"
          @keyup="checkKey($event)"
      />
      <label :for="name">{{ placeholder }}</label>
      <span @click="togglePasswordVisibility" class="eye" v-if="!passwordVisible"
      ><font-awesome-icon :icon="['far','eye']"></font-awesome-icon
      ></span>

      <span @click="togglePasswordVisibility" class="eye" v-if="passwordVisible"
      ><font-awesome-icon :icon="['far','eye-slash']"></font-awesome-icon
      ></span>
    </div>
    <div class="error"><slot></slot></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PasswordField",
  props: {
    toolTip: { type: String, default: "", required: false },
    placeholder: { type: String, default: "", required: true },
    name: { type: String, default: "", required: true },
    value: { type: String, default: "", required: true },
    restrictInput: { type: Boolean, default: false },
  },
  mounted() {
    this.setPasswordVisibility(false);
  },
  methods: {
    handleInput(payload) {
      this.$emit("update-" + this.name, payload);
    },
    ...mapActions("account", ["setPasswordVisibility"]),
    togglePasswordVisibility() {
      this.setPasswordVisibility(!this.passwordVisible);
    },
    checkKey(e) {
      if(e.key == 'Enter') {
        this.$emit("submit-form", true);
      }
    }
  },
  computed: {
    ...mapGetters("account", ["passwordVisible"]),
  },
};
</script>

<style scoped lang="less">
.field {
  position: relative;
  display: flex;
  padding-right: 30px;
  input {
    justify-content: left;
    width: 90%;
    border: none;
    background-color: #f9f9f9;
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
  }
  .eye {
    float: right;
    position: absolute;
    top: 30%;
    right: 0;
    z-index: 2;
    cursor: pointer;
  }
}
</style>
