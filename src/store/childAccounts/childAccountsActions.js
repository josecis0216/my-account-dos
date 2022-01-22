import rootModule from "@/store/index";
import childAccountApi from "@/api/childAccount";
import startingState from "@/store/childAccounts/childAccountsModule";
import router from "../../routes/routes";
import Vue from "vue";

export default {
  setChildModalVisibility({ commit }, payload) {
    commit("setChildModalVisibility", payload);
  },

  // CHILD ACCOUNTS
  async getChildAccounts({ dispatch, commit, rootState }, payload) {
    let { data: childAccountData } = await childAccountApi.loadChildAccounts({
      token: payload,
    });
    commit("setResponse", childAccountData.results);

    if(childAccountData.status != 'error') {
      dispatch("setChildAccounts", childAccountData.results)
    }
  },

  updateChildDevices({ commit }, payload) {
    commit("updateChildDevices", payload);
  },

  // UPLOAD ACCOUNT IMAGE TO MEDIA SERVICE
  async uploadAccountImage({ commit, rootState }, payload) {
    console.log(rootState.auth.authToken);
    // function dataURItoBlob(dataURI) {
    //   // convert base64/URLEncoded data component to raw binary data held in a string
    //   var byteString;
    //   if (dataURI.split(',')[0].indexOf('base64') >= 0)
    //       byteString = atob(dataURI.split(',')[1]);
    //   else
    //       byteString = unescape(dataURI.split(',')[1]);
  
    //   // separate out the mime component
    //   var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  
    //   // write the bytes of the string to a typed array
    //   var ia = new Uint8Array(byteString.length);
    //   for (var i = 0; i < byteString.length; i++) {
    //       ia[i] = byteString.charCodeAt(i);
    //   }
  
    //   return new Blob([ia], {type:mimeString});
    // }

    // var blob = dataURItoBlob(payload.file);

    let { data: childAccountData } = await childAccountApi.loadChildAccounts({
      file: payload.file,
      child_id: payload.gabb_id,
      type_code: 'img',
      token: rootState.auth.authToken,
    });
  },

  // INTIAL CHILD ACCOUNTS
  setChildAccounts({ commit }, payload) {
    commit("setChildAccounts", payload);
  },

  // CREATE A NEW CHILD ACCOUNT
  async saveChildAccountData({ rootState, state, commit, dispatch }, payload) {
    var accountDevice = state.savedChildAccount;
    var accountName = state.savedChildAccount.name;
    var currentDate = new Date();
    var redirect = false;

    var newAccount = {};
    if(payload) {
      if(payload.account) {
        if(state.savedChildAccount.image) {
          newAccount.accountImage = state.savedChildAccount.image;
          dispatch("setChildAccountImage", state.savedChildAccount.image);
          dispatch("uploadAccountImage", state.savedChildAccount.image)
        } else {
          newAccount.accountImage = payload.account.accountImage;
        }
        if(state.savedChildAccount.name) {
          newAccount.firstName = accountName;
          newAccount.lastName = rootState.account.lastName;

          redirect = accountName;
        } else {
          newAccount.firstName = payload.account.firstName;
          accountName = [payload.account.firstName, payload.account.lastName];
          newAccount.lastName = payload.account.lastName;
        }
        newAccount.username = payload.account.username;

        if(state.savedChildAccount.age) {
          newAccount.birthDay = state.savedChildAccount.age;
        } else {
          newAccount.birthDay = payload.account.birthDay;
        }
        if(state.savedChildAccount.gender) {
          newAccount.gender = state.savedChildAccount.gender;
        } else {
          newAccount.gender = payload.account.gender;
        }
        newAccount.lines = payload.account.lines;
        newAccount.gabb_id = payload.account.gabb_id;

        let { data: updateChildAccount } = await childAccountApi.updateChildAccount({
          first_name: newAccount.firstName,
          last_name: rootState.account.lastName,
          username: payload.account.username,
          birthDay: newAccount.birthDay,
          gender: newAccount.gender,
          // imei: payload.device.esn,
          token: rootState.auth.authToken,
        });
        
        console.log(updateChildAccount);

        dispatch("updateChildAccount", newAccount);

      } else {
        newAccount.accountImage = state.savedChildAccount.image;
        newAccount.firstName = accountName;
        newAccount.lastName = rootState.account.lastName;
        newAccount.username = 'TEMP_'+accountName+rootState.account.lastName+'_'+(new Date().getTime());
        newAccount.birthDay = state.savedChildAccount.age;
        newAccount.gender = state.savedChildAccount.gender;
        newAccount.lines = [
          payload.device,
        ];
        newAccount.imei = payload.device.esn;

        console.log(newAccount);

        let { data: createdChildAccount } = await childAccountApi.createChildAccount({
          accountImage: state.savedChildAccount.image,
          first_name: accountName,
          last_name: rootState.account.lastName,
          username: 'TEMP_'+accountName+rootState.account.lastName+'_'+(new Date().getTime()),
          password: 'TEMP_PASS_'+accountName+'_'+(new Date().getTime()),
          birthDay: state.savedChildAccount.age,
          gender: state.savedChildAccount.gender,
          imei: payload.device.esn,
        });

        console.log(createdChildAccount);

        commit("addNewChildAccount", newAccount)
        redirect = accountName;
      }
    }
    console.log(newAccount);
    
    dispatch("setChildAccountName", '');
    dispatch("setChildAccountAge", '');
    dispatch("setChildAccountGender", false);
    dispatch("setChildAccountImage", false);
    dispatch("setChildAccountProgress", 'creation');
    dispatch("setChildModalVisibility", false);
    
    if(redirect) {
      router.push("/accounts/"+redirect);
    }
    
  },
  cancelAccountEdit({ dispatch }) {
    dispatch("setChildAccountName", '');
    dispatch("setChildAccountAge", '');
    dispatch("setChildAccountGender", false);
    dispatch("setChildAccountImage", false);
    dispatch("setChildAccountProgress", 'creation');
    dispatch("setChildModalVisibility", false);
  },
  
  updateChildAccount({ commit }, payload) {
    commit("updateChildAccount", payload)
  },
  setChildAccountName({ commit }, payload) {
    commit("setChildAccountName", payload);
  },
  setChildAccountAge({ commit }, payload) {
    commit("setChildAccountAge", payload);
  },
  setChildAccountGender({ commit }, payload) {
    commit("setChildAccountGender", payload);
  },
  setChildAccountImage({ commit }, payload) {
    commit("setChildAccountImage", payload);
  },
  setChildAccountProgress({ commit }, payload) {
    commit("setChildAccountProgress", payload);
  },
  clearTheState({commit}) {
    commit("resetState", startingState.defaultState);
  },    
};
