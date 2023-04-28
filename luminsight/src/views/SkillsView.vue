<script setup>
import AddSkillCard from '../components/SkillCard.vue'
</script>

<script>

export default {
  inject: ['skillsService'],
  created() {
    this.skillsService.fetchCatFacts()
        .then(facts => {
          this.facts = facts
        });
  },
  methods: {},
  data() {
    return {
      facts: [],
    }
  },
  computed: {}
}
</script>

<template>
  <div class="about">
    <h1>This is a Skills page</h1>
  </div>

  <main>
    <p v-for="f in facts">{{ f.text }}</p>
    <!--    <AddSkillCard :stars="store.skills['C#'].stars"></AddSkillCard>-->
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
