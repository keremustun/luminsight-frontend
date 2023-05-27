<script>
import SkillTag from '../components/SkillTag.vue'
import ColleagueCard from '../components/ColleagueCard.vue'
import FilterCategories from '../components/FilterCategories.vue'

export default {
  inject: ['personService'],
  data() {
    return {
      searchTextPerson: '',

      searchTextSkill: '',
      dropdownSkills: [],
      showDropdown: false,
      tags: [],


      expandedCategories: [],
      filteredPersons: [],

      sortOn: 'Skill Proficiency (High to Low)',
      sortingOptions: ['Skill Proficiency (High to Low)', 'Skill Proficiency (Low to High)', 'Colleague name (A-Z)', 'Colleague name (Z-A)'],
      sortClicked: false
    };
  },

  computed: {
    suggestedSkills() {
      return this.dropdownSkills.filter((skill) =>
        skill.toLowerCase().startsWith(this.searchTextSkill.toLowerCase())
      );
    },
    filteredPersonsComputed() {
      return this.filteredPersons;
    }
  },



  mounted() {
    this.tags = this.$store.state.colleaguesPage.tags
    this.searchTextSkill = this.$store.state.colleaguesPage.searchTextSkill
    this.dropdownSkills = this.$store.state.colleaguesPage.dropdownSkills
    this.showDropdown = this.$store.state.colleaguesPage.showDropdown
    this.$refs.filtersComponent.branches = this.$store.state.colleaguesPage.branches 
    this.$refs.filtersComponent.minimalAvailableDays = this.$store.state.colleaguesPage.minimalAvailableDays 
  },

  beforeUnmount() {
    this.$store.state.colleaguesPage.tags = this.tags;
    this.$store.state.colleaguesPage.searchTextSkill = this.searchTextSkill;
    this.$store.state.colleaguesPage.dropdownSkills = this.dropdownSkills;
    this.$store.state.colleaguesPage.showDropdown = this.showDropdown;
    this.$store.state.colleaguesPage.branches = this.$refs.filtersComponent.branches;
    this.$store.state.colleaguesPage.minimalAvailableDays = this.$refs.filtersComponent.minimalAvailableDays;
    
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
    toggleCategory(category) {
      if (this.isCategoryExpanded(category)) {
        // Category is expanded, collapse it
        const index = this.expandedCategories.indexOf(category);
        if (index !== -1) {
          this.expandedCategories.splice(index, 1);
        }
      } else {
        // Category is collapsed, expand it
        this.expandedCategories.push(category);
      }
    },
    isCategoryExpanded(category) {
      return this.expandedCategories.includes(category);
    },

    updateResults() {
      if (true) {
        const searchSkillsFilter = {
          personSearchText: this.searchTextPerson,
          skillsToSearchFor: this.tags,
          branches: this.$refs.filtersComponent.branches,
          minimalAvailableDays: this.$refs.filtersComponent.minimalAvailableDays,
        }

        this.personService.findPersonsWithSkills(searchSkillsFilter)
          .then(response => {
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

      if (this.sortOn === 'Skill Proficiency (High to Low)') {
        this.filteredPersons.sort((personA, personB) => personB.weight - personA.weight);
      } else if (this.sortOn === 'Skill Proficiency (Low to High)') {
        this.filteredPersons.sort((personA, personB) => personA.weight - personB.weight);
      } else if (this.sortOn === 'Colleague name (A-Z)') {
        this.filteredPersons.sort((personA, personB) => personA.personalInfo.firstName.localeCompare(personB.personalInfo.firstName));
      } else if (this.sortOn === 'Colleague name (Z-A)') {
        this.filteredPersons.sort((personA, personB) => personB.personalInfo.firstName.localeCompare(personA.personalInfo.firstName));
      }
    },

    searchPerson() {
      this.updateResults()
    },

    highlightMatchedText(firstName, lastName) {
      if (!this.searchTextPerson) {
        return `${firstName} ${lastName}`;
      }

      const regex = new RegExp(`\\b${this.searchTextPerson}`, 'gi');
      const highlightedFirstName = firstName.replace(regex, '<span class="highlighted">$&</span>');
      const highlightedLastName = lastName.replace(regex, '<span class="highlighted">$&</span>');

      return `${highlightedFirstName} ${highlightedLastName}`;
    },

    setSort(sortOption) {
      this.sortOn = sortOption;
      this.sortClicked = false;
      this.sortColleagues()
    }
  },

  components: { SkillTag, ColleagueCard, FilterCategories }
};
</script>



























<template>
  <div>
    <h4 class="title">Colleagues</h4>
    <p class="description">Just enter a skill and find colleagues that have this skill!</p>

  </div>
  <hr>

  <main>
    <div class="row">
      <div class="col-2 filter-menu">

        <div>
          <FilterCategories ref="filtersComponent" @filtersUpdated="updateResults()" />
        </div>

        <div class="col skills-input">
          <input type="text" class="form-control" v-model="searchTextSkill" @input="suggestSkills" @keydown.enter="addTag"
            placeholder="Filter on skills..." />
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

        <div class="tags">
          <SkillTag class="tag" v-for="(tag, index) in tags" :skillNameProp="tag.skillName" :proficiencyProp="0"
            :indexProp="index" :key="tag.skillName" @removeTag="removeTag" @tagChanged="updateTags">
          </SkillTag>
        </div>

      </div>


      <div class="col">
        <div class="search">
          <div class="row">
            <div class="col">
              <input type="text" class="form-control" v-model="searchTextPerson" @input="searchPerson"
                placeholder="Search people..." />
            </div>
            <div class="col ">
              <div class="dropdown-container">
                <button class="btn dropdown-toggle dropdown" @click="this.sortClicked = !this.sortClicked">
                  {{ sortOn }}
                </button>
                <div class="dropdown-menu" v-if="sortClicked">
                  <div v-for="sortOption in sortingOptions" class="dropdown-item" @click="setSort(sortOption)">{{
                    sortOption }}</div>
                </div>
              </div>
            </div>

          </div>
        </div>


        <ColleagueCard @click="visitProfile(person.email)" class="colleague" v-for="person in filteredPersonsComputed"
          :searchedSkills="tags" :key="person.email" :colleague="person" @matchChanged="changeFilteredPersonsOrder()">

          <template #header>
            <div class="title">
              <div class="name"
                v-html="highlightMatchedText(person.personalInfo.firstName, person.personalInfo.lastName)">

              </div>

            </div>
          </template>
        </ColleagueCard>
      </div>

    </div>


  </main>
</template>






















<style>
.filter-menu {
  background-color: rgba(0, 0, 0, 0.037);
  min-height: 100vh;

}

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

.dropdown-container {
  float: right;
}

.dropdown-menu {
  display: block;
}

.dropdown-item {
  cursor: pointer;
  transition-duration: 0.2s;
}

.dropdown-item:active {
  background: rgb(128, 0, 128);
}

.tags {
  display: flex;
  flex-wrap: wrap;

}

.tag {
  display: inline-block;
  background: linear-gradient(60deg, rgba(10, 255, 247, 0.385), rgba(119, 0, 255, 0.342));
  border: 1px solid black;
  border-radius: 3px;
  width: 10rem;
  margin-right: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.suggestedSkill {
  padding: 5%;
  cursor: pointer;
}

.suggestedSkill:hover {
  background: linear-gradient(90deg, rgba(255, 170, 0, 0.22), rgba(0, 238, 255, 0.098), rgba(140, 0, 255, 0.018));
  font-weight: 600;
}


.highlighted {
  background-color: yellow;
}

.dropdown {
  min-width: 15rem;
  background-color: purple;
  color: white;
  border: none;
}

.dropdown:hover {
  background-color: purple;
  color: white;
  box-shadow: 0rem 0rem 1rem purple;
}

.skills-input {
  margin-top: 1rem;
}
</style>
