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
    isMyProfile:{
      default:true
    }
  },

  data() {
    return {

      modalOpened: false,
    }
  },

  methods: {
    toggleModal() {
      this.modalOpened = !this.modalOpened
    },

    skillsUpdated(){
      this.$emit('skills-updated')
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

      
      <button v-if="isMyProfile" class="btn btn-edit" @click="toggleModal()">Edit</button>

      <ManageSkillModal ref="manageSkillModal" v-if="modalOpened" 
        :skillNameProp="skillName"
        :starsProp="stars"
        :open="true" 
        @close="modalOpened = false"
        @skills-updated="skillsUpdated()">

        <template #title>
          <h3>Edit the skill</h3>
        </template>

        <template #leftButton>
          <button @click="$refs.manageSkillModal.deleteSkill()" class="btn btn-danger delete">Delete</button>
        </template>

        <template #rightButton>
          <button @click="$refs.manageSkillModal.updateSkill()" class="btn btn-warning save">Save</button>
        </template>
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

.btn-edit {
  margin-top: 2%;
  margin-bottom: 2%;
  background-color:orange;
  color: black;
}

.btn-edit:hover {
  background-color:orange;
  color: black;
  box-shadow: 0rem 0rem 1rem orange;
}
</style>
