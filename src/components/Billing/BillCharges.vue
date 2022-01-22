<template>
    <section class="bill-charges">
        <div class="title-block">
            <h3>Bill Charges</h3>
            <h5>{{getNewBillCycle(billDate)}}</h5>
        </div>
        <div>
            <div class="descript">
                <p>Description</p>
                <p>Subtotal</p>
            </div>
            <button class="accordion active">
                <span>Monthly Phone Plan Charges (3 Devices)</span>
                <span>$25.98</span>
                <img src="https://gabbwireless.com/wp-content/uploads/2021/11/gabb-accord-arrow.png">
            </button>
            <div class="panel">
                <div>
                    <p>Gabb Plus Plan</p>
                    <p>$24.99</p>
                </div>
                <div>
                    <p>Extended Warranty</p>
                    <p>$4.99</p>
                </div>
            </div>

            <button class="accordion">
                <span>Taxes</span>
                <span>$25.98</span>
                <img src="https://gabbwireless.com/wp-content/uploads/2021/11/gabb-accord-arrow.png">
            </button>
            <div class="panel">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>

            <button class="accordion">
                <span>Subscriptions (6)</span>
                <span>$25.98</span>
                <img src="https://gabbwireless.com/wp-content/uploads/2021/11/gabb-accord-arrow.png">
            </button>
            <div class="panel">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>

            <button class="accordion">
                <span>One Time Charges</span>
                <span>$25.98</span>
                <img src="https://gabbwireless.com/wp-content/uploads/2021/11/gabb-accord-arrow.png">
            </button>
            <div class="panel">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>

            <button class="accordion">
                <span>Balance Adjustments</span>
                <span>$25.98</span>
                <img src="https://gabbwireless.com/wp-content/uploads/2021/11/gabb-accord-arrow.png">
            </button>
            <div class="panel">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </div>
        <div class="total"><span>Total Bill:</span> <span v-if="billObject">${{billObject.Amount}}</span></div>
    </section>    
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "BillCharges",
  components: {},
  props: ['billDate', 'billObject'],
  mounted() {
      this.setupAccordion;
  },
  computed: {
      ...mapGetters("payment", ["getNewBillCycle"]),
      setupAccordion() {
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            if(acc[i].classList.contains('active')) {
                var panel = acc[i].nextElementSibling;
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                    panel.classList.toggle('open');
                } else {
                    panel.classList.toggle('open');
                    panel.style.maxHeight = panel.scrollHeight + "px";
                } 
            });
        }
        return true;
      }
  },
  methods: {
    paymentDate(date) {
      const d = new Date(date);
      return d.toDateString().substring(3,20);
    },
  },
};
</script>

<style lang="less" scoped>
.bill-charges {
    .title-block {
        flex-direction: column;
    }
    h3 {
        margin-bottom: 0;
    }
    .descript {
        display: flex;
        p {
            font-family: gotham;
            font-weight: 500;
            color: #313638;
        }
        p:first-child {
            display: block;
            flex: 1;
            text-align: left;
            padding-left: 0px;
        }
        p:last-child {
            display: block;
            flex: 1;
            text-align: right;
            padding-right: 55px;
        }
    }
    .total {
        display: table;
        margin: 10px 0 0 auto;
        span {
            vertical-align: top;
            padding-right: 10px;
            padding-top: 10px;
            color: #313638;
            font-size: 16px;
        }
        span:last-child {
            vertical-align: top;
            font-size: 26px;
            line-height: 26px;
            color: #313638;
        }
    }
}
.accordion {
    background-color: #eee;
    color: #313638;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-family: gotham;
    font-weight: 400;
    font-size: 14px;
    transition: 0.4s;
    margin-bottom: 10px;
    border-radius: 10px;
    display: flex;
    span:first-child {
        display: block;
        flex: 1;
        text-align: left;
    }
    span:nth-last-child(2) {
        display: block;
        flex: 1;
        text-align: right;
        padding-right: 20px;
    }
    span:last-child {
        display: block;
        flex: 1;
        text-align: right;
    }
    img {
        transform: rotate(-180deg);
        transition: all 0.3s ease-in-out 0s;
        -moz-transition: all 0.3s ease-in-out 0s;
        -webkit-transition: all 0.3s ease-in-out 0s;
        }
    &.active {
        img {
            transform: rotate(0deg);
            transition: all 0.3s ease-in-out 0s;
            -moz-transition: all 0.3s ease-in-out 0s;
            -webkit-transition: all 0.3s ease-in-out 0s;
        }
    }
}

.panel {
  padding: 0 18px;
  background-color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  div {
    display: flex;
    p:first-child {
        display: block;
        flex: 1;
        text-align: left;
    }
    p:last-child {
        display: block;
        flex: 1;
        text-align: right;
    }
    &:last-child {
        margin-bottom: 20px;
    }
  }
}
</style>