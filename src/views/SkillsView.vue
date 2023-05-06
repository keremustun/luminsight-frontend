<script setup>
import SkillCard from '../components/SkillCard.vue'
import ManageSkillModal from '../components/ManageSkillModal.vue'
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
    toggleModal() {
      this.modalOpened = !this.modalOpened
    },

    refreshSkills() {
      this.personService.getPersonsSkills(this.loggedInPerson.email)
        .then(response => {
          this.skills = response.data
        })
    },
    

    skillsUpdated(){
      this.refreshSkills()
    }
  },

}
</script>

<template>
  <div>
    <h1>My Skills</h1>
  </div>

  <main>
    <div>
      <button @click="toggleModal()">Add skill</button>

      <ManageSkillModal ref="manageSkillModal" v-if="modalOpened" 
        :skillNameProp="''"
        :starsProp="0"
        :open="true" 
        @close="modalOpened = false"
        @skills-updated="skillsUpdated()">

        <template #title>
          Add a Skill
        </template>

        <template #rightButton>
          <button @click="this.$refs.manageSkillModal.addSkill()" class="btn btn-warning save">Add Skill</button>
        </template>
      </ManageSkillModal>
    </div>

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
