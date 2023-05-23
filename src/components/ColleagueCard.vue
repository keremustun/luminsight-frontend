<script>
import GenericCard from './GenericCard.vue';
import SkillTagOnColleague from './SkillTagOnColleague.vue';

export default {
  props: {
    searchedSkills: {
      default: [
        {
          skillName: "C#",
          proficiency: 3
        },
        {
          skillName: "JS",
          proficiency: 4
        }
      ]
    },
    colleague: {
      default: {
      }
    },
  },

  mounted() {

  },

  data() {
    return {
      match: 0,
      cardStyle: {
        background: 'transparent',
        border: 0
      },
      headerStyle: {
        border: 0,
        background: 'transparent'
      },
      titleStyle: {

      },
      bodyStyle: {

        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.078), rgb(255, 190, 70, 0.078))'
      }
    }
  },

  methods: {

    searchedSkillInColleagueSkills(searchedSkill){
      return this.colleague.skills.find(colleagueSkill => colleagueSkill.skillName === searchedSkill.skillName) !== undefined
    },

    getColleagueSkillSkillName(searchedSkill){
      return this.colleague.skills.find(colleagueSkill => colleagueSkill.skillName === searchedSkill.skillName).skillName
    },

    getColleagueSkillProficiency(searchedSkill){
      return this.colleague.skills.find(colleagueSkill => colleagueSkill.skillName === searchedSkill.skillName).proficiency
    }
  },

  watch:{
    colleague:{
      deep:true,
      handler(){
      }
    }
  },

  components: { GenericCard, SkillTagOnColleague }
}
</script>

<template>
  <div>
    <GenericCard class="colleagueCard" :cardStyle="cardStyle" :headerStyle="headerStyle">
      <template #header>
        <div class="title">
          <div class="name">
            {{ colleague.personalInfo.firstName }} {{ colleague.personalInfo.lastName }}
          </div>

        </div>

      </template>

      <template #body>
        <!-- only the matching skills are in colleague.skills, normally this wouldn't be the case but the backend has
      been programmed to return it like this to increase performance -->
        <div v-for="searchedSkill in searchedSkills" :key="searchedSkill.skillName" class="skills-container">
          <SkillTagOnColleague v-if="searchedSkillInColleagueSkills(searchedSkill)" class="col skill" :skillNameProp="getColleagueSkillSkillName(searchedSkill)" :proficiencyProp="getColleagueSkillProficiency(searchedSkill)" />

        </div>

      </template>
    </GenericCard>
    <hr>
  </div>
</template>

<style>
.name {
  width: 90%;
  font-weight: 600;
  display: inline-block;
}

.skills-container {
  display: inline-block;
}

.skill{
  
  margin-right: 1rem;
}

.match {

  margin-left: 1%;
  display: inline-block;
}

.colleagueCard {
  margin-top: 1%;
}
</style>
