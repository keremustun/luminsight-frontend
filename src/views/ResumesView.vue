<script >
import ResumeCard from '../components/ResumeCard.vue'

export default {
  inject: ['loggedInPerson', 'personService'],

  mounted() {
    this.resumesOf = this.$route.query.resumesOf
  },

  data() {
    return {
      resumesOf: '',
      resumes: [
        {
          id:1
        }
      ]
    }
  },
  methods: {
    visitResume(id){
      this.$router.push({ name: 'resume', query: { resumeOf:this.resumesOf, resumeId: id } });
    }
  },

  components: {ResumeCard}
}
</script>

<template>
  <h4 class="title">{{ this.loggedInPerson.email === resumesOf ? 'My Resumes' : `Resumes of ${resumesOf}` }}</h4>

  <main>
    <div>
      <button>
        Add Resume
      </button>
    </div>
    <div class="resumes">
      <ResumeCard v-for="resume in resumes" :key="resume.id" @click="visitResume(resume.id)">

      </ResumeCard>
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

.resumes {
  background-color: rgba(128, 128, 128, 0.126);
  height: 85vh;
  width: 95vw;
}
</style>
