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
        slider.scrollLeft += scrollAmount;
      }
    }
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
      <h2>Welcome {{ loggedInPerson.email }}</h2>
    </div>

    <div class="home-tasks">
      <h4>How does this work?</h4>
      <div class="home-tasks-slider">
        <div class="home-tasks-container">
          <HomeTaskCard class="home-task-card" :header="'hi'" :body="'aaa'" />
          <HomeTaskCard class="home-task-card" :header="'hi'" :body="'aaa'" />
          <HomeTaskCard class="home-task-card" :header="'hi'" :body="'aaa'" />
          <HomeTaskCard class="home-task-card" :header="'hi'" :body="'aaa'" />
          <HomeTaskCard class="home-task-card" :header="'hi'" :body="'aaa'" />
          <HomeTaskCard class="home-task-card" :header="'hi'" :body="'aaa'" />
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
  margin-top: 5%;
  text-align: center;
}

.home-tasks-slider {
  overflow-x: auto;
  scrollbar-width: none; /* Hide the scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide the scrollbar for IE and Edge */
}

.home-tasks-slider::-webkit-scrollbar {
  width: 0; /* Hide the scrollbar for Chrome, Safari, and Opera */
}

.home-tasks-container {
  display: flex;
  flex-wrap: nowrap;
  padding: 10px;
}

.home-task-card {
  flex: 0 0 auto;
  width: 300px; /* Adjust the width as needed */
  margin-right: 10px;
}
</style>
