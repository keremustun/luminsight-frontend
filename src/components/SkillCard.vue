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
    key: {
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

      <ManageSkillModal v-if="modalOpened" id="edit-skill" :skillNameProp="skillName" saveButtonText="Save"
        closeButtonText="Delete" :open="modalOpened" @close="modalOpened = false">
        <template #title>
          <h3>Edit the skill</h3>
        </template>

        <template #body>
          <input :value="this.skillName" @input="updateSkillName" type="text">

          <p class="card-text">
            <i v-for="(x, index) in 5" :class="'bi bi-star ' + (index < stars ? 'star-filled' : 'star')"></i>
          </p>
        </template>

        <template #leftButton>
          <button>Delete</button>
        </template>

        <template #rightButton>
          <button>Save</button>
        </template>
      </ManageSkillModal>
    </template>


  </GenericCard>
</template>

<style>
.star{
  color:gray;
}

.star-filled{
  color:gold;
}

</style>
