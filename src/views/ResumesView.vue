<script setup>
import AddSkillCard from '../components/SkillCard.vue'
</script>

<script>
export default {
  props: {
    stars: {
      default: 4
    }
  }
}
</script>

<template>
  <div class="about">
    <h6>My Resume's</h6>
  </div>

  <main>
    <div>
      This page has not been created yet
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
