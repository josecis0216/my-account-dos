export default {
    setStatusModalVisibility(state, payload) {
        state.deviceStatus = payload;
    },
    setExistingLines(state, payload) {
        state.existingLines = payload
    },
    setMms(state, payload) {
        state.mms = payload
    },
    skipMms(state, payload) {
        state.skippedMms = payload
    },
    setUpgradeDevice(state, payload) {
        state.upgradeDevice = payload
    },
    setReplaceDevice(state, payload) {
        state.replaceDevice = payload
    },
    setPlanChangeDevice(state, payload) {
        state.planChangeDevice = payload
    },
    setNewPlan(state, payload) {
        state.newPlan = payload
    },
    setSimSwapModalVisibility(state, payload) {
        state.simSwapModal = payload;
    },
    resetState (state, payload) {
        Object.assign(state, payload)
    },   
};
