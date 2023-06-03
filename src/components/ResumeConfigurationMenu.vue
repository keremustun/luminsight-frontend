
<script>
export default {
    props: {
        skillsProp: {
            default: []
        },
        experiencesProp: {
            default: []
        },
    },

    mounted() {
        // for (var skill in this.skillsProp) {
        //     console.log(this.skillsProp)
        //     const newSkill = skill
        //     newSkill.checked = false
        //     this.skills.push(newSkill)
        // };
        // for (var experience in this.experienceProp) {
        //     const newExperience = experience
        //     newExperience.checked = false
        //     this.experiences.push(newExperience)
        // };
        this.skills = this.skillsProp.map(skill => {
            return {
                ...skill,
                checked: false
            };
        });
        this.experiences = this.experiencesProp.map(experience => {
            return {
                ...experience,
                checked: false
            };
        });
        console.log(this.experiencesProp)
    },

    data() {
        return {
            skills: [],
            showSkills: true,

            experiences: [],
            showExperiences: true,
        }
    },

    watch: {
        skills: {
            deep: true,
            handler() {
                this.$emit('configurationsUpdated')
            }
        },
        experiences: {
            deep: true,
            handler() {
                this.$emit('configurationsUpdated')
            }
        },

    }

};
</script>


<template>
    <div class="category">
        <div class="category-header" @click="showSkills = !showSkills">
            <span class="arrow" :class="{ 'expanded': showSkills }">
                Skills</span>
        </div>

        <div class="skills-options" v-if="showSkills">
            <div class="skill-configuration" v-for="skill in skills" :key="skill.skillName"
                @click="skill.checked = !skill.checked">
                <input class="skill-checkbox" type="checkbox" v-model="skill.checked">
                {{ skill.skillName }} <span class="stars">
                    <span v-for="n in 5" :key="n" class="star"
                        :class="{ 'filled-star': n <= skill.proficiency, 'empty-star': n > skill.proficiency }"></span>
                </span>
            </div>
        </div>

        <div class="category-header" @click="showExperiences = !showExperiences">
            <span class="arrow" :class="{ 'expanded': showExperiences }">
                Experiences </span>
        </div>

        <div class="experiences-options" v-if="showExperiences">
            <div class="experience-configuration" v-for="experience in experiences" :key="experience.title"
                @click="experience.checked = !experience.checked">
                <input class="experience-checkbox" type="checkbox" v-model="experience.checked">
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
    margin-bottom: 1rem
}

.label-days {
    margin-right: 0.5rem;
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