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
            default: 0
        }
    },

    emits: ['skills-updated'],

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

        addSkill() {
            this.personService.addPersonSkill(
                this.loggedInPerson.email,
                this.newSkill
            ).then(response => {
                if (response.data === 'Skill Added')
                    this.cleanUp()
                else
                    alert(response.data)
            })
        },

        updateSkill() {

            this.personService.updatePersonSkill(
                this.loggedInPerson.email,
                this.oldSkill.skillName,
                this.newSkill
            ).then(response => {
                if (response.data === 'Skill Updated')
                    this.cleanUp()
                else
                    alert(response.data)
            })
        },

        deleteSkill() {
            const confirmed = window.confirm('Are you sure that you want to delete this skill?')
            if (confirmed) {
                this.personService.deletePersonSkill(
                    this.loggedInPerson.email,
                    this.oldSkill.skillName
                ).then(response => {
                    this.cleanUp()
                })
            }
        },

        validateSkill() {
            return this.personService.validateSkill(this.loggedInPerson.email, this.newSkill)

        },

        cleanUp() {
            this.$refs.genericModal.hideModal()
            this.$emit('skills-updated')
        }
    },

    components: { GenericModal }
}
</script>

<template>
    <GenericModal ref="genericModal" :open="open">
        <template #title>
            <slot name="title"></slot>
        </template>

        <template #body>
            <input class="personalInfoFieldInput" v-model="personalInfoField" type="text">


        </template>

        <template #leftButton>
            <slot name="leftButton"></slot>
        </template>

        <template #rightButton>
            <slot name="rightButton"></slot>
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

.delete {
    background-color: red;
    border: red;
}

.save {
    background-color: orange;
    border: orange;
}
</style>
