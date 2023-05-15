<script>
import HomeTaskCard from '../components/HomeTaskCard.vue'
import ProgressBar from '../components/ProgressBar.vue'

export default {
  inject: ['loggedInPerson'],

  data() {
    return {
      profileProgress: {
        current: 0,
        total: 1
      },
      mySkillsProgress: {
        current: 0,
        total: 1
      }
    }
  },


  mounted() {
    const slider = document.querySelector('.home-tasks-slider');
    slider.addEventListener('wheel', this.handleSliderScroll, { passive: false });

    this.setProfileProgress()
    this.setMySkillsProgress()
  },

  methods: {
    setProfileProgress() {
      this.profileProgress.total = Object.keys(this.loggedInPerson.personalInfo).length
      for (const field in this.loggedInPerson.personalInfo) {
        const fieldType = typeof (this.loggedInPerson.personalInfo[field])
        const fieldValue = this.loggedInPerson.personalInfo[field]
        if (fieldType === 'string' && fieldValue !== '')
          this.profileProgress.current += 1

        if (fieldType === 'object' && fieldValue.length > 0)
          this.profileProgress.current += 1

      }
    },

    setMySkillsProgress() {
      if (this.loggedInPerson.skills.length > 0)
        this.mySkillsProgress.current += 1
    }
  },


  handleSliderScroll(event) {
    const slider = document.querySelector('.home-tasks-slider');
    const scrollAmount = event.deltaY;

    // Check if the shift key is pressed or if scrolling is horizontal
    if (!event.shiftKey && Math.abs(event.deltaX) < Math.abs(event.deltaY)) {
      event.preventDefault();

      // Calculate the scroll speed based on scroll distance
      const speed = Math.abs(scrollAmount) >= 100 ? 1.5 : 0.5;

      slider.scrollBy({
        left: scrollAmount * speed,
        behavior: 'smooth',
      });
    }
  },


  beforeUnmount() {
    const slider = document.querySelector('.home-tasks-slider');
    slider.removeEventListener('wheel', this.handleSliderScroll);
  },
  components: { HomeTaskCard, ProgressBar },
}
</script>

<template>
  <main>
    <div class="welcome-msg">
      <h2>Welcome {{ loggedInPerson.personalInfo.firstName }}!</h2>
    </div>

    <div class="row home-tasks">
      <div class="col home-tasks-slider">
        <div class="home-tasks-container">

          <HomeTaskCard @click="this.$router.push('/profile')" class="home-task-card">
            <template #header>
              <h5>Profile info</h5>
            </template>

            <template #title>
              <h5>Update your profile info so that your colleagues get to know you!</h5>
            </template>

            <template #body>
              <ProgressBar :current="profileProgress.current" :total="profileProgress.total" />
            </template>
          </HomeTaskCard>

          <HomeTaskCard @click="this.$router.push('/skills')" class="home-task-card">
            <template #header>
              <h5>Put in your skills!</h5>
            </template>

            <template #title>
              <h5>Let us know the skills you possess and how proficient you are with them!</h5>
            </template>

            <template #body>
              <ProgressBar :current="mySkillsProgress.current" :total="mySkillsProgress.total" />
            </template>
          </HomeTaskCard>

          <HomeTaskCard @click="this.$router.push('/colleagues')" class="home-task-card">
            <template #header>
              <h5>Find colleagues</h5>
            </template>

            <template #title>
              <h5>Got a problem with e.g. JavaScript? Find colleagues that possess this skill!</h5>
            </template>

            <template #body>
            </template>
          </HomeTaskCard>

          <HomeTaskCard @click="this.$router.push('/resumes')" class="home-task-card">
            <template #header>
              <h5>Generate resumes</h5>
            </template>

            <template #title>
              <h5>Filled in your info? Generate a resume with just one click!</h5>
            </template>

            <template #body>
            </template>
          </HomeTaskCard>
        </div>
      </div>

    </div>

  </main>
</template>

<style>

.welcome-msg {
  margin-top: 2%;
  text-align: center;
}

.home-tasks {
  text-align: center;
}

.home-tasks-slider {
  margin-left: 2%;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #e9ecef #adb5bd;
  scroll-behavior: smooth;
}

.home-tasks-slider::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.home-tasks-slider::-webkit-scrollbar-thumb {
  background-color: orange;
}

.home-tasks-slider::-webkit-scrollbar-track {
  background-color: #e9ecef;
}

.home-tasks-container {
  margin-top: 15%;
  margin-right: 8%;
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  /* Add the desired gap value between the cards */
  padding: 10px;
  /* Add padding to create space around the cards */
  height: 16.7vw;
}

.home-task-card {
  transform: scale(0.9);
  flex: 0 0 auto;
  width: 30%;
  scroll-snap-align: start;

  /* Card styles */
  transition: transform 0.3s ease-in-out;
  background-color: #ffffff;
}


.home-task-card:hover {
  cursor: pointer;
  transform: scale(1.0);
}
</style>