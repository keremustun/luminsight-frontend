<script>
import HomeTaskCard from '../components/HomeTaskCard.vue'

export default {
  inject: ['loggedInPerson'],
  data() {
    return {}
  },
  components: { HomeTaskCard },
  mounted() {
    const slider = document.querySelector('.home-tasks-slider');
    slider.addEventListener('wheel', this.handleSliderScroll, { passive: false });
  },
  methods: {
    handleSliderScroll(event) {
      const slider = document.querySelector('.home-tasks-slider');
      const scrollAmount = event.deltaY;

      // Check if the shift key is pressed or if scrolling is horizontal
      if (!event.shiftKey && Math.abs(event.deltaX) < Math.abs(event.deltaY)) {
        event.preventDefault();
        
        // Calculate the scroll speed based on scroll distance
        const speed = Math.abs(scrollAmount) >= 100 ? 1.5: 0.5;
        
        slider.scrollBy({
          left: scrollAmount * speed,
          behavior: 'smooth',
        });
      }
    },
  },
  beforeUnmount() {
    const slider = document.querySelector('.home-tasks-slider');
    slider.removeEventListener('wheel', this.handleSliderScroll);
  }
}
</script>

<template>
  <main>
      <div class="welcome-msg">
        <h2>Welcome {{ loggedInPerson.personalInfo.firstName }}!</h2>
      </div>

      <div class="row home-tasks">
        <div class="col-1"></div>
        <div class="col home-tasks-slider">
          <div class="home-tasks-container">

            <HomeTaskCard class="home-task-card">
              <template #header>
                <h5>Profile info</h5>
              </template>

              <template #title>
                <h5>Update your profile info so that your colleagues get to know you!</h5>
              </template>

              <template #body>
                <h6 style="margin-top: 20%;">Completed:</h6>
              </template>
            </HomeTaskCard> 

            <HomeTaskCard class="home-task-card">
              <template #header>
                <h5>Put in your skills!</h5>
              </template>

              <template #title>
                <h5>Let us know the skills you possess and how proficient you are with them!</h5>
              </template>

              <template #body>
                <h6 style="margin-top: 20%;">Completed:</h6>
              </template>
            </HomeTaskCard> 

            <HomeTaskCard class="home-task-card">
              <template #header>
                <h5>Find colleagues</h5>
              </template>

              <template #title>
                <h5>Got a problem with e.g. JavaScript? Find colleagues that possess this skill!</h5>
              </template>

              <template #body>
                <h6 style="margin-top: 20%;">Completed:</h6>
              </template>
            </HomeTaskCard> 

            <HomeTaskCard class="home-task-card">
              <template #header>
                <h5>Generate resumes</h5>
              </template>

              <template #title>
                <h5>Filled in your info? Generate a resume with just one click!</h5>
              </template>

              <template #body>
                <h6 style="margin-top: 20%;">Completed:</h6>
              </template>
            </HomeTaskCard> 
          </div>
        </div>
        
        <div class="col-1"></div>
      </div>

  </main>
</template>

<style>
main{
}
.welcome-msg {
  margin-top: 2%;
  text-align: center;
}

.home-tasks {
  margin-top: 8%;
  text-align: center;
}

.home-tasks-slider {
  margin-top: 3%;
  overflow-x: auto;
  scrollbar-width:thin;
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
  display: flex;
  flex-wrap: nowrap;
  gap: 20px; /* Add the desired gap value between the cards */
  padding: 10px; /* Add padding to create space around the cards */
  height: 16.7vw;
}

.home-task-card {
  flex: 0 0 auto;
  width: 30%;
  margin-right: 5vw;
}


</style>