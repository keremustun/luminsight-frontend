<script>
import PersonalInfoCard from '../components/PersonalInfoCard.vue'


export default {
  inject: ['loggedInPerson', 'personService'],

  mounted() {
    this.refreshPersonalInfo()
  },

  data() {
    return {

      fieldsArray: this.loggedInPerson.personalInfo,
      unsavedChanges: false

    }
  },


  methods: {

    updateChildData(updatedData, index) {
      this.fieldsArray[`${index}`] = updatedData
      this.unsavedChanges = true
      console.log(this.unsavedChanges)
    },

    saveChanges() {
      this.personService.updatePersonalInfo(this.loggedInPerson.email, this.fieldsArray)
        .then(response => {
          this.refreshPersonalInfo()
        })
    },

    refreshPersonalInfo() {
      this.personService.getPersonalInfo(this.loggedInPerson.email)
        .then(response => {
          this.personalInfo = response.data
          this.unsavedChanges = false
        })
    },


    personalInfoUpdated() {
      this.refreshPersonalInfo()
    }
  },

  components: { PersonalInfoCard }

}
</script>

<template>
  <div>
    <h1>My Profile</h1>
  </div>

  <main>
    <p>{{ unsavedChanges ? "Unsaved Changes" : "Up to date" }}</p>
    <button @click="saveChanges()">Save Changes</button>
    <PersonalInfoCard v-for="(fieldValue, fieldName) in this.loggedInPerson.personalInfo" :fieldValue="fieldValue"
      :fieldName="fieldName" :key="fieldName" @updateData="updateChildData" />

  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}

.personalInfoField {
  border: 0.05rem solid black;
  margin-top: 1rem;
}
</style>
