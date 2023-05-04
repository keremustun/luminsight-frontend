<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { PersonService } from "./services/PersonService.js";
</script>

<script>
export default {
  created() {
  },

  data() {
    return {
      loggedInPerson: {},
      personService: new PersonService(),
    }

  },

  computed: {
    loggedIn() {
      return  JSON.stringify(this.loggedInPerson) !== '{}'
    }
  },

  methods: {
    performSSOLogin() {
      this.personService.getPerson('kerem.ustun@luminis.eu').then(response => this.loggedInPerson = response.data)
    }
  },

  provide() {
    return {
      loggedInPerson: computed(() => this.loggedInPerson),
      personService: this.personService
    }
  }

}
</script>

<template>
  <div v-if="!loggedIn">
    <h1>Welcome to Luminsight</h1>
    <h2>Please click on login to login with your company email</h2>
    <button @click="performSSOLogin">Login</button>
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
