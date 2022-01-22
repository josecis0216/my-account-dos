<template>
    <div class="modal-overlay">
        <div class="account-modal new-modal">
            <div class="title-block flex">
                <div class="modal-intro">
                    <h5 v-if="title"><b>{{title}}</b></h5>
                    <slot></slot>
                </div>
                <div>
                    <button class="close-modal" @click="closeModal"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import GenericButton from "@/components/FormFields/GenericButton";

export default {
    name: 'OrderModal',
    computed: {
        ...mapGetters("devices", ["deviceStatus"]),
    },
    props: ["title"],
    methods: {
      ...mapActions("orders", ["setOrderModalStatus"]),
      closeModal() {
        if(typeof window.closeModal == 'function') {
          window.closeModal();
        };
        this.setOrderModalStatus(false);
      },
    }
}
</script>

<style lang="less">
  .modal-overlay {
    .account-modal {
      .actions {
        display: table;
        margin: 0 auto;
        width: auto;
        &>* {
          display: table-cell;
          margin: 0 10px;
        }
        @media (max-width: 960px) {
          display: flex;
          flex-direction: column;
          &>* {
            display: table;
            margin: 0 auto 10px;
            &.btn {
              order: 1;
            }
            &.link {
              order: 2;
            }
          }
        }
      }
    }
  }
</style>