export default {
  childStatus(state) {
    return state.childStatus;
  },
  savedChildAccount(state) {
    return state.savedChildAccount;
  },
  childAccounts(state) {
    return state.childAccounts;
  },
  getchildAccountByMDN: state => mdn => {
    return state.childAccounts.find(device => device.mdn === mdn);
  },
  getchildAccountById: state => gabbId => {
    return state.childAccounts.find(account => account.id === gabbId);
  },
  getchildAccountByName: state => name => {
    return state.childAccounts.find(account => account.firstName === name);
  },
};
