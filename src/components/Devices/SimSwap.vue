<template>
  <div class="modal-overlay">
      <div class="account-modal new-modal sim-swap">
          <button class="close-modal" @click="closeModal"></button>
          <div class="modal-dialog">
            <div class="swapping-devices">
              <div v-for="device in swappingDevices" :key="device.sim" class="selected-device">
                <p class="label" style="display: table-caption;margin-bottom: 10px;">
                  {{device.status}}
                </p>
                <div class="border">
                  <div class="image">
                    <picture>
                        <img :src="'https://gabbwireless.com/wp-content/uploads/2021/11/new-line-'+device.productId+'.png'">
                    </picture>
                  </div>
                  <div class="details">
                      <p class="heading">{{device.name}}</p>
                      <p class="price">{{device.mdn}}</p>
                  </div>
                </div>
              </div>
            </div>
            <h5>You’ve got your new device. Now transfer the old device phone number to the new device.</h5>
            <p class="details">To activate the new device on your account, you’ll need to confirm that you want to transfer the old device’s phone number to the new device.</p>
            <div class="flex sim-action">
              <p><b>New ICC(Sim) Number</b></p>
              <TextField :name="'simswap'" :value="''"></TextField>
            </div>
            <div class="actions">
              <button class="btn center">Transfer Number</button>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TextField from "../FormFields/TextField";

export default {
  name: "SimSwap",
  components: {
    TextField
  },
  props: ['inputDevice', 'newDevice'],
  computed: {
    ...mapGetters("devices", ["existingLines", "devices"]),
    swappingDevices() {
      var defaultDevices = [
        {
          status: 'Old Device',
          name: 'Gabb Z2',
          mdn: '801-384-2841',
          sim: 1,
          productId: 2,
        },
        {
          status: 'New Device',
          name: 'Gabb Z2',
          mdn: '-',
          sim: 2,
          productId: 2,
        }
      ];
      
      var switchingDevices = []

      if(this.inputDevice) {
        switchingDevices.push({
          status: 'Old Device',
          name: this.inputDevice.name,
          mdn: this.inputDevice.mdn,
          sim: 1,
          productId: this.inputDevice.productId,
        })
      } else {
        switchingDevices.push(defaultDevices[0]);
      }

      if(this.newDevice) {
        switchingDevices.push({
          status: 'New Device',
          name: 'Gabb Z2',
          mdn: '3930292',
          sim: 2,
          productId: 2,
        })
      } else {
        switchingDevices.push(defaultDevices[1]);
      }
      return switchingDevices;
    }
  },
  methods: {
    ...mapActions("devices", ["setSimSwapModalVisibility"]),
    closeModal() {
      if(typeof window.closeModal == 'function') {
          window.closeModal();
        };
      this.setSimSwapModalVisibility(false);
    }
  }
};
</script>

<style lang="less" scoped>
  .modal-overlay .new-modal.sim-swap {
    max-width: 800px;
    .modal-dialog {
      margin: 0 auto;
      max-width: 530px;
      .swapping-devices {
        display: flex;
        gap: 24px;
        max-width: 500px;
        margin: 0 auto 30px;
        .selected-device {
          flex: 1;
          .border {
            background: #F5F5F5;
            border-radius: 10px;
            padding: 15px 20px;
            border: none;
            position: relative;
            .image {
              display: table-cell;
              vertical-align: middle;
              img {
                margin-right: 15px;
                max-height: 60px;
              }
            }
            .details {
                display: table-cell;
                vertical-align: middle;
                .heading {
                    font-weight: 500;
                    color: #313638;
                    font-size: 18px;
                    font-family: gotham;
                    margin-top: 0;
                    margin-bottom: 0;
                    text-align: left;
                }
                .price {
                  font-size: 18px;
                  font-family: gotham;
                  font-weight: 400;
                  margin-top: 0;
                  text-align: left;
                }
            }
          }
        }
      }
      h5 {
        font-family: gotham;
        font-weight: 500;
        text-align: center;
        font-size: 20px;
        line-height: 30px;
      }
      p.details {
        text-align: center;
        font-size: 14px;
      }
      .sim-action {
        max-width: 400px;
        margin: 0 auto 30px;
        gap: 15px;
        b {
          color: #313638;
        }
        p {
          text-align: center;
        }
      }
    }
    @media (max-width: 700px) {
      padding: 20px 10px;
      .modal-dialog {
        .swapping-devices {
          gap: 10px;
          p.label {
            text-align: center;
            margin-top: 20px;
            margin-bottom: 0px;
          }
          .selected-device {
            margin: 0;
            .border {
              padding: 10px;
              .image {
                margin-right: 10px;
              }
              .details {
                .heading {
                  font-size: 14px;
                }
                .price {
                  font-size: 14px;
                }
              }
            }
          }
        }
        h5 {
          font-size: 19px;
          line-height: 25px;
        }
        p.details {
          width: 90%;
          font-size: 15px;
          margin: 10px auto 30px;
        }
        .sim-action {
          display: block;
          margin-bottom: 20px;
          div {
            margin: 0 auto;
            max-width: 90%;
          }
        }
      }
    }
  }
</style>
