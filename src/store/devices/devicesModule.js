import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import mutations from "@/store/devices/devicesMutations";
import actions from "@/store/devices/devicesActions";
import getters from "@/store/devices/devicesGetters";

Vue.use(Vuex);

function getInitialState() {
  return {
    deviceStatus: false,
    simSwapModal: false,
    existingLines: [],
    newDevices: [
      {
        productId: 2,
        name: 'Gabb Z2',
        price: 99.99,
        sku: 'phone-z2',
        nameId: 'gabb-z2',
        product_id: 2,
        plans: [
          {
            name: '2 Year Contract',
            sku: 'plan-basic-2y',
            contract_id: 3,
            nameId: '2yr-contract',
            price: 17.99,
          },
          {
            name: '1 Year Contract',
            sku: 'plan-basic-1y',
            contract_id: 2,
            nameId: '1yr-contract',
            price: 19.99,
          },
          {
            name: 'No Contract',
            sku: 'plan-basic',
            contract_id: 1,
            nameId: 'no-contract',
            price: 24.99,
          }
        ],
        warranty: {
          name: 'Gabb Protect',
          descript: 'Covers damage from drops and spills',
          price: 4.99,
          sku: 'warranty',
        }
      },
      {
        productId:11,
        name: 'Gabb Watch',
        price: 99.99,
        sku: 'watch-plus',
        nameId: 'gabb-watch',
        product_id: 11,
        plans: [
          {
            name: '2 Year Contract',
            sku: 'plan-watch-2y',
            contract_id: 3,
            nameId: '2yr-contract',
            price: 9.99,
          },
          {
            name: '1 Year Contract',
            sku: 'plan-watch-1y',
            contract_id: 2,
            nameId: '1yr-contract',
            price: 12.99,
          },
          {
            name: 'No Contract',
            sku: 'plan-watch',
            contract_id: 1,
            nameId: 'no-contract',
            price: 16.99,
          }
        ],
        warranty: {
          name: 'Gabb Protect',
          descript: 'Covers damage from drops and spills',
          price: 4.99,
          sku: 'watch_warranty',
        }
      },
      {
        productId: 15,
        name: 'Gabb Watch Lite',
        price: 79.99,
        sku: 'watch-lite',
        nameId: 'gabb-watch-lite',
        product_id: 15,
        plans: [
          {
            name: '2 Year Contract',
            sku: 'plan-watch-lite-2yr',
            contract_id: 3,
            nameId: '2yr-contract',
            price: 6.99,
          },
          {
            name: '1 Year Contract',
            sku: 'plan-watch-lite-1yr',
            contract_id: 2,
            nameId: '1yr-contract',
            price: 8.99,
          },
          {
            name: 'No Contract',
            sku: 'plan-watch-lite',
            contract_id: 1,
            nameId: 'no-contract',
            price: 12.99,
          }
        ],
        warranty: {
          name: 'Gabb Protect',
          descript: 'Covers damage from drops and spills',
          price: 3.99,
          sku: 'warranty-watch-lite',
        }
      },
    ],
    mms: false,
    skippedMms: false,
    upgradeDevice: false,
    replaceDevice: false,
    planChangeDevice: false,
    newPlan: false,
  };
}

const initialState = getInitialState();

export default {
  namespaced: true,
  state: initialState,
  mutations: { ...mutations },
  actions: { ...actions },
  getters: { ...getters },
  plugins: [createPersistedState()],
  defaultState: initialState,
};
