<script setup>
import AddSkillModal from '../components/AddSkillModal.vue'
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
    <!-- Button trigger modal -->

    <!-- Modal -->
    <AddSkillModal id="id-1" titleText="cats" bodyText="bodyText" safeButtonText="Save" closeButtonText="Lol" />
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
