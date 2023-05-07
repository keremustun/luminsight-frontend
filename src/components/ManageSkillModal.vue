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
            this.validateSkill().then(response => {
                if (response.data === 'Valid') {
                    this.personService.addPersonSkill(
                        this.loggedInPerson.email,
                        this.newSkill
                    ).then(response => {
                        this.cleanUp()
                    })
                } else {
                    return alert(response.data)
                }
            })
        },

        updateSkill() {

            this.validateSkill().then(response => {
                if (response.data === 'Valid') {
                    this.personService.updatePersonSkill(
                        this.loggedInPerson.email,
                        this.oldSkill.skillName,
                        this.newSkill
                    ).then(response => {
                        this.cleanUp()
                    })
                } else {
                    return alert(response.data)
                }
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
