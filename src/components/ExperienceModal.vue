<script>
import { Modal } from 'bootstrap'
import GenericModal from './GenericModal.vue';

export default {
    inject: ['loggedInPerson', 'personService'],

    props: {
        experienceProp: {
            default: {
                title: '',
                monthFrom: '',
                yearFrom: '',
                monthUntil: '',
                yearUntil: '',
                description: ''
            }
        },
        open: {
            default: false
        }
    },

    mounted() {
        this.setYears()
        console.log(this.experienceProp)
    },

    emits: ['experiences-updated'],

    data() {
        return {
            oldExperience: this.experienceProp,
            newExperience: this.experienceProp,

            months: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ],

            years: []

        }
    },


    methods: {
        setYears() {
            const currentYear = new Date().getFullYear();
            for (let year = 1970; year <= currentYear; year++) {
                this.years.push(year.toString());
            }
        },

        addExperience() {
            this.personService.addExperience(
                this.loggedInPerson.email,
                this.newExperience
            ).then(response => {
                if (response.data === 'Experience Added')
                    this.cleanUp()
                else
                    alert(response.data)
            })
        },

        updateExperience() {
            this.personService.updateExperience(
                this.loggedInPerson.email,
                this.newExperience
            ).then(response => {
                if (response.data === 'Experience Added')
                    this.cleanUp()
                else
                    alert(response.data)
            })
        },

        deleteExperience() {
            const confirmed = window.confirm('Are you sure that you want to delete this experience?')
            if (confirmed) {
                this.personService.deleteExperience(
                    this.loggedInPerson.email,
                    this.oldSkill.skillName
                ).then(response => {
                    this.cleanUp()
                })
            }
        },

        validateExperience() {
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
            <div>
                <div class="experience-field-name">Title</div>
                <input class="form-control experience-field-value" v-model="newExperience.title" type="text">


                <div class="experience-field-name">Date From</div>
                <div class="dropdown">
                    <select class="form-control experience-field-value" v-model="newExperience.monthFrom">
                        <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
                    </select>
                </div>

                <div class="dropdown">
                    <select class="form-control experience-field-value" v-model="newExperience.yearFrom">
                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                    </select>
                </div>


                <div class="experience-field-name">Date Until</div>
                <div class="dropdown">
                    <select class="form-control experience-field-value" v-model="newExperience.monthUntil">
                        <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
                    </select>
                </div>

                <div class="dropdown">
                    <select class="form-control experience-field-value" v-model="newExperience.yearUntil">
                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                    </select>
                </div>


                <div class="experience-field-name">Description</div>
                <textarea class="form-control experience-field-value" v-model="newExperience.description" type="text" />


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
.experience-field-name {
    font-size: 1.2rem;
}

.experience-field-value {

    margin-bottom: 1rem;
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
