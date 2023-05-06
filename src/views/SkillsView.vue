<script setup>
import SkillCard from '../components/SkillCard.vue'
import { PersonService } from '../services/PersonService';
</script>

<script>

export default {
  inject: ['loggedInPerson','personService'],
  
  mounted(){
    this.personService.getPersonsSkills(this.loggedInPerson.email).then(response => this.skills = response.data)
  },

  data() {
    return {
      skills: [],
      editingSkill:{},
      modalOpened: false
    }
  },

  computed:{
    skillsComputed(){
      console.log(this.skills)
      return this.skills
    }
  },

  methods:{
    openModal(){
        this.modalOpened = !this.modalOpened
    },
    
    toggleModal() {
      console.log('togglw')
      this.$emit('modal-toggled',this.modalOpened)
    },
  },

}
</script>

<template>
  <div>
    <h1>This is a Skills page, modal = {{ modalOpened }}</h1>
  </div>

  <main>
    <SkillCard v-for="skill in skillsComputed"
    :key="skill.skillName"
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
