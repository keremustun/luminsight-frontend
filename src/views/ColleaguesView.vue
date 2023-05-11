<script>
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

  watch: {
    tags: {
      deep: true,
      handler() {
        // Call the notifyParent method when any changes occur in the data object

        const searchSkillsFilter = {
          skillsToSearchFor: this.tags,
          availableDaysPerWeek: this.availableDaysPerWeekSelected,
          branches: this.branchesChosen
        }

        this.personService.findPersonsWithSkills(searchSkillsFilter)
          .then(response => {
            this.filteredPersons = response.data
          })
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

    removeTag(tag) {
      const index = this.tags.indexOf(tag);
      if (index !== -1) {
        this.tags.splice(index, 1);
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>Colleagues!</h1>
    <div>
      <h2>Find skills in Luminis</h2>
    </div>
  </div>

  <main>
    <div>
      <div class="tags">
        <div v-for="tag in tags" :key="tag.skillName" class="tag">
          <span>
            {{ tag.skillName }}
            <span class="tag-close" @click="removeTag(tag)">&times;</span>
          </span>
        </div>

        <input type="text" class="form-control" v-model="searchText" @input="filterSkills" @keydown.enter="addTag"
          placeholder="Search skills..." />
      </div>
      <ul class="dropdown-menu" v-if="showDropdown">
        <li v-for="skill in filteredSkills" :key="skill" @click="addTag(skill)">
          {{ skill }}
        </li>
      </ul>
    </div>

    <div v-for="person in filteredPersons" :key="person.id" class="person">
      
      {{ person.email }}
    </div>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}

.dropdown-menu {
  display: block;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  display: inline-block;
  padding: 5px 10px;
  background-color: #ccc;
  border-radius: 3px;
}

.tag-close {
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
}

.person{
  background-color: lightgray;
  margin-top: 1rem;
  border: 0.05rem solid black;
  border-radius: 0.25rem;
}
</style>
