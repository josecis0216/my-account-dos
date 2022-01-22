<template>
  <div class="feedback-form">
    <h5>Share your feedback</h5>
    <div class="response-options">
      <button :class="{'active': response == 'default'}" @click="selectResponse('default')">
        <span>Provide Feedback</span>
      </button>
      <button :class="{'active': response == 'help'}" @click="selectResponse('help')">
        <span>Need Help</span>
      </button>
    </div>
    <transition name="fade-slide" mode="out-in">
      <div class="field uk-width-1-1" v-if="response == 'default'">
        <h6 class="subtitle-2">Reason:</h6>
        <SelectField :name="'feedbackReason'" :options="feedbackOptions" :value="'Website'"></SelectField>
        <h6 class="subtitle-2">Description:</h6>
        <TextAreaField
            name="firstName"
            rows="8"
            :value="feedbackForm.message"
            @update-firstName="handleInput($event, 'FirstName', 'account')"
        />
        <div class="actions">
          <button class="link" @click="setFeedbackForm({show: false,message:'',response:'Website',})">Canel</button>
          <button class="btn">Submit Feedback</button>
        </div>
      </div>
    </transition>
    <transition name="fade-slide" mode="out-in">
      <div class="support-message" v-if="response == 'help'">
        <div>
          <h5>Need help with something?</h5>
          <p>Visit our support page to browse support articles, get help, or contact us.</p>
          <a href="/support" class="btn center">Visit Support</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import SelectField from "../FormFields/SelectField";
import TextAreaField from "../FormFields/TextAreaField";

export default {
  name: "FeedbackForm",
  components: {
    TextAreaField,
    SelectField
  },
  data() {
    return {
      response: 'default',
      feedbackOptions: [
        {name: 'Website', value: 'Website'},
        {name: 'MyGabb App', value: 'MyGabb App'},
        {name: 'Gabb Watch Lite', value: 'Gabb Watch Lite'},
        {name: 'Gabb Watch', value: 'Gabb Watch'},
        {name: 'Z2 Phone', value: 'Z2 Phone'},
        {name: 'Other', value: 'Other'},
      ],
    }
  },
  props: {
    title: String,
  },
  computed: {
    ...mapGetters("account", ["feedbackForm"])
  },
  methods: {
    ...mapActions("account", ["setFeedbackForm"]),
    selectResponse(option) {
      this.response = option;
    }
  },
};
</script>

<style lang="less">
  .feedback-form {
    overflow: hidden;
    h5 {
      font-family: gotham;
      font-weight: 500;
    }
    .response-options {
      display: table;
      margin-bottom: 20px;
      button {
        cursor: pointer;
        background: transparent;
        outline: none;
        border: 0;
        font-size: 12px;
        color: #A7A7A7;
        display: table-cell;
        margin-right: 10px;
        font-weight: 500;
        font-family: gotham;
        span {
          display: block;
          padding: 10px 20px 10px 10px;
        }
        &:after {
          content: '';
          display: block;
          height: 3px;
          width: 100%;
          background: #A7A7A7;
        }
        &.active {
          color: #236CD8;
          &:after {
            background: #236CD8;
          }
        }
      }
    }
    .field {
      .select-box {
        margin: 0 auto 0 0;
        select {
          color: #313638;
          background: #F5F5F5 !important;
          border: 1px solid #E2E2E2 !important;
        }
        &:after {
          color: #313638 !important;
          font-size: 20px !important;
          top: 50% !important;
          transform: translate(0,-50%) rotate(90deg) !important;
        }
      }
    }
    .support-message div {
      padding: 60px 60px;
      max-width: 400px;
      margin: 0 auto;
      h5 {
        font-family: gotham;
        font-weight: 500;
      }
      @media (max-width: 960px) {
        padding: 40px 20px 30px;
      }
    }
  }
</style>
