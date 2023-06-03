
<script>
import resumeStyles from '@/assets/resume-styles.css';
import ResumeConfigurationMenu from './ResumeConfigurationMenu.vue';
import axios from 'axios';
import Stars from './Stars.vue'

export default {
    inject: ['personService'],

    data() {
        return {
            person: undefined,
            jobTitle: '',

            skills: [{
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            }, {
                skillName: 'C#',
                proficiency: 5
            },],

            experiences: [],

            styling: resumeStyles,
            resumeWidth: 1080,
            resumeHeight: 1920,
            hdResolutionMultiplier: 1,
        };
    },

    mounted() {
        this.personService.getPerson(this.$route.query.resumeOf).then((response) => {
            this.person = response.data;

            const index = this.person.resumes.findIndex(resume => resume.id === this.$route.query.resumeId)

            if (this.$route.query.resumeId === 'default') {

                this.skills = this.person.skills
                this.experiences = this.person.personalInfo.experiences
                this.jobTitle = this.person.personalInfo.jobTitle
            } else {

                this.skills = this.person.resumes[index].skills
                this.experiences = this.person.resumes[index].experiences
            }
        });
    },

    watch: {
        person: {
            deep: true,
            handler() {
                // this.skills = this.person.skills
                this.skills.sort((skillA, skillB) => skillA.skillName.localeCompare(skillB.skillName));
            }
        }
    },

    methods: {
        async generatePDF() {
            try {
                const resumeElement = this.$refs.resumeContainer;
                const htmlContent = resumeElement.innerHTML;
                const styling = `<style>${this.styling}</style>`;

                const response = await axios.post('https://localhost:7224/api/person/generatePdf', {
                    htmlContent,
                    styling,
                }, {
                    responseType: 'blob', // Set response type as blob
                });
                // Create a blob URL from the response data
                const blobUrl = URL.createObjectURL(response.data);

                // Create an anchor element to trigger the file download
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = 'resume.pdf';
                link.click();

                // Clean up the blob URL
                URL.revokeObjectURL(blobUrl);
            } catch (error) {
                console.error(error); // Handle the error
            }
        },

        updateConfigurations() {
            console.log(this.$refs.resumeConfigrationMenu.skills)
            this.skills = this.$refs.resumeConfigrationMenu.skills
                .filter(skill => skill.checked)

            this.experiences = this.$refs.resumeConfigrationMenu.experiences
                .filter(experience => experience.checked)
        }
    },

    components: {
        Stars, ResumeConfigurationMenu
    }

};
</script>
  
<template>
    <div class="row background">
        <div class="resume-menu">
            <div class="btn download-btn-container">
                <button class="btn download-btn" @click="generatePDF">Download as PDF</button>
                <a ref="downloadLink" style="display: none;"></a>
            </div>
        </div>
        <div class="container">
            <div v-if="this.$route.query.resumeId !== 'default'" class="col add-sections-menu">
                <ResumeConfigurationMenu ref="resumeConfigrationMenu" v-if="person" :skillsProp="this.person.skills"
                    :experiencesProp="this.person.personalInfo.experiences" @configurationsUpdated="updateConfigurations()">

                </ResumeConfigurationMenu>
                <div class="menu-skills">
                    Skills
                </div>
                <div class="menu-experiences">
                    Experiences
                </div>
            </div>
            <div ref="resumeContainer" class="resume-container" :style="resumeStyles">
                <div v-if="person" class="resume">
                    <div class="section">
                        <div class="name">
                            {{ person.personalInfo.firstName }} {{ person.personalInfo.lastName }}
                        </div>

                        <div class="job-title">
                            {{ jobTitle }}
                        </div>
                    </div>


                    <div class="section">
                        <div class="section-title">Skills

                        </div>

                        <div v-for="skill in skills" class="resume-skill">
                            <div class="skill-name">
                                {{ skill.skillName }}
                            </div>
                            <span class="stars">
                                <span v-for="n in 5" :key="n" class="star"
                                    :class="{ 'filled-star': n <= skill.proficiency, 'empty-star': n > skill.proficiency }"></span>
                            </span>
                        </div>

                    </div>

                    <div class="section">
                        <div class="section-title">Experiences</div>
                        <div v-for="experience in experiences" class="sub-section resume-experience">
                            <div class="resume-experience-title">
                                {{ experience.title }}
                            </div>
                            <div class="resume-experience-date">
                                {{ experience.monthFrom }} {{ experience.yearFrom }} - {{ experience.monthUntil }} {{
                                    experience.yearUntil }}
                            </div>
                            <div class="resume-experience-description">
                                {{ experience.description }}
                            </div>
                        </div>
                    </div>

                    <!-- <div class="section">
                        <div class="section-title">Languages</div>

                    </div> -->


                </div>
            </div>
        </div>
    </div>
</template>

<style>
.resume-menu {
    background-color: purple;
    height: 3.3rem;
}

.download-btn-container {
    float: right;
}

.download-btn {
    background-color: orange;
}

.download-btn:hover {
    color: white;
    background-color: orange;

    box-shadow: 0rem 0rem 1rem white;
}

.background {}
</style>
  