<script>
export default {
  inject: ['loggedInPerson', 'personService'],

  mounted() {
    this.refreshPersonalInfo()
  },

  data() {
    return {
      personalInfo: this.loggedInPerson.personalInfo,
      jobTitle: {
        content: '',
        clicked: false
      },
      availability: 5,
      branch: {
        content: '',
        clicked: false
      },
      biography: {
        content: '',
        clicked: false
      },
      
      education: [

      ],
      experiences: [
      
      ],
      languages: [
        {
          content: '',
          clicked: false
        },
      ],
      hobbies: [
        {
          content: '',
          clicked: false
        },
      ]
    }
  },
  
  data() {
    return {
      personalInfo: [],
      modalOpened: false
    }
  },

  computed: {
    personalInfoComputed() {
      return this.personalInfo
    }
  },

  methods: {
    toggleModal() {
      this.modalOpened = !this.modalOpened
    },

    refreshPersonalInfo() {
      console.log(this.loggedInPerson)
      this.personService.getPersonsPersonalInfo(this.loggedInPerson.email)
        .then(response => {
          this.personalInfo = response.data
        })
    },
    

    personalInfoUpdated(){
      this.refreshPersonalInfo()
    }
  },

}
</script>

<template>
  <div>
    <h1>My Profile</h1>
  </div>

  <main>
    <button v-if="!editing">Edit</button>
    <div v-else>
      <PersonalInfoModal/>
    </div>
    
    <div v-for="field in this.loggedInPerson.personalInfo">
      <p>{{ field.content }}</p>
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
</style>
