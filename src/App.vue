<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { PersonService } from "./services/PersonService.js";

import HeaderBar from './components/header-bar.vue';
import HelloWorld from './components/HelloWorld.vue';
import store from '@/store';
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
      return JSON.stringify(this.loggedInPerson) !== '{}'
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
  },

  store,
  components: { HeaderBar, HelloWorld },
}
</script>

<template>
  <div id="app">
    <HeaderBar />
    <HelloWorld />
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
