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
      console.log(this.loggedInPerson)
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
  <div class="title">
    <h4>My Skills</h4>
  </div>

  <main>
    <div>
      <button class="btn btn-primary add-skill" @click="toggleModal()">Add skill</button>

      <div class="search-skill">
        <input type="text" class="form-control" v-model="searchText" @input="filterSkills" @keydown.enter="addTag"
          placeholder="Search skills..." />
      </div>

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

    <SkillCard class="skill-card" v-for="skill in skillsComputed" :key="skill.skillName" :skillName='skill.skillName'
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

.title{
  margin-top:2%
}

.add-skill{
  margin-top: 2%;
  margin-bottom: 2%;
}

.search-skill{
  margin-bottom:2%;
  border-radius: 11%;
}

.skill-card{
  display: inline-block;
  margin-right: 5%;
  margin-bottom: 2%;
  width:15%;
}
</style>
