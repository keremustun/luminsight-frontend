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
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
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
