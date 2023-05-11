<script>
import SkillTag from '../components/SkillTag.vue'
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
        console.log(this.tags)
        this.personService.findPersonsWithSkills(searchSkillsFilter)
          .then(response => {
            this.filteredPersons = response.data
            console.log(this.filteredPersons)
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
    }

  },

  components: { SkillTag }
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
  padding: 0.5rem;
  width: 25%;
  margin-bottom: 1rem;
  background-color: #ccc;
  border-radius: 3px;
}


.person {
  background-color: lightgray;
  margin-top: 1rem;
  border: 0.05rem solid black;
  border-radius: 0.25rem;
}
</style>
