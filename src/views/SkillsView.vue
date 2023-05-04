<script setup>
import SkillCard from '../components/SkillCard.vue'
import { PersonService } from '../services/PersonService';
</script>

<script>

export default {
  inject: ['loggedInPerson','personService'],
  
  mounted(){
    this.skills = this.personService.getPersonsSkills(this.loggedInPerson.email)
  },

  data() {
    return {
      skills: [],
      modalOpened: false
    }
  },
}
</script>

<template>
  <div>
    <h1>This is a Skills page, modal = {{ modalOpened }}</h1>
  </div>

  <main>
    <SkillCard v-for="skill in skills"
    :skillName='skill.skillName'
    :stars='skill.proficiency'>

    </SkillCard>
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
