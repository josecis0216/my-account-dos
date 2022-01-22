export default {
  transactions(state) {
    return state.transactions;
  },
  lastPaymentInfo(state) {
    return state.lastPaymentInfo;
  },
  lastFour(state) {
    return state.lastFour;
  },
  name(state) {
    return state.name;
  },
  expDate(state) {
    return state.expDate;
  },
  getBillCycle: state => billingId => {
    return state.transactions.find(bill => bill.Id == billingId);
  },
  getNewBillCycle: state => cycleEndDate => {
    const d = new Date(cycleEndDate.date);
    
    let cycleStart = new Date(d.getFullYear(), d.getMonth() - 1, cycleEndDate.cycle+1);
    let cycleEnd = new Date(d.getFullYear(), d.getMonth(), cycleEndDate.cycle);
    return cycleStart.toDateString().substring(4,10) + '-' + cycleEnd.toDateString().substring(4,10);
  },
  loadingError(state) {
    return state.loadingError;
  },
};
