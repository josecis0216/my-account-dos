<template>
  <div class="order-item flex" :class="injectedClass">
    <picture>
      <!--      <source-->
      <!--        src="https://gabbwireless.com/wp-content/uploads/2021/09/gabb_z2.png.webp"-->
      <!--        type="webp"-->
      <!--      />-->
      <img width="65px" height="75px" :src="getImgUrl(item.product_id)" />
    </picture>
    <div class="details">
      <div class="flex">
        <p>
          <b>{{ scrubName(myProductInfo(item.product_id).name) }}</b>
        </p>
        <p class="price">${{ myProductInfo(item.product_id).price }}</p>
      </div>
      <div class="flex child" v-for="child in item.children" :key="child.id">
        <p class="name">+ {{scrubChildName(myProductInfo(child.product_id).name)}}</p>
        <p class="monthly-price">+{{myProductInfo(child.product_id).price}}/mo</p>
        <p class="name" v-if="checkForMMS(myProductInfo(child.product_id).name)">+ MMS</p>
        <p class="monthly-price" v-if="checkForMMS(myProductInfo(child.product_id).name)">+5.00/mo</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "OrderDevice",
  props: ["item",'injectedClass'],
  mounted() {
    // let myProduct = this.productInfo(this.item.product_id);
  },
  components: {},
  computed: {
    ...mapGetters("product", ["products", "productInfo"]),
  },
  methods: {
    myProductInfo(product_item_id) {
      // this.item.product_id
      return this.productInfo(product_item_id);
      // text.includes
      // .match(/\(([^)]+)\)/)[1]
    },
    checkForMMS(product_name){
      if(product_name.includes('Plus')) {
        return true;
      } else {
        return false;
      }
    },
    scrubName(product_name) {
      if(product_name == 'Z2') {
        return 'Gabb Z2 Phone';
      } else {
        return product_name;
      }
    },
    scrubChildName(product_name){
      if(product_name.includes('(')) {
        return product_name.match(/\(([^)]+)\)/)[1];
      } else {
        if(product_name.includes('Warranty')) {
          return 'Warranty';
        } else {
          return 'No Contract';
        }
      }
    },
    getImgUrl(id) {
      if(id !== 2 && id !== 11 && id !== 15) {
        return 'https://gabbwireless.com/wp-content/themes/gabb-redesign/img/products/accessory-'+id+'.png';
      } else {
        return 'https://gabbwireless.com/wp-content/themes/gabb-redesign/img/products/product-'+id+'.png';
      }
      // return `https://gabbwireless.com/wp-content/uploads/2021/09/gabb_z2.png`;

      // return require("@/assets/img/devices/product-" + id + ".png");
    }
  }
};
</script>

<style lang="less" scoped>
.order-item {
  align-items: flex-start;
  padding: 10px 0 20px;
  &.order_page {
    .price {
      font-weight: 500;
      font-family: gotham;
    }
  }
  div {
    position: relative;
    padding-left: 5px;
    &.details {
      flex: 1;
      box-sizing: border-box;
      padding-top: 5px;
    }
    p {
      color: #313638;
      margin: 0 0;
      b {
        font-size: 16px;
        color: #313638;
      }
      &.price {
        opacity: 0.9;
        font-size: 18px;
        text-align: right;
        font-family: gotham;
        font-weight: 400;
        flex: 1;
        color: #313638;
      }
    }
    .child {
      box-sizing: border-box;
      width: 100%;
      opacity: 0.6;
      .name {
        font-size: 14px;
        width: 50%;
        text-align: left;
        padding-left: 20px;
      }
      .monthly-price {
        flex: 1;
        text-align: right;
        font-size: 14px;
      }
    }
  }
}
</style>
