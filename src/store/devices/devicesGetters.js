export default {
  mms(state) {
    return state.mms;
  },
  skippedMms(state) {
    return state.skippedMms;
  },
  upgradeDevice(state) {
    return state.upgradeDevice;
  },
  replaceDevice(state) {
    return state.replaceDevice;
  },
  devices(state) {
    return state.devices;
  },
  deviceStatus(state) {
    return state.deviceStatus;
  },
  existingLines(state) {
    return state.existingLines;
  },
  newDevices(state) {
    return state.newDevices;
  },
  getNewDevice: state => lineId => {
    return state.newDevices.find(line => line.nameId == lineId);
  },
  getNewDeviceByName: state => lineName => {
    return state.newDevices.find(line => line.name == lineName);
  },
  getNewDeviceById: state => productId => {
    return state.newDevices.find(line => line.product_id == productId);
  },
  getDevcieContract: state => product => {
    var theDevice = state.newDevices.find(device => device.productId == product.product_id);
    // console.log(theDevice);
    return theDevice.plans.find(plan => plan.contract_id == product.contract_id);
  },
  getDeviceByMDN: state => mdn => {
    return state.existingLines.find(line => line.mdn == mdn);
  },
  getUnassignedDevices(state, rootState, rootGetters) {
    var unAssigned = [];
    var assigned = [];
    state.existingLines.forEach(line => {
      if(rootGetters.childAccounts.childAccounts.length > 0){
        rootGetters.childAccounts.childAccounts.forEach(account => {
          if(account.lines.find(device => device.mdn == line.mdn)) {
            assigned.push(line.mdn);
            return false;
          }
        });

        if(!assigned.includes(line.mdn)) {
          unAssigned.push(line);
        }
      } else {
        unAssigned.push(line);
      }
    });
    return unAssigned;
  },
  checkDeviceAssignment:(state, rootState, rootGetters) => mdn => {
    if(rootGetters.childAccounts.childAccounts.length > 0){
      var hasAssignment = false;
      rootGetters.childAccounts.childAccounts.forEach(account => {
        // console.log('in child accounts');
        if(account.lines.find(device => device.mdn == mdn)) {
          hasAssignment = account.firstName;
        }
      });
      return hasAssignment;
    } else {
      return false;
    }
  },
  simSwapModal(state) {
    return state.simSwapModal;
  },
  planChangeDevice(state) {
    return state.planChangeDevice;
  },
  newPlan(state) {
    return state.newPlan;
  },
  // getDevicePlan: state => planId => {
  //   var device = state.newDevices.find(line => line.nameId == lineId);
  //   return device.find(plan => plan.nameId == planId);
  // }
};
