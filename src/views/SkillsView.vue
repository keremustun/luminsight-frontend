<script setup>
import AddSkillModal from '../components/AddSkillModal.vue'
</script>

<script>

export default {
  inject: ['skillsService'],
  created() {
    this.skillsService.fetchCatFacts()
      .then(facts => {
        this.facts = facts
      });
  },
  methods: {
    logCatFacts() {
      console.log(this.facts);
    }
  },
  data() {
    return {
      facts: [],
      modalOpened: false,
    }
  },
  computed: {}
}
</script>

<template>
  <div class="about">
    <h1>This is a Skills page, modal = {{ modalOpened }}</h1>
  </div>

  <main>
    <p v-for="f in facts">{{ f.text }}</p>
    <!-- Button trigger modal -->

    <!-- Modal -->
    <button @click="modalOpened = !modalOpened">trigger</button>
    
    <AddSkillModal v-if="modalOpened" id="add-skill" saveButtonText="Save" closeButtonText="Lol" :open="modalOpened" @close="modalOpened = false">
      <template #title>
        <h1>Titeltekst</h1>
      </template>

      <template #body>
        <p>Dit is de bio van Kerem.</p>

        <button @click="logCatFacts()">catFacts</button>
      </template>
    </AddSkillModal>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}
</style>
