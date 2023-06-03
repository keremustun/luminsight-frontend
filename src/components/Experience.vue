<script>
import ExperienceModal from './ExperienceModal.vue'

export default {
    props: ['experience'],

    methods: {
        toggleModal() {

            this.modalOpened = !this.modalOpened
            console.log(this.modalOpened)
        },

        experiencesUpdated(){

        },

        
    },

    data(){
        return {
            modalOpened:false
        }
    },

    components: {
        ExperienceModal
    }
}
</script>

<template>
    <div @click="toggleModal" class="experience-container">
        <div class="experience-title">
            {{ experience.title }}
        </div>
        <div class="experience-date">
            {{ experience.dateFrom }} - {{ experience.dateUntil }}
        </div>

        <div class="experience-description">
            {{ experience.description }}
        </div>
    </div>
    
    <ExperienceModal ref="experienceModal" v-if="modalOpened" :experienceProp="experience" :open="true"  @close="modalOpened = false" @experiences-updated="experiencesUpdated()">

        <template #title>
            <h3>Edit the experience</h3>
        </template>

        <template #leftButton>
            <button @click="this.$refs.experienceModal.deleteExperience()" class="btn btn-danger delete">Delete</button>
        </template>

        <template #rightButton>
            <button @click="this.$refs.experienceModal.updateExperience()" class="btn btn-warning save">Save</button>
        </template>
    </ExperienceModal>

</template>

<style></style>