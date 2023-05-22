<script>
import SkillTag from '../components/SkillTag.vue'
import ColleagueCard from '../components/ColleagueCard.vue'

export default {
  inject: ['personService'],
  data() {
    return {
      searchText: '',
      dropdownSkills: ['JavaScript', 'HTML', 'CSS', 'Vue.js', 'React', 'Angular'],
      showDropdown: false,

      tags: [],
      availableDaysPerWeekSelected: 0,
      branchesSelected: [],
      filteredPersons: []
    };
  },

  computed: {
    filteredSkills() {
      return this.dropdownSkills.filter((skill) =>
        skill.toLowerCase().startsWith(this.searchText.toLowerCase())
      );
    },
  },



  beforeMount() {
    this.tags = this.$store.state.colleaguesPage.tags,
      this.searchText = this.$store.state.colleaguesPage.searchText
    this.dropdownSkills = this.$store.state.colleaguesPage.dropdownSkills,
      this.showDropdown = this.$store.state.colleaguesPage.showDropdown,
      this.availableDaysPerWeekSelected = this.$store.state.colleaguesPage.availableDaysPerWeekSelected,
      this.branchesSelected = this.$store.state.colleaguesPage.branchesSelected,
      this.filteredPersons = this.$store.state.colleaguesPage.filteredPersons
  },

  beforeUnmount() {
    this.$store.state.colleaguesPage.tags = this.tags;
    this.$store.state.colleaguesPage.searchText = this.searchText;
    this.$store.state.colleaguesPage.dropdownSkills = this.dropdownSkills;
    this.$store.state.colleaguesPage.showDropdown = this.showDropdown;
    this.$store.state.colleaguesPage.availableDaysPerWeekSelected = this.availableDaysPerWeekSelected;
    this.$store.state.colleaguesPage.branchesSelected = this.branchesSelected;
    this.$store.state.colleaguesPage.filteredPersons = this.filteredPersons;
  },

  watch: {
    tags: {
      deep: true,
      handler() {
        // Call the notifyParent method when any changes occur in the data object
        if (Object.keys(this.tags).length > 0) {
          const searchSkillsFilter = {
            skillsToSearchFor: this.tags,
            availableDaysPerWeek: this.availableDaysPerWeekSelected,
            branches: this.branchesChosen
          }

          this.personService.findPersonsWithSkills(searchSkillsFilter)
            .then(response => {
              this.filteredPersons = response.data
            })
        } else {
          this.filteredPersons = []
        }

      }
    }
  },
  methods: {
    filterSkills() {
      this.showDropdown = this.searchText.length > 0;
    },

    selectSkill(skill) {
      this.searchText = skill;
      this.showDropdown = false;
    },

    addTag(tag) {
      let skill = {}

      if (typeof (tag) === 'object') {
        skill = {
          skillName: this.searchText,
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
      this.searchText = '';
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

      <div>
        <input type="text" class="form-control" v-model="searchText" @input="filterSkills" @keydown.enter="addTag"
          placeholder="Search skills..." />
      </div>

      <div>
        <ul class="dropdown-menu" v-if="showDropdown">
          <li v-for="skill in filteredSkills" :key="skill" @click="addTag(skill)">
            {{ skill }}
          </li>
        </ul>
      </div>
    </div>

    <ColleagueCard @click="visitProfile(person.email)" class="colleague" v-for="person in filteredPersons"
      :key="person.email" :colleague="person" />
  </main>
</template>

<style>
.search{
  
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
  margin-right: 1% ;
}

</style>
