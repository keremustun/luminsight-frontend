import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      msalConfig: {
        auth: {
          clientId: 'd9c13219-6710-41c1-8d38-96690de3ae94',
          authority:
            'https://login.microsoftonline.com/c28ff674-d4ed-4d77-aa17-a4cbd7893428',
        },
        cache: {
          cacheLocation: 'localStorage',
        },
      },
      accessToken: ''
    };
  },
  mutations :{
    setAccessToken(state, token){
      state.accessToken = token;
    }
  }
});

export default store;