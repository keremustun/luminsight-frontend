<script setup>
import AddSkillCard from '../components/SkillCard.vue'
</script>

<script>
import { store } from '../services/store'

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<template>
  <div class="about">
    <h1>This is a Skills page</h1>
  </div>

  <main>
    <AddSkillCard :stars="store.skills['C#'].stars"></AddSkillCard>
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
