<script>
import GenericCard from './GenericCard.vue';
import SkillTagOnColleague from './SkillTagOnColleague.vue';

export default {
  props: {
    colleague: {
      default: {}
    }
  },
  data() {
    return {

    }
  },


  components: { GenericCard, SkillTagOnColleague }
}
</script>

<template>
  <GenericCard class="colleagueCard">
    <template #title>
      {{ colleague.personalInfo.firstName }} {{ colleague.personalInfo.lastName }}
      {{ '66% match ' }}
    </template>

    <template #body>
      <div class="row col-container">
        <SkillTagOnColleague class="col" :skillNameProp="'C#'" :proficiencyProp="5" />
        <SkillTagOnColleague class="col" :skillNameProp="'JS'" :proficiencyProp="4" />
        <SkillTagOnColleague class="col" :skillNameProp="'JS'" :proficiencyProp="4" />
        <SkillTagOnColleague class="col" :skillNameProp="'JS'" :proficiencyProp="4" />
        <SkillTagOnColleague class="col" :skillNameProp="'JS'" :proficiencyProp="4" />
        <SkillTagOnColleague class="col" :skillNameProp="'JS'" :proficiencyProp="4" />

      </div>

    </template>
  </GenericCard>
</template>

<style>
.colleagueCard {
  margin-top: 1%;
}

.col-container {
  display: flex;
  flex-wrap: wrap;
}

.col {
  width: 25%; /* Each column occupies 25% of the container */
  /* Additional styling for the columns */
}
</style>
