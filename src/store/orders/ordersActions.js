import rootModule from "@/store/index";
import customerApi from "@/api/customer";
import axios from "axios";
import startingState from "@/store/orders/ordersModule";
import { faBug } from "@fortawesome/free-solid-svg-icons";
export default {
  setOrderModalStatus({ commit }, payload) {
    commit("setOrderModalStatus", payload);
  },
  async getOrdersAndProducts({ commit, dispatch, rootState }) {
    await dispatch("setIsLoadingStatus", true, { root: true });
    await dispatch("orders/initCustomerOrders", "", { root: true });
    await dispatch("product/initProductState", "", { root: true });
    await dispatch("setIsLoadingStatus", false, { root: true });
  },
  async initCustomerOrders({ dispatch, commit, rootState, state }) {
    const { data } = await customerApi.loadCustomerOrders({
      token: rootState.auth.authToken
    });
    if(data.status) {
      await dispatch("auth/setTimedOut", '', { root: true });
      await dispatch("auth/doLogout", '', { root: true })
      return false;
    }
    data.forEach(pairedOrderItems);
    function pairedOrderItems(item, index) {
      var payload = item;
      let pairedOrderItemsArray = [];
      payload.items.forEach(addNewOrderItem);
      function addNewOrderItem(item, index) {
        if(item.parent_id == null) {
          pairedOrderItemsArray.push(item);
        } else {
          var parentItem = pairedOrderItemsArray.find(parent => parent.id === item.parent_id);
          if(parentItem['children'] == undefined) {
            parentItem['children'] = [];
          }
          parentItem['children'].push(item);
        }
      }
      payload.items = pairedOrderItemsArray;
    }
    commit("initCustomerOrders", data);
  },
  clearTheState({commit}) {
    commit("resetState", startingState.defaultState);
  },    
};
