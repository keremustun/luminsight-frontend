
<script>
import resumeStyles from '@/assets/resume-styles.css';
import ResumeConfigurationMenu from './ResumeConfigurationMenu.vue';
import axios from 'axios';
import Stars from './Stars.vue'

export default {
    inject: ['loggedInPerson', 'personService'],

    data() {
        return {
            person: undefined,
            resume: undefined,
            resumeOf: this.$route.query.resumeOf,
            resumeId: this.$route.query.resumeId,
            resumeTitle: '',
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

            showJobTitle: false,
            showSkills: true,
            showExperiences: true,

            styling: resumeStyles,
            resumeWidth: 1080,
            resumeHeight: 1920,
            hdResolutionMultiplier: 1,
        };
    },

    mounted() {
        this.personService.getPerson(this.$route.query.resumeOf).then((response) => {
            this.person = response.data;


            if (this.$route.query.resumeId === 'default') {

                this.skills = this.person.skills
                this.experiences = this.person.personalInfo.experiences
                this.jobTitle = this.person.personalInfo.jobTitle
                this.showJobTitle = true;
                this.showSkills = true;
                this.showExperiences = true;
            } else {
                const index = this.person.resumes.findIndex(resume => resume.id === this.$route.query.resumeId)
                this.resume = this.person.resumes[index]
                this.resumeTitle = this.resume.title
                this.skills = this.resume.skills
                this.experiences = this.resume.experiences
                this.showJobTitle = true;
                this.showSkills = true;
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
        },

    },

    methods: {
        async generatePDF() {
            const resumeElement = this.$refs.resumeContainer;
            const htmlContent = resumeElement.innerHTML;
            const styling = `<style>${this.styling}</style>`;

            this.personService.generatePdf(htmlContent, styling).then(response => {
                console.log('aa')
                // Create a blob URL from the response data
                const blobUrl = URL.createObjectURL(response.data);

                // Create an anchor element to trigger the file download
                const link = document.createElement('a');
                link.href = blobUrl;

                if (this.resumeTitle === '') {
                    link.download = `Luminis Resume - ${this.person.personalInfo.firstName} ${this.person.personalInfo.lastName}.pdf`;
                }
                else {
                    link.download = `Luminis Resume - ${this.person.personalInfo.firstName} ${this.person.personalInfo.lastName} - ${this.resumeTitle}.pdf`;
                }
                link.click();

                // Clean up the blob URL
                URL.revokeObjectURL(blobUrl);
            })
        },


        updateConfigurations() {
            this.skills = this.$refs.resumeConfigurationMenu.selectedSkills

            this.experiences = this.$refs.resumeConfigurationMenu.selectedExperiences

            this.showSkills = this.$refs.resumeConfigurationMenu.showSkills
            this.showExperiences = this.$refs.resumeConfigurationMenu.showExperiences
            this.updateResume()
        },

        updateResume() {
            const resume = {
                id: this.resumeId,
                title: this.resumeTitle,
                jobTitle: this.jobTitle,
                skills: this.skills,
                experiences: this.experiences
            }

            this.personService.updateResume(this.resumeOf, resume)
        },

        deleteResume() {
            if (confirm('Are you sure that you want to delete this resume?')) {
                this.personService.deleteResume(this.resumeOf, this.resumeId).then(response => {
                    if (response.data === 'Resume deleted') {
                        alert('Resume deleted')
                        this.$router.push({
                            name: 'resumes',
                            query: {
                                resumesOf: this.resumeOf
                            }
                        });
                    } else {
                        alert(response.data)
                    }
                });
            }
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
            <div class="row">

                <div v-if="resumeId !== 'default'" class="col btn title-input-wrapper">

                    <div>
                        <input type="text" class="form-control title-input" v-model="resumeTitle" @input="updateResume()"
                            @keydown.enter="addTag" placeholder="✎ Enter a title" />
                    </div>

                </div>

                <div class="col download-btn-container">
                    <div class="btn">
                        <button class="btn download-btn" @click="generatePDF">Download as PDF</button>
                        <a ref="downloadLink" style="display: none;"></a>


                    </div>
                    <div v-if="this.loggedInPerson.email === resumeOf" class="btn">
                        <button v-if="resumeId !== 'default'" class="btn delete-btn" @click="deleteResume()">Delete
                            Resume</button>
                    </div>
                </div>
            </div>

        </div>



        <div class="row container-wrapper">
            <div v-if="this.$route.query.resumeId !== 'default'" class="col add-sections-menu">
                <ResumeConfigurationMenu ref="resumeConfigurationMenu" v-if="person" :resumeOf="resumeOf"
                    :skillsProp="this.resume.skills" :experiencesProp="this.resume.experiences"
                    @configurationsUpdated="updateConfigurations()">

                </ResumeConfigurationMenu>
            </div>
            <div class="col container">

                <div ref="resumeContainer" class="resume-container" :style="resumeStyles">
                    <div v-if="person" class="resume">
                        <div class="logo-container">
                            <img src="https://www.luminis.eu/wp-content/themes/luminis-2020/library/images/logo.svg"
                                alt="Logo" class="logo" />
                        </div>
                        <div class="section">
                            <div class="resume-person-name">
                                {{ person.personalInfo.firstName }} {{ person.personalInfo.lastName }}
                            </div>

                            <div class="job-title">
                                {{ jobTitle }}
                            </div>


                        </div>


                        <div v-if="Object.keys(skills).length > 0" class="section">
                            <div class="section-title">Skills

                            </div>
                            <div v-for="skill in skills" class="resume-skill">
                                <div class="skill-name">
                                    - {{ skill.skillName }}
                                </div>
                                <span class="stars">
                                    <span v-for="n in 5" :key="n" class="star"
                                        :class="{ 'filled-star': n <= skill.proficiency, 'empty-star': n > skill.proficiency }"></span>
                                </span>
                            </div>

                        </div>

                        <div v-if="Object.keys(experiences).length > 0" class="section">
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

    </div>
</template>























<style>
.dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: black;
    border-radius: 50%;
    margin-right: 5px;
}

.title-input-wrapper {

    color: white;
}

.title-input {
    color: white;
    background: transparent;
    border: none;
}

.title-input:hover {
    color: white;
    background: rgba(176, 99, 211, 0.529);
    border: none;
}

.title-input::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
    opacity: 1;
    /* Firefox */
}

.title-input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: white;
}

.title-input::-ms-input-placeholder {
    /* Microsoft Edge */
    color: white;
}

.resume-menu {
    background-color: purple;
    height: 3.3rem;
}

.download-btn-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
}

.download-btn {
    background-color: orange;
    margin-right: 1rem;
}

.download-btn:hover {
    color: white;
    background-color: orange;

    box-shadow: 0rem 0rem 1rem white;
}


.delete-btn {

    color: white;
    background-color: rgb(255, 0, 0);
}

.delete-btn:hover {
    color: white;
    background-color: rgb(203, 1, 1);

    box-shadow: 0rem 0rem 0.5rem rgb(255, 255, 255);
}

.add-sections-menu {
    /* 16:9 aspect ratio */
    display: inline-block;
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    font-size: 14px;
}

@media (max-width: 1004px) {
    .resume-menu {
        height: 20vh
    }
}
</style>
  