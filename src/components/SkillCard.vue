<script>
import GenericCard from './GenericCard.vue';
import ManageSkillModal from './ManageSkillModal.vue'

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
  data() {
    return {

      modalOpened: false,
    }
  },
  methods: {
    toggleModal() {
      console.log(this.skillName)
      console.log('click')
      this.modalOpened = !this.modalOpened
      console.log(this.modalOpened)
    }
  },
  components: { GenericCard, ManageSkillModal }
}
</script>

<template>
  <GenericCard>
    <template #title>
      {{ skillName }}
    </template>

    <template #body>
      <p class="card-text">
        <i v-for="x in stars" class="bi bi-star-fill"></i>
        <i v-for="x in 5 - (stars ?? 0)" class="bi bi-star"></i>
      </p>

      
      <button @click="toggleModal()">Edit</button>

      <ManageSkillModal v-if="modalOpened" 
        :skillNameProp="skillName"
        :starsProp="stars"
        :open="true" 
        @close="modalOpened = false">
      </ManageSkillModal>
    </template>


  </GenericCard>
</template>

<style>
.star {
  color: gray;
}

.star-filled {
  color: gold;
}
</style>
