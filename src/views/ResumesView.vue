<script >
import ResumeCard from '../components/ResumeCard.vue'

export default {
  inject: ['loggedInPerson', 'personService'],

  mounted() {
    this.resumesOf = this.$route.query.resumesOf
      console.log(this.resumesOf)
    this.personService.getPerson(this.resumesOf).then(response => {
      this.person = response.data
      console.log(this.person)
    })
  },

  data() {
    return {
      person: {},
      resumesOf: '',
      resumes: [
        {
          id: 1
        }
      ]
    }
  },
  methods: {
    visitResume(id) {
      this.$router.push({ name: 'resume', query: { resumeOf: this.resumesOf, resumeId: id } });
    }
  },

  components: { ResumeCard }
}
</script>

<template>
  <h4 class="title">{{ this.loggedInPerson.email === resumesOf ? 'My Resumes' : `Resumes of ${resumesOf}` }}</h4>

  <main>
    <div>
      <button class="btn btn-add-resume">
        Add Resume
      </button>
    </div>
    <div class="resumes">

      <ResumeCard class="resume-card" :key="1" @click="visitResume(1)">
        <template #title>
          <div class="resume-card-title">
            Generated Default Resume
          </div>
        </template>
        <!-- <template #body>
          <div class="resume-card-body">
            <div>
              Skills: <span v-for="skill in person.skills">{{ skill.skillName }}, </span>
            </div>
          </div>
        </template> -->
      </ResumeCard>

      <ResumeCard class="resume-card" v-for="resume in resumes" :key="resume.id" @click="visitResume(resume.id)">
        <template #title>
          <div class="resume-card-title">
            Resume title{{ resume.title }}
          </div>
        </template>
        <template #body>
          <div class="resume-card-body">
            <div>
              Skills:
            </div>
            <div>
              Date created
            </div>
          </div>
        </template>
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
.btn-add-resume {
  margin-top: 1rem;
    background-color: orange;
}

.btn-add-resume:hover {
    color:white;
    background-color: orange;

    box-shadow: 0rem 0rem 1rem orange;
}
.resumes {
  margin-top: 1rem;
  background-color: rgba(128, 128, 128, 0.126);
  height: 85vh;
  width: 95vw;
}

.resume-card {
  border: none;
}

.resume-card:hover {
  cursor: pointer;
  background: linear-gradient(180deg, transparent, rgba(157, 0, 255, 0.266));
}

.resume-card-title {
  font-weight: 600;
}
</style>
