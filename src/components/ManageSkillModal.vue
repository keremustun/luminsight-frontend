<script>
import { Modal } from 'bootstrap'
import GenericModal from './GenericModal.vue';

export default {
    inject: ['loggedInPerson', 'personService'],

    props: {
        skillNameProp: {
            default: ''
        },
        open: {
            default: false
        },
        starsProp: {
            default: 1
        }
    },

    emits: ['skill-updated'],

    data() {
        return {
            oldSkill: {
                skillName: this.skillNameProp,
                proficiency: this.starsProp,

            },

            newSkill: {
                skillName: this.skillNameProp,
                proficiency: this.starsProp,

            },

            hovered: 0,
            stars: [1, 2, 3, 4, 5],

        }
    },


    methods: {
        hoverStars(star) {
            this.hovered = star;
        },
        resetStars() {
            this.hovered = 0;
        },
        selectStars(star) {
            this.newSkill.proficiency = star;
        },
        starFilled(star) {
            return star <= this.newSkill.proficiency;
        },

        updateSkill(oldSkill, newSkill) {
            if ((JSON.stringify(oldSkill) !== JSON.stringify(newSkill))) {

                this.personService.updatePersonSkill(
                    this.loggedInPerson.email,
                    oldSkill.skillName,
                    newSkill
                ).then(response => {
                    this.$refs.genericModal.hideModal()
                    this.$emit('skill-updated')
                })

            }
        },

        deleteSkill() {
            const confirmed = window.confirm('Are you sure that you want to delete this skill?')
            if (confirmed) {
                //this.personService.deleteSkill(this.oldSkill)
            }
        }
    },

    components: { GenericModal }
}
</script>

<template>
    <GenericModal ref="genericModal" :open="open">
        <template #title>
            <h3>Edit the skill</h3>
        </template>

        <template #body>
            <input class="skillNameInput" v-model="newSkill.skillName" type="text">

            <div class="proficiencyEdit">
                <p>What's your proficiency with this skill?</p>
                <span v-for="star in stars" :key="star" class="starr" :class="{
                        oldSelection: star <= oldSkill.proficiency,
                        glowing: star <= hovered,
                        'bi': true,
                        'bi-star': !starFilled(star),
                        'bi-star-fill': starFilled(star)
                    }" @mouseover="hoverStars(star)" @mouseleave="resetStars" @click="selectStars(star)">
                </span>
            </div>

        </template>

        <template #leftButton>
            <button @click="deleteSkill" class="btn btn-danger delete">Delete</button>
        </template>

        <template #rightButton>
            <button @click="updateSkill(oldSkill, newSkill)" class="btn btn-warning save">Save</button>
        </template>
    </GenericModal>
</template>

<style>
.skillNameInput {
    width: 100%;
    border-radius: 1rem;
    padding-left: 1rem;
    border-color: gray;
}

.proficiencyEditText {
    margin-top: 1rem;

}

.starr {
    cursor: pointer;
    margin: 0.2%
}

.bi-star {
    cursor: pointer;
    color: gray;
    cursor: pointer;
}

.bi-star-fill {

    color: gold;
}

.oldSelection {
    color: gold;
}

.newSelection {
    background-color: red;
}

.glowing {
    text-shadow: 0px 0px 5px gold;
}

.delete {
    background-color: red;
    border: red;
}

.save {
    background-color: orange;
    border: orange;
}
</style>
