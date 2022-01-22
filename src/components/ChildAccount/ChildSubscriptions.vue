<template>
  <div class="account-tab">
      <div class="title-block flex" v-if="!$route.params.order">
        <h3>Subscriptions</h3>
        <GenericButton injectedClass="btn no-margin right" text="Add Subscription"></GenericButton>
      </div>
      <div class="box" v-on:click="toggle(opened)">
        <div class="subscription-list" :class="{open: opened}">
          <table :class="{closed: !opened}">
            <thead v-if="opened">
              <tr>
                <td><h5>Services</h5></td>
                <td><h5>Price</h5></td>
                <td><h5>Plan</h5></td>
              </tr>
            </thead>
            <tr v-for="subscription in subscriptions" :key="subscription.slug">
              <td class="col">
                <picture>
                  <img v-if="subscription.slug" width="31" height="31" :src="'https://gabbwireless.com/wp-content/uploads/2021/11/'+subscription.slug+'.png'">
                  <img v-if="!subscription.slug" width="31" height="31" :src="'https://gabbwireless.com/wp-content/uploads/2021/11/gabb_black_subscription.png'">
                </picture>
                <span class="name" v-if="opened">{{subscription.name}}</span>
              </td>
              <td class="col" v-if="opened">
                <span>{{subscription.price != '0' ? '$'+subscription.price+'/mo' : 'Free'}}</span>
              </td>
              <td class="col" v-if="opened">
                <span>{{subscription.plan}}</span>
              </td>
              <td class="col" v-if="opened">
                <GenericButton injectedClass="link" text="Manage"></GenericButton>
              </td>
            </tr>
          </table>
          <p style="flex:1;" v-if="!opened">{{subscriptions.length}} active</p>
          <h6 style="flex:1;text-align:right;font-weight:600;font-family:gotham;color:#313638;font-size:14px;">Monthly Subscriptions Total: <span>--</span></h6>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import GenericButton from '../FormFields/GenericButton.vue';

export default {
  name: "ChildSubscriptions",
  components: {
      GenericButton
  },
  data() {
        return {
            opened: false,
            subscriptions: [
              {
                slug:'gabb-pay',
                name:'Gabb Pay',
                price: 5.99,
                plan:'Pay Basic',
              },
              {
                slug:'gabb-cloud',
                name:'Gabb Cloud',
                price: 0.99,
                plan:'Cloud Premium',
              },
              {
                slug:'gabb-tunes',
                name:'Gabb Tunes',
                price: 5.99,
                plan:'Stream',
              },
              {
                // slug:'gabb-life',
                name:'Gabb Life',
                price: 0,
                plan:'Gabb Life Basic',
              },
            ]
        }
  },
  // props: {
  //   subscriptions: {}
  // },
  computed: {
  },
  methods: {
    ...mapActions("devices", ["setStatusModalVisibility"]),
    totalRequest() {
      return this.subscriptions.reduce((acc, item) => acc + item.price, 0);
    },
    toggle(open) {
      if(open) {
        this.opened = false;
      } else {
        this.opened = true;
      }
    }
  },
};
</script>

<style lang="less" scoped>
  .subscription-list {
    display: flex;
    align-items: center;
    &.open {
      display: block;
      h6 {
        margin-top:20px;
        margin-bottom:-10px;
      }
    }
    table.closed {
      display: flex;
      padding-left: 0;
      list-style: none;
      height: 38px;
      margin-top: 0;
      margin-bottom: 0;
      tr {
        display: block;
        height: 38px;
      }
      td {
        padding-right: 20px;
      }
    }
    table {
      flex: 1;
      width: 100%;
      margin-top: -10px;
      margin-bottom: -10px;
      td {
        h5 {
          font-family: gotham;
          font-weight: 500;
          font-size: 20px;
          color: #313638;
          margin-bottom: 0px;
        }
        img {
          margin-right: 10px;
        }
        span {
          display: inline-block;
          padding-right: 40px;
          padding-top: 15px;
          padding-bottom: 15px;
          font-size: 14px;
          color: #313638;
          &.name {
            font-weight: 500;
            font-family: gotham;
            color: #313638;
          }
        }
        a, button {
          font-size: 14px;
          display: block;
          margin: 0 auto;
          padding: 0;
        }
      }
    }
  }
</style>
