<script>
import SkillTag from '../components/SkillTag.vue'
import ColleagueCard from '../components/ColleagueCard.vue'

export default {
  inject: ['personService'],
  data() {
    return {
      searchTextSkill: '',
      searchTextPerson: '',
      dropdownSkills: [],
      showDropdown: false,

      tags: [],
      availableDaysPerWeekSelected: 0,
      branchesSelected: [],
      filteredPersons: []
    };
  },

  computed: {
    suggestedSkills() {
      return this.dropdownSkills.filter((skill) =>
        skill.toLowerCase().startsWith(this.searchTextSkill.toLowerCase())
      );
    },
  },



  beforeMount() {
    this.tags = this.$store.state.colleaguesPage.tags,
      this.searchTextSkill = this.$store.state.colleaguesPage.searchTextSkill
    this.dropdownSkills = this.$store.state.colleaguesPage.dropdownSkills,
      this.showDropdown = this.$store.state.colleaguesPage.showDropdown,
      this.availableDaysPerWeekSelected = this.$store.state.colleaguesPage.availableDaysPerWeekSelected,
      this.branchesSelected = this.$store.state.colleaguesPage.branchesSelected
  },

  beforeUnmount() {
    this.$store.state.colleaguesPage.tags = this.tags;
    this.$store.state.colleaguesPage.searchTextSkill = this.searchTextSkill;
    this.$store.state.colleaguesPage.dropdownSkills = this.dropdownSkills;
    this.$store.state.colleaguesPage.showDropdown = this.showDroFpdown;
    this.$store.state.colleaguesPage.availableDaysPerWeekSelected = this.availableDaysPerWeekSelected;
    this.$store.state.colleaguesPage.branchesSelected = this.branchesSelected;
  },

  watch: {
    tags: {
      deep: true,
      handler() {
        // Call the notifyParent method when any changes occur in the data object
        this.updateResults()

      }
    }
  },

  methods: {
    updateResults() {
      if (Object.keys(this.tags).length > 0 || this.searchTextPerson.length > 0) {
        const searchSkillsFilter = {
          personSearchText: this.searchTextPerson,
          skillsToSearchFor: this.tags,
          availableDaysPerWeek: this.availableDaysPerWeekSelected,
          branches: this.branchesChosen
        }

        this.personService.findPersonsWithSkills(searchSkillsFilter)
          .then(response => {
            console.log('aa')
            this.filteredPersons = response.data
            this.sortColleagues()
          })
      } else {
        this.filteredPersons = []
      }
    },

    suggestSkills() {
      this.personService.getSuggestedSkill(this.searchTextSkill)
        .then(response => {
          this.dropdownSkills = response.data
          this.showDropdown = this.searchTextSkill.length > 0 && this.dropdownSkills.length > 0;

        })
    },

    selectSkill(skill) {
      this.searchTextSkill = skill;
      this.showDropdown = false;
    },

    addTag(tag) {
      let skill = {}

      if (typeof (tag) === 'object') {
        skill = {
          skillName: this.searchTextSkill,
          proficiency: 0
        }
      }

      else if (tag && !this.tags.includes(tag) && typeof (tag) === 'string') {
        skill = {
          skillName: tag,
          proficiency: 0
        }
      }

      this.tags.push(skill);
      this.searchTextSkill = '';
      this.showDropdown = false;
    },

    removeTag(skillName) {
      const index = this.tags.findIndex(tag => tag.skillName === skillName);
      if (index !== -1) {
        this.tags.splice(index, 1);
      }
    },


    updateTags(updatedTag) {
      const index = this.tags.findIndex(tag => tag.skillName === updatedTag.skillName);

      if (index !== -1) {
        this.tags.splice(index, 1, updatedTag);
      }
      console.log(this.tags)
    },

    visitProfile(email) {
      this.$router.push({ name: 'profile', query: { profileOf: email } });
    },


    sortColleagues() {
      this.filteredPersons.sort((personA, personB) => personB.weight - personA.weight);
    },

    searchPerson() {
      this.updateResults()
    }
  },

  components: { SkillTag, ColleagueCard }
};
</script>

<template>
  <div>
    <h4 class="title">Colleagues</h4>
    <p class="description">Just enter a skill and find colleagues that have this skill!</p>

  </div>

  <main>

    <div class="search">

      <div class="tags">
        <SkillTag class="tag" v-for="(tag, index) in tags" :skillNameProp="tag.skillName" :proficiencyProp="0"
          :indexProp="index" :key="tag.skillName" @removeTag="removeTag" @tagChanged="updateTags">
        </SkillTag>
      </div>

      <div class="row">
        <div class="col">
          <input type="text" class="form-control" v-model="searchTextSkill" @input="suggestSkills" @keydown.enter="addTag"
            placeholder="Search skills..." />
        </div>

        <div class="col">
          <input type="text" class="form-control" v-model="searchTextPerson" @input="searchPerson"
            placeholder="Search people..." />
        </div>

      </div>


      <div>
        <ul class="dropdown-menu" v-if="showDropdown">
          <li v-for="skill in suggestedSkills" :key="skill" @click="addTag(skill)">
            <div class="suggestedSkill">
              {{ skill }}
            </div>
          </li>
        </ul>
      </div>

    </div>

    <ColleagueCard @click="visitProfile(person.email)" class="colleague" v-for="person in filteredPersons"
      :searchedSkills="tags" :key="person.email" :colleague="person" @matchChanged="changeFilteredPersonsOrder()" />

  </main>
</template>

<style>
.search {

  margin-left: 1rem;
}

@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}

.colleague:hover {
  cursor: pointer;
  background: linear-gradient(5deg, rgba(0, 0, 0, 0.06), white);
}

.dropdown-menu {
  display: block;
}

.tags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  display: inline-block;
  margin-bottom: 1rem;
  background: linear-gradient(60deg, rgba(10, 255, 247, 0.385), rgba(119, 0, 255, 0.342));
  border: 1px solid black;
  border-radius: 3px;
  width: 10rem;
  margin-right: 1rem;
}

.suggestedSkill {
  padding: 5%;
  cursor: pointer;
}

.suggestedSkill:hover {
  background: linear-gradient(90deg, rgba(255, 170, 0, 0.22), rgba(0, 238, 255, 0.098), rgba(140, 0, 255, 0.018));
  font-weight: 600;
}
</style>
