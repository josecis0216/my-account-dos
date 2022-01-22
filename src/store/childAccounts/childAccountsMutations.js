export default {
    setChildModalVisibility(state, payload) {
        state.childStatus = payload;
    },
    // RETRIEVING CHILD ACCOUNTS
    setChildAccounts(state, payload) {
        state.childAccounts = payload
    },
    updateChildDevices(state, payload) {
        var updatedAccounts = [];
        state.childAccounts.forEach(function(element, index, array){
            console.log(element);
            if(element.gabb_id == payload.account) {
                element.lines = payload.lines;
            } 
            updatedAccounts.push(element);
        });
        state.childAccounts = updatedAccounts;  
    },
    // CHILD ACCOUNT CREATION
    setChildAccountName(state, payload) {
        state.savedChildAccount.name = payload
    },
    setChildAccountAge(state, payload) {
        state.savedChildAccount.age = payload
    },
    setChildAccountGender(state, payload) {
        state.savedChildAccount.gender = payload
    },
    setChildAccountImage(state, payload) {
        state.savedChildAccount.image = payload
    },
    setChildAccountProgress(state, payload) {
        state.savedChildAccount.progress = payload
    },
    updateChildAccount(state, payload) {
        var updatedAccounts = [];
        state.childAccounts.forEach(function(element, index, array){
            console.log(element);
            if(element.gabb_id == payload.gabb_id) {
                updatedAccounts.push(payload);
            } else {
                updatedAccounts.push(element);
            }
        });
        state.childAccounts = updatedAccounts;
    },
    addNewChildAccount(state, payload) {
        state.childAccounts.push(payload);
    },
    setResponse(state, payload) {
        state.childAccountsResponse = payload;
    },
    resetState (state, payload) {
        Object.assign(state, payload)
    }   
};
