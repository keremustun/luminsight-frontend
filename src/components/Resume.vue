
<script>
import resumeStyles from '@/assets/resume-styles.css';
import axios from 'axios';
import Stars from './Stars.vue'

export default {
    inject: ['personService'],

    data() {
        return {
            person: undefined,
            skills: [{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },{
                skillName:'C#',
                proficiency:5
            },],
            experiences: [{
                title: '3rd year Internship',
                dateFrom: 'Sep 2021',
                dateUntil: 'Feb 2022',
                description: 'internship k;fads k;fadsfdahadf kjadsf jkjeskjnakwfdahadf kjadsf jkjeskjnakwndkj f;awoeawoen,and,jawedinternship k;fadsfdahadf kjadsf jkjeskjnakwndkj f;awoeawoen,and,jawedinterns k;fadsfdahadf kjadsf jkjeskjnakwip k;fadsfdahadf kjadsf jkjeskjnakwndkj f;awoeawoen,and,jawedinternship k;fadsfdahadf kjadsf jkjeskjnak k;fadsfdahadf kjadsf jkjeskjnakwawoen,and,jawedinternship k;fadsfdahadf kjadsf jkje k;fadsfdahadf kjadsf jkjeskjnakwakwndkj f;awoeawoen,and,jawedinternship k;fadsfdahadf kjadsf jkjeskjnakwndkj f;awoeawoen,and,jawedinternship k;fadsfdahadf kjadsf jkjeskjnakwndkj f;awoeawoen,and,jawed',
            },
            {
                title: 'Graduation Internship',
                dateFrom: 'Feb 2023',
                dateUntil: 'Jun 2023',
                description: 'internship k;fadsfdahadf kjadsf jaweawenternship k;aweawewndkjk;fadsfdahadf kdkj f;awoeawoen,and,jawedinternship k;fadsfdahadf kjadsf jkjeskjnakwndkj f;awoeawoen,and,jawedinternship k;fadsfdahadf kjadsf jkjeskjnakwndkj f;awoeawoen,and,jawedi k;fadsfdahadf kjadsf jkjeskjnakwnternship k;fadsfdahadf kjadsf jkjeskjnakwndkj f;awoeawoen,and,jawedintkwndkj f;awoeawoen,and,jawed',
            }],

            styling: resumeStyles,
            resumeWidth: 1080,
            resumeHeight: 1920,
            hdResolutionMultiplier: 1,
        };
    },

    mounted() {
        this.personService.getPerson(this.$route.query.resumeOf).then((response) => {
            this.person = response.data;
            console.log(this.person)
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
        }
    },

    components: {
        Stars
    }

};
</script>
  
<template>
    <div>
        <button @click="generatePDF">Download PDF</button>
        <a ref="downloadLink" style="display: none;"></a>
    </div>
    <div class="row background">
        <div class="container">
            <div ref="resumeContainer" class="resume-container" :style="resumeStyles">
                <div v-if="person" class="resume">
                    <div class="section">
                        <div class="name">
                            {{ person.personalInfo.firstName }} {{ person.personalInfo.lastName }}
                        </div>

                        <div class="job-title">
                            {{ person.personalInfo.jobTitle }}
                        </div>
                    </div>


                    <div class="section">
                        <div class="section-title">Skills

                        </div>

                        <div v-for="skill in skills" class="skill">
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
                        <div v-for="experience in experiences" class="sub-section experience">
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
                    </div>

                    <div class="section">
                        <div class="section-title">Languages</div>

                    </div>


                    <div class="section">
                        <div class="section-title">Hobbies</div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  