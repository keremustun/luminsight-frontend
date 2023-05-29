<script>
import { PublicClientApplication } from '@azure/msal-browser';
import axios from 'axios';

export default {
  data() {
    return {
      account: undefined,
    };
  },

  async created() {
    this.$msalInstance = new PublicClientApplication(
      this.$store.state.msalConfig,
    );
  },

  mounted() {
    const accounts = this.$msalInstance.getAllAccounts();
    console.log(accounts)
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
          this.$router.push('/')
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>
