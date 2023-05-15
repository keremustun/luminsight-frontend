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
  <div id="app" >

    <SSOHandler ref="SSOHandler" @signedIn="handleSignin" />


    <div class="welcome" v-if="!this.account" >
      <div class="luminis-logo-container">
        <a href=""><img class="luminis-logo"
            src="https://www.luminis.eu/wp-content/themes/luminis-2020/library/images/logo.svg" alt="Logo" /></a>

      </div>
      <h1>Welcome to Luminsight</h1>
      <h2>Please sign in with your company email</h2>
      <button style="background: linear-gradient(150deg, rgba(255, 166, 0, 0.171), rgba(54, 252, 255, 0.232) ,rgba(30, 0, 255, 0.204));" class="btn btn-warning sign-in" @click="this.$refs.SSOHandler.SignIn()">
        Sign in
      </button>
    </div>

    <div v-else class="container-fluid">
      <div class="row">
        <div class="col">
          <header>
            <nav class="navbar navbar-expand-lg bg-body-tertiary" >
              <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
              </button>

              <RouterLink class="nav-link" to="/"> <img
                  src="https://www.luminis.eu/wp-content/themes/luminis-2020/library/images/logo.svg" alt="Logo"
                  width="80" height="24" class="d-inline-block align-text-top" /></RouterLink>

              <div class="row collapse navbar-collapse h-100" id="navbarNav">
                <ul class="navbar-nav">

                  <li class="col nav-item">
                    <RouterLink class="nav-link" to="/profile">Profile</RouterLink>
                  </li>
                  <li class="col nav-item">
                    <RouterLink class="nav-link" to="/skills">Skills</RouterLink>
                  </li>
                  <li class="col nav-item">
                    <RouterLink class="nav-link" to="/colleagues">Colleagues</RouterLink>
                  </li>
                  <li class="col nav-item">
                    <RouterLink class="nav-link" to="/resumes">Resumes</RouterLink>
                  </li>
                  <div class="col-6">

                  </div>

                  <div  @click="this.$refs.SSOHandler.SignOut()" class="navbar-nav sign-out">
                    <img src="./assets/sign-out.svg" alt="Sign Out Image" class="sign-out-img">
                    <button class="nav-link sign-out-text">
                      Sign out
                    </button>
                  </div>
                </ul>

              </div>
            </nav>
          </header>
        </div>
      </div>

      <div class="row router-view">
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

.navbar-nav {
  text-align: center;

}

.nav-link {
  height: fit-content;
  margin: 1%;
  color: black;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-weight: 600;
}

.nav-link:active {
  color: orange
}

.welcome {
  margin-top: 5%;
  padding: 5%;
  text-align: center;
}

.sign-in {
  border: 0;
  margin-top: 2%;
  padding: 2.5% 5%;
  background-color: orange;
  border-radius: 0;
  font-weight: 700;
  color:rgb(64, 75, 81);
  transition: box-shadow 0.5s ease;
  box-shadow: 0 0 20px 5px rgba(0, 200, 255, 0.219);
}

.sign-in:hover {
  box-shadow: 0 0 20px 5px rgba(255, 174, 0, 0.735);
  color:rgb(64, 75, 81);
}

.sign-out {
  cursor: pointer;
  color: black;
}

.sign-out-img {
  display: inline
}

.luminis-logo-container {
  text-align: center;
  margin-bottom: 10%;
}

.luminis-logo {
  width: 20%;
}

.navbar-nav {
  display: flex;
  align-items: center;
}

.sign-out {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.sign-out-img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.sign-out-text {
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  color: black;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-weight: 600;
}

#app{
  height:200%;
}

.router-view{
  
  margin-left: 1%;
  margin-right: 1%;
}
</style>
