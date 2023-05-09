<template>
  <div>


    <button v-if="!account" @click="SignIn">sign in</button>
    <button v-else @click="SignOut">sign out</button>

    <div v-if="account">{{ account.name }}</div>
  </div>
</template>

<script>
import { PublicClientApplication } from '@azure/msal-browser';

export default {
  name: 'HeaderBar',
  data() {
    return {
      account: undefined,
      signin: 'https://microsoft.com',
    };
  },

  async created() {
    this.$msalInstance = new PublicClientApplication(
      this.$store.state.msalConfig,
    );
  },

  mounted() {
    const accounts = this.$msalInstance.getAllAccounts();
    if (accounts.length == 0) {
      return;
    }
    this.account = accounts[0];
    this.$emitter.emit('login', this.account);
  },

  methods: {
    async SignIn() {
      await this.$msalInstance
        .loginPopup({})
        .then(response => {
          const token = response.accessToken;
          this.$store.commit('setAccessToken', token);
          const myAccounts = this.$msalInstance.getAllAccounts();
          this.account = myAccounts[0];
          this.$emitter.emit('login', this.account);
          console.log(this.account)
        })
        .catch(error => {
          console.error(`error during authentication: ${error}`);
        });
    },
    async SignOut() {
      await this.$msalInstance
        .logout({})
        .then(() => {
          this.$store.commit('setAccessToken', '');
          this.$emitter.emit('logout', 'logging out');
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>
