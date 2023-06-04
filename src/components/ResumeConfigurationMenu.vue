
<script>
export default {
    inject: ['personService'],
    props: {
        skillsProp: {
            default: []
        },
        experiencesProp: {
            default: []
        },
        resumeOf: {

        }
    },

    mounted() {

        this.personService.getPerson(this.resumeOf).then(response => {
            this.person = response.data

            this.skillsWithState = this.person.skills.map(skill => {
                const isChecked  = this.skillsProp.includes(skill.skillName);
                return {
                    ...skill,
                    checked: isChecked 
                }
            })
            this.experiencesWithState = this.person.personalInfo.experiences.map(experience => {
                const isChecked  = this.experiencesProp.includes(experience.title);
                return {
                    ...experience,
                    checked: isChecked 
                }
            })

        })


    },

    data() {
        return {
            person: {},

            skillsWithState: [],
            selectedSkills: [],
            skillsExpanded: true,
            showSkills: false,

            experiencesWithState: [],
            selectedExperiences: [],
            experiencesExpanded: true,
            showExperiences: false,
        }
    },

    watch: {
        skillsWithState: {
            deep: true,
            handler() {
                this.selectedSkills = this.skillsWithState.filter(skill => skill.checked)
                this.notifyParent()
            }
        },
        experiencesWithState: {
            deep: true,
            handler() {
                this.selectedExperiences = this.skillsWithState.filter(experience => experience.checked)
                this.notifyParent()
            }
        },

    },

    methods: {
        notifyParent() {
            this.$emit('configurationsUpdated')

        }
    }

};
</script>


<template>
    <div class="category">
        <div class="category-header" @click="skillsExpanded = !skillsExpanded">
            <span class="arrow rcm-section-title" :class="{ 'expanded': skillsExpanded }">
                Skills
            </span>
            <div class="toggle">
                <input class="toggle-checkbox" type="checkbox" id="toggle-switch-skills" v-model="showSkills"
                    @change="notifyParent()" />
                <label class="toggle-label" for="toggle-switch-skills">
                    <div class="toggle-inner"></div>
                    <div class="toggle-switch"></div>
                </label>
            </div>
        </div>

        <div class="skills-options" v-if="skillsExpanded">

            <div v-for="skill in skillsWithState" :key="skill.skillName" @click="skill.checked = !skill.checked"
                class="configuration" :class="{ 'selected': skill.checked, 'not-selected': !skill.checked }">
                {{ skill.skillName }}
                <span class="stars">
                    <span v-for="n in 5" :key="n" class="star"
                        :class="{ 'filled-star': n <= skill.proficiency, 'empty-star': n > skill.proficiency }">
                    </span>
                </span>
            </div>

        </div>
        <hr>

        <div class="category-header" @click="experiencesExpanded = !experiencesExpanded">
            <span class="arrow rcm-section-title" :class="{ 'expanded': experiencesExpanded }">
                Experiences
            </span>
            <div class="toggle">
                <input class="toggle-checkbox" type="checkbox" id="toggle-switch-experiences" v-model="showExperiences"
                    @change="notifyParent()" />
                <label class="toggle-label" for="toggle-switch-experiences">
                    <div class="toggle-inner"></div>
                    <div class="toggle-switch"></div>
                </label>
            </div>
        </div>

        <div class="experiences-options" v-if="experiencesExpanded">
            <div v-for="experience in experiencesWithState" :key="experience.title"
                @click="experience.checked = !experience.checked" class="configuration"
                :class="{ 'selected': experience.checked, 'not-selected': !experience.checked }">
                {{ experience.title }}
            </div>
        </div>
    </div>
</template>
  

<style>
.category-header {
    cursor: pointer;
}

.category {
    padding: 0.3rem;
    margin-top: 1rem;
}

.toggle {
    margin-top: 0.5rem;
    position: relative;
    float: right;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.toggle-checkbox {
    display: none;
}

.toggle-label {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.toggle-inner {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #7c7c7c;
    border-radius: 34px;
    transition: background-color 0.3s;
}

.toggle-switch {
    display: block;
    position: absolute;
    width: 26px;
    height: 26px;
    top: 4px;
    left: 4px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s;
}

.toggle-checkbox:checked+.toggle-label .toggle-inner {
    background-color: #07df20;
}

.toggle-checkbox:checked+.toggle-label .toggle-switch {
    transform: translateX(26px);
}



.configuration {
    background-color: rgba(255, 255, 255, 0.705);
    padding: 0.5rem;
    border-radius: 1rem;
    max-width: 15rem;
    cursor: pointer;
    margin: 1rem 0rem;
    font-size: 1rem;
    font-weight: 500
}

.configuration:hover {
    background-color: rgba(126, 126, 126, 0.201);
}

.configuration:hover {
    background-color: rgba(126, 126, 126, 0.201);
}

.configuration:active {
    background-color: rgba(59, 59, 59, 0.201);

}

.selected {
    border: 0.15rem solid rgb(4, 151, 1);
    box-shadow: 0rem 0rem 0.2rem rgb(4, 151, 1);
}

.not-selected {
    border: 0.15rem solid red;
    box-shadow: 0rem 0rem 0.2rem rgb(151, 1, 1);
}

.label-days {
    margin-right: 0.5rem;
}

.rcm-title {
    font-weight: 600;
    font-size: 2rem;
}

.rcm-section-title {
    font-weight: 600;
    font-size: 1.8rem;
}

.arrow::after {
    content: '\25B8';
    /* Right-pointing arrow */
    display: inline-block;
    margin-right: 5px;
    transform: rotate(0deg);
    transition: transform 0.2s;
}

.arrow.expanded::after {
    transform: rotate(90deg);
}

.branch:hover {
    background-color: rgba(128, 128, 128, 0.103);
    cursor: pointer;
}

.branch-checkbox {
    cursor: pointer;
}
</style>