<script>
import HomeTaskCardVue from '../components/HomeTaskCard.vue'
import PersonalInfoCard from '../components/PersonalInfoCard.vue'


export default {
  inject: ['loggedInPerson', 'personService'],

  mounted() {
    this.profileOf = this.$route.query.profileOf
    this.refreshPersonalInfo(this.profileOf)
  },

  data() {
    return {
      personalInfo:{},
      profileOf: '',
      fieldsArray: this.loggedInPerson.personalInfo,
      unsavedChanges: false,
    }
  },

  methods: {
    updateChildData(updatedData, index) {
      this.fieldsArray[`${index}`] = updatedData
      this.unsavedChanges = HomeTaskCardVue
    },

    saveChanges() {
      this.personService.updatePersonalInfo(this.profileOf, this.fieldsArray)
        .then(response => {
          this.refreshPersonalInfo(this.profileOf)
        })
    },

    refreshPersonalInfo(email) {
      this.personService.getPersonalInfo(email)
        .then(response => {
          this.personalInfo = response.data
          this.unsavedChanges = false
        })
    },


  },

  components: { PersonalInfoCard }

}
</script>

<template>
  <main>
    <div v-if="profileOf === this.loggedInPerson.email">
      <div class="row align-items-center">

        <h4 class="col-8 myProfileHeader">My Profile</h4>
        <h6 class="col-2 myProfileHeader unsaved-changes-text">{{ unsavedChanges ? "Unsaved Changes" : "Up to date" }}
        </h6>
        <button class="col-2 btn btn-warning" v-if="unsavedChanges" @click="saveChanges()">Save Changes</button>

      </div>

    </div>
    <div v-else>
      <div class="row align-items-center">

        <h4 class="col-8 myProfileHeader">Colleague</h4>

      </div>
    </div>
      <PersonalInfoCard v-for="(fieldValue, fieldName) in personalInfo" :fieldValue="fieldValue"
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

.myProfileHeader {
  display: inline-block;
}

.personalInfoField {
  border: 0.05rem solid black;
  margin-top: 1rem;
}
</style>
