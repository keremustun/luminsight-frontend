<script>
import PersonalInfoCard from '../components/PersonalInfoCard.vue'


export default {
  inject: ['loggedInPerson', 'personService'],

  mounted() {
    this.profileOf = this.$route.query.profileOf
    this.refreshPersonalInfo(this.profileOf)
  },

  data() {
    return {
      route: '',
      personalInfo: {},
      profileOf: '',
      fieldsArray: this.loggedInPerson.personalInfo,
      unsavedChanges: false,
    }
  },

  computed: {
    isMyProfile() {
      return this.loggedInPerson.email === this.profileOf
    }
  },

  methods: {
    updateChildData(updatedData, index) {
      this.fieldsArray[`${index}`] = updatedData
      this.saveChanges()
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
          this.personalInfo =  { ...response.data }
          this.unsavedChanges = false
        })
    },

  },
  watch: {
    $route(to, from) {
      console.log('checking')
      // Check if the query parameter 'profileOf' has changed
      if (to.query.profileOf !== from.query.profileOf) {
        console.log('checkaing')
        // Fetch the updated personal info based on the new query parameter
        this.refreshPersonalInfo(to.query.profileOf);
      }
    }
  },

  components: { PersonalInfoCard }

}
</script>

<template>
  <main>
    <div class="header">
      <div v-if="profileOf === this.loggedInPerson.email">
        <div class="row align-items-center">

          <h4 class="col-8 myProfileHeader">My Profile</h4>
          <!-- <h6 class="col-2 myProfileHeader unsaved-changes-text">{{ unsavedChanges ? "Unsaved Changes" : "Up to date" }}
          </h6> -->
          <button class="col-2 btn btn-warning" v-if="unsavedChanges" @click="saveChanges()">Save Changes</button>

        </div>

      </div>
      <div v-else>
        <div class="row align-items-center">

          <h4 class="col-8 myProfileHeader">Colleague</h4>

        </div>
      </div>
    </div>

    <!-- <PersonalInfoCard class="personalInfoField" v-for="(fieldValue, fieldName) in personalInfo" :fieldValue="fieldValue"
      :fieldName="fieldName" :key="fieldName" :isMyProfileProp="isMyProfile" @updateData="updateChildData" /> -->

    <div class="">
      <PersonalInfoCard v-if="personalInfo.firstName" class="personalInfoField firstName"
        :fieldValue="personalInfo.firstName" :fieldName="'firstName'" :fieldNameDisplay="'First Name'" :key="'firstName'"
        :isMyProfileProp="isMyProfile" @updateData="updateChildData" />

      <PersonalInfoCard v-if="personalInfo.lastName" class="personalInfoField lastName"
        :fieldValue="personalInfo.lastName" :fieldName="'lastName'" :fieldNameDisplay="'Last Name'" :key="'lastName'"
        :isMyProfileProp="isMyProfile" @updateData="updateChildData" />
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

.firstName,
.lastName {}

.header {
  margin-top: 1%;
  margin-bottom: 1%;
}

.myProfileHeader {
  display: inline-block;
}
</style>
