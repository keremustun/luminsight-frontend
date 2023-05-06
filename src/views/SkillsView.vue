<script setup>
import SkillCard from '../components/SkillCard.vue'
import { PersonService } from '../services/PersonService';
import { reactive } from 'vue';
</script>

<script>

export default {
  inject: ['loggedInPerson', 'personService'],

  mounted() {
    this.refreshSkills()
  },

  data() {
    return {
      skills: [],
      editingSkill: {},
      modalOpened: false
    }
  },

  computed: {
    skillsComputed() {
      return this.skills
    }
  },

  methods: {
    openModal() {
      this.modalOpened = !this.modalOpened
    },

    toggleModal() {
      this.$emit('modal-toggled', this.modalOpened)
    },

    refreshSkills() {
      this.personService.getPersonsSkills(this.loggedInPerson.email)
        .then(response => {
          this.skills = response.data
        })
    }
  },

}
</script>

<template>
  <div>
    <h1>This is a Skills page, modal = {{ modalOpened }}</h1>
  </div>

  <main>
    <SkillCard v-for="skill in skillsComputed" :key="skill.skillName" :skillName='skill.skillName'
      :stars='skill.proficiency' @skills-updated="refreshSkills()">


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
