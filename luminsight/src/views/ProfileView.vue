<script setup>
import AddSkillCard from '../components/SkillCard.vue'
</script>

<template>
  <div class="about">
    <h1>This is a Profile page</h1>
  </div>

  <main>
    <AddSkillCard></AddSkillCard>
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
