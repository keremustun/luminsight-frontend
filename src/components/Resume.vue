
<script>
import resumeStyles from '@/assets/resume-styles.css';
import axios from 'axios';

export default {
    inject: ['personService'],

    data() {
        return {
            person: undefined,
            styling: resumeStyles,
            resumeWidth: 1080,
            resumeHeight: 1920,
            hdResolutionMultiplier: 1,
        };
    },

    mounted() {
        this.personService.getPerson(this.$route.query.resumeOf).then((response) => {
            this.person = response.data;
        });
    },

    methods: {
        async generatePDF() {
            try {
                this.isPdfGeneration = true;
                const resumeElement = this.$refs.resumeContainer;
                const htmlContent = resumeElement.innerHTML;
                const styling = `<style>${this.styling}</style>`;
                const response = await axios.post('https://localhost:7224/api/person/generatePdf', {
                    htmlContent,
                    styling,
                });

                console.log(response.data); // Handle the response from the backend
            } catch (error) {
                console.error(error); // Handle the error
            } finally {
                this.isPdfGeneration = false;
            }
        },
    },
};
</script>
  
<template>
    <div>
        <button @click="generatePDF">Download PDF</button>
    </div>
    <div class="row background">
        <div class="container">
            <div ref="resumeContainer" class="resume-container" :style="resumeStyles">
                <div v-if="person" class="resume">
                    <div class="name">
                        {{ person.personalInfo.firstName }} {{ person.personalInfo.lastName }}
                    </div>
                    <!-- Rest of the content -->
                </div>
            </div>
        </div>
    </div>
</template>
  