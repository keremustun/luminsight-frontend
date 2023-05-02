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
    <h1>This is a Resume page</h1>
  </div>

  <main>
    <AddSkillCard>
      <template #header>
        <h1>Header tekst</h1>
      </template>

      <template #title>
        <h1>Titeltekst</h1>
      </template>

      <template #body>
        <p class="card-text">
          <i v-for="x in stars" class="bi bi-star-fill"></i>
          <i v-for="x in 5 - (stars ?? 0)" class="bi bi-star"></i>
        </p>
        <a href="#" class="btn btn-primary">Save</a>
      </template>
    </AddSkillCard>
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
