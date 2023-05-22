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

    this.calculateMatch()

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
    calculateMatch() {
      this.match = 0;
      const numberOfSearchedSkills = this.searchedSkills.length

      for (const personSkill of this.colleague.skills) {
        const requiredProficiency = this.searchedSkills.find(skill => skill.skillName === personSkill.skillName).proficiency 

        if (personSkill.proficiency < requiredProficiency)
          this.match += (personSkill.proficiency / requiredProficiency / numberOfSearchedSkills * 100)
        else {
          this.match += (1 / numberOfSearchedSkills * 100)
        }
      }
    }
  },

  watch:{
    colleague:{
      deep:true,
      handler(){
        console.log('tags changed')
        this.calculateMatch()
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
          <div class="match">
            {{ match }}% Match

          </div>

        </div>

      </template>

      <template #body>
        <!-- only the matching skills are in colleague.skills, normally this wouldn't be the case but the backend has
      been programmed to return it like this to increase performance -->
        <div v-for="skill in colleague.skills" :key="skill.skillName" class="skills-container">
          <SkillTagOnColleague class="col skill" :skillNameProp="skill.skillName" :proficiencyProp="skill.proficiency" />

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
  margin-right: 1%;
  display: inline-block;
}


.match {

  margin-left: 1%;
  display: inline-block;
}

.colleagueCard {
  margin-top: 1%;
}
</style>
