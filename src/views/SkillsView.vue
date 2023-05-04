<script setup>
import GenericModal from '../components/GenericModal.vue'
import SkillCard from '../components/SkillCard.vue'
import { PersonService } from '../services/PersonService';
</script>

<script>

export default {
  inject: ['loggedInPerson','personService'],
  
  mounted(){
    this.skills = this.personService.getPersonsSkills(this.loggedInPerson.email)
  },

  methods: {
    logCatFacts() {
      console.log(this.facts);
    }
  },
  data() {
    return {
      skills: [],
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
    <SkillCard v-for="skill in skills" :header='skill.skillName' :stars='skill.proficiency'>

    </SkillCard>

    <button @click="modalOpened = !modalOpened">trigger</button>


    <GenericModal v-if="modalOpened" id="add-skill" saveButtonText="Save" closeButtonText="Lol" :open="modalOpened"
      @close="modalOpened = false">
      <template #title>
        <h1>Titeltekst</h1>
      </template>

      <template #body>
        <p>Dit is de bio van Kerem.</p>

        <button @click="logCatFacts()">catFacts</button>
      </template>
    </GenericModal>
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
