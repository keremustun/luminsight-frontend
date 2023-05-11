<script >
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { PersonService } from "./services/PersonService.js";
import { mapMutations } from 'vuex';
import SSOHandler from './components/SSOHandler.vue';

import store from './store/index.js'
export default {
  async created() {
    this.$emitter.on('login', async function (account) {
      this.account = account;
      this.personService.getPerson(account.username).then(response => {
        if (response.data.email === '') {
          this.personService.createPerson(account.username).then(response => this.loggedInPerson = response.data)
        } else
        this.loggedInPerson = response.data

      })
    }.bind(this),
    ),
      this.$emitter.on('logout', () => {
        this.account = undefined;
        this.loggedInPerson = undefined;
      });
  },

  data() {
    return {
      loggedInPerson: undefined,
      account: undefined,
      personService: new PersonService()
    }
  },


  methods: {
    ...mapMutations(['setAccessToken']),
  },

  provide() {
    return {
      loggedInPerson: computed(() => this.loggedInPerson),
      personService: this.personService
    }
  },

  store,
  components: { SSOHandler },
}
</script>

<template>
  <div id="app">

    <SSOHandler />
    <div v-if="!this.account">
      <h1>Welcome to Luminsight</h1>
      <h2>Please sign in with your company email</h2>
    </div>

    <div v-else class="container-fluid">
      <div class="row">
        <div class="col">
          <header>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
              <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
              </button>
              <a class="navbar-brand" href="#">
                <img src="https://www.luminis.eu/wp-content/themes/luminis-2020/library/images/logo.svg" alt="Logo"
                  width="80" height="24" class="d-inline-block align-text-top" />
              </a>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <RouterLink to="/">Home</RouterLink>
                  </li>
                  <li class="nav-item">
                    <RouterLink to="/profile">Profile</RouterLink>
                  </li>
                  <li class="nav-item">
                    <RouterLink to="/skills">Skills</RouterLink>
                  </li>
                  <li class="nav-item">
                    <RouterLink to="/colleagues">Colleagues</RouterLink>
                  </li>
                  <li class="nav-item">
                    <RouterLink to="/resumes">Resumes</RouterLink>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
        </div>
      </div>

      <div class="row">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
