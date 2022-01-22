import rootModule from "@/store/index";
import devicesApi from "@/api/customer";
import startingState from "@/store/devices/devicesModule";
import Vue from "vue";

export default {
  async getHealthStatus({state, dispatch, commit }, payload) {
    // console.log(payload);
    if(payload.mdn != undefined) {
      let { data } = await devicesApi.getDeviceHealth({
        // mdn: 3859857426,
        mdn: payload.mdn,
        token: payload.token,
      });
      return data;
    }
  },
  async showStatusModal({ dispatch, commit }) {
    // commit("dismissModal", "", { root: true });
    // dispatch("setStatusModalVisibility", true);
  },
  setStatusModalVisibility({ commit }, payload) {
    commit("setStatusModalVisibility", payload);
  },
  setExistingLines({ commit }, payload) {
    commit("setExistingLines", payload);
  },
  async initDevicesModule({ commit, dispatch }, payload) {
    let date = new Date();
    let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    startDate = startDate.getFullYear() +'-'+ startDate.getMonth() +'-'+ '01';
    let endDate = new Date(date.getFullYear(), date.getMonth(), 1, 0);
    endDate = endDate.getFullYear() +'-'+ endDate.getMonth() +'-'+ '28';

    payload.lines.forEach( async function(index, key, value) {
      let { data } = await devicesApi.getDeviceHealth({
        // mdn: 3859857426,
        mdn: index.mdn,
        token: payload.token,
        startDate: startDate,
        endDate: endDate,
      });
      // console.log("Getting Device Usage");
      // console.log(data.usage);
      
      index['usage'] = data.usage;

      // console.log(index);
    });
    await dispatch("setExistingLines", payload.lines);
  },
  setMms({ commit }, payload) {
    commit("setMms", payload);
  },
  skipMms({ commit }, payload) {
    commit("skipMms", payload);
  },
  setUpgradeDevice({ commit }, payload) {
    commit("setUpgradeDevice", payload);
  },
  setReplaceDevice({ commit }, payload) {
    commit("setReplaceDevice", payload);
  },
  setPlanChangeDevice({ commit }, payload) {
    commit("setPlanChangeDevice", payload);
  },
  setNewPlan({ commit }, payload) {
    commit("setNewPlan", payload);
  },
  setSimSwapModalVisibility({ commit }, payload) {
    commit("setSimSwapModalVisibility", payload);
  },
  clearTheState({commit}) {
    commit("resetState", startingState.defaultState);
  },    
};
