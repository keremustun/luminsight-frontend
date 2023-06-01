<script>
import axios from 'axios';
export default {
    inject: ['personService'],

    mounted() {

    },

    data() {
        return {
            resumeWidth: 1080, // Adjust the desired width in pixels
            resumeHeight: 1920, // Adjust the desired height in pixels
            hdResolutionMultiplier: 1, // Adjust the resolution multiplier for HD
            id: this.$route.query.resumeId,
            person: {


            }
        }
    },

    methods: {
        async generatePDF() {
            try {
                const htmlContent = '<html><body><h1>Hello, world!</h1></body></html>'; // Replace with your HTML content
                const styling = '<style>h1 { color: red; }</style>'; // Replace with your CSS styling

                const response = await axios.post('https://localhost:7224/api/person/generatePdf', {
                    htmlContent,
                    styling
                });

                console.log(response.data); // Handle the response from the backend
            } catch (error) {
                console.error(error); // Handle the error
            }
        }
    }
}

</script>

<template>
    <div>

        <button @click="generatePDF">Download PDF</button>
    </div>
    <div class="row background">
        <div class="col"></div>
        <div ref="resume" class="col resume">
            <div class="luminis-logo-container">
                <img class="luminis-logo"
                    src="https://www.luminis.eu/wp-content/themes/luminis-2020/library/images/logo.svg" alt="Logo" />
            </div>

            <div>
                First Name Last Name
            </div>

            <hr>

            <div>
                Skills
            </div>

            <hr>

            <div>
                Experiences
            </div>

            <hr>

            <div>
                Biography
            </div>
        </div>

        <div class="col"></div>
    </div>
</template>

<style>
.resume {
    height: 1920px;
    width: 1080px;
    background-color: white;
}

.background {
    background: linear-gradient(90deg, transparent, rgba(7, 2, 2, 0.321), rgba(7, 2, 2, 0.645), rgba(7, 2, 2, 0.255), transparent);
}

.luminis-logo-container {
    text-align: center;
}

.luminis-logo {
    margin-top: 1rem;
    float: left;
    width: 5rem;
}
</style>