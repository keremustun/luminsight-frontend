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
  methods:{
    toggleModal(){
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
      <a href="#" class="btn btn-primary">Save</a>

      <button @click="toggleModal()">trigger</button>

      <ManageSkillModal v-if="modalOpened" 
      id="add-skill" saveButtonText="Save" closeButtonText="Delete" :open="modalOpened" >
      </ManageSkillModal>
    </template>


  </GenericCard>
</template>

<style scoped></style>
