<template>
    <div class="device-status" :class="injectedClass">
        <div :class="'status-bar ' + checkStatus">
          <div class="flex">
            <h6 class="subtitle-2">
              <span class="uk-hidden@m">Current Usage </span
              ><span class="uk-visible@m">Usage: </span>
              <span class="status">{{ checkStatus }}</span>
            </h6>
            <button @click="showModal()" style="outline:none;background:none;border:none;color:#8E8E8E;">
              <font-awesome-icon :icon="['fas','info-circle']"></font-awesome-icon>
            </button>
          </div>
          <div class="bar">
            <span class="fill" :style="'width:' + usageScore + '%;'"></span>
            <span
              class="health-limit subtitle-3"
              :style="'left:' + 70 + '%;'"
              ><b>Unhealthy</b></span
            >
          </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from "vuex";

    export default {
        name: "HealthStatus",
        props: ['usage','injectedClass'],
        computed: {
          usageScore() {
              let score = 0;
              if(this.usage.message.health_score >= this.usage.voice.health_score) {
                  score = this.usage.message.health_score;
              }
              if(this.usage.message.health_score <= this.usage.voice.health_score) {
                  score = this.usage.voice.health_score;
              }
              if(this.usage.message.health_score == 0) {
                  score = 0.05;
              }
              if(this.usage.voice.health_score == 0) {
                  score = 0.05;
              }
              score = score * 100;
              if( score >= 100) {
                return 100
              } else {
                return score;
              }
          },
          checkStatus() {
              if (this.usage.message.total_msg < this.usage.message.limit / 1.5) {
                  return "Healthy";
              } else {
                  if (this.usage.voice.total_msg < this.usage.voice.limit / 1.5) {
                      return "Healthy";
                  }
              }
              if (this.usage.message.total_msg > this.usage.message.limit / 1.5 && this.usage.message.total_msg < this.usage.message.limit) {
                  return "High";
              } else {
                  if (this.usage.voice.total_msg > this.usage.voice.limit / 1.5 && this.usage.voice.total_msg < this.usage.voice.limit) {
                      return "High";
                  }
              }
              if (this.usage.message.total_msg >= this.usage.message.limit && this.usage.message.total_msg <= this.usage.message.limit + 10) {
                  return "Unhealthy";
              } else {
                  if (this.usage.voice.total_msg >= this.usage.voice.limit && this.usage.voice.total_msg <= this.usage.voice.limit + 10) {
                      return "Unhealthy";
                  }
              }
              if (this.usage.message.total_msg > this.usage.message.limit + 10 && this.usage.message.total_msg < 98) {
                  return "Very Unhealthy";
              } else {
                  if (this.usage.voice.total_msg > this.usage.voice.limit + 10 && this.usage.voice.total_msg < 98) {
                      return "Very Unhealthy";
                  }
              }
              if (this.usage.message.total_msg >= 95) {
                  return "Very Unhealthy";
              } else {
                  if (this.usage.voice.total_msg >= 95) {
                      return "Very Unhealthy";
                  }
              }
              return false;
          },
        },
        methods: {
          ...mapActions("devices", ["setStatusModalVisibility"]),
          showModal() {
            if(typeof window.openModal == 'function') {
          window.openModal();
        }
            this.setStatusModalVisibility(true);
          },
        }
    }
</script>
<style lang="less" scoped>
    .device-status {
      background: #f1f1f1;
      padding: 15px 15px;
      border-radius: 8px;
      h6 {
        padding-right: 6px;
        color: #080909;
      }
      p {
        color: #313638;
        opacity: 0.5;
      }
      .plan {
        margin-bottom: 10px;
      }
      .status-bar {
        h6 {
          flex: 1;
        }
        .fas {
          color: #8e8e8e;
        }
      }
      .bar {
        display: block;
        height: 8px;
        border-radius: 30px;
        background: #8e8e8e;
        margin: 10px auto 30px;
        position: relative;
        .fill {
          display: block;
          height: 8px;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 30px;
        }
        .health-limit {
          position: absolute;
          display: block;
          &:before {
            content: "";
            position: absolute;
            background: #f1f1f1;
            height: 8px;
            width: 1px;
          }
          b {
            &:before {
              content: "";
              width: 0;
              height: 0;
              border-top: 4px solid transparent;
              border-bottom: 4px solid transparent;
              border-right: 5px solid #8e8e8e;
              position: relative;
              transform: rotate(90deg);
              display: block;
              margin: 0 auto -1px;
            }
            position: absolute;
            left: 50%;
            transform: translate(-50%, 0);
            top: 12px;
            font-family: gotham-book;
            font-size: 10px;
          }
        }
      }
      .status {
        color: #ffffff;
        padding: 4px;
        border-radius: 5px;
      }
      .Healthy {
        .status,
        .fill {
          background: #00b1e3;
        }
      }
      .High {
        .status,
        .fill {
          background: #dd9000;
        }
      }
      .Unhealthy {
        .status,
        .fill {
          background: #ed3f00;
        }
        &.Very {
          .status,
          .fill {
            background: #e30000;
          }
        }
      }
    }
    .device-status {
        box-sizing: border-box;
        width: 100%;
        &.no-padding {
            padding: 0;
        }
        .flex {
            .subtitle-2 {
                text-align: left;
            }
        }
    }
</style>