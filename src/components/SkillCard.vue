<script>
import GenericCard from './GenericCard.vue';

export default {
  props: {
    stars: {
      default: 4
    },
    header: {
      default: "Add a skill"
    },
    skillName: {
      default: "skill"
    },
  },
  components: { GenericCard }
}
</script>

<template>
  <GenericCard>
    <template #header>
      {{ header }}
    </template>
    <template #title>
      {{ skillName }}
    </template>
    <template #body>
      <p class="card-text">
        <i v-for="x in stars" class="bi bi-star-fill"></i>
        <i v-for="x in 5 - (stars ?? 0)" class="bi bi-star"></i>
      </p>
      <a href="#" class="btn btn-primary">Save</a>
    </template>
  </GenericCard>
</template>

<style scoped></style>
