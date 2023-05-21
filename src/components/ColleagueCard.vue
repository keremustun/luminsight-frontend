<script>
import GenericCard from './GenericCard.vue';
import SkillTagOnColleague from './SkillTagOnColleague.vue';

export default {
  props: {
    colleague: {
      default: {
        matchingSkills: [
          {
            skillName:"Skill Name",
            proficiency:5
          },
          {
            skillName:"Skill Name",
            proficiency:4
          }
        ]
      }
    },
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
        <SkillTagOnColleague class="col-4 skill" :skillNameProp="skill.skillName" :proficiencyProp="skill.proficiency" />

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

.skills-container{
  margin-right: 1%;
  display: inline-block;
}

.skill{
  
  background: linear-gradient(60deg,rgba(255, 161, 10, 0.385),rgba(0, 208, 255, 0.534));
}

.match {

  margin-left: 1%;
  display: inline-block;
}

.colleagueCard {
  margin-top: 1%;
}


</style>
