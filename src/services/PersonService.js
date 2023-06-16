import axios from 'axios';
import store from '../store/index.js'

export class PersonService {
    //controllerEndpoint = '/api/person/'
    controllerEndpoint = 'https://localhost:8082/api/person/'

    async getPerson(personEmail) {
        const url = this.controllerEndpoint +
            `getPerson/${personEmail}`
        const auth = {
            headers: { 'Authorization': 'Bearer ' + store.state.accessToken }
        }
        return await axios.get(url, auth)
    }

    async createPerson(personEmail) {
        const url = this.controllerEndpoint +
            `createPerson/${personEmail}`

        return await axios.post(url)
    }

    async findPersonsWithSkills(searchSkillsFilter) {
        const url = this.controllerEndpoint +
            `findPersonsWithSkills`
        const body = searchSkillsFilter

        return await axios.post(url, body)
    }

    //////////////////////////////////////////////////////////////////////////////////// Personal Info

    async getPersonalInfo(personEmail) {
        const url = this.controllerEndpoint +
            `${personEmail}/personalInfo`
        return await axios.get(url)
    }

    async updatePersonalInfo(personEmail, personalInfo) {
        const url = this.controllerEndpoint +
            `${personEmail}/personalInfo`
        const body = personalInfo

        return await axios.put(url, body)
    }

    async addExperience(personEmail, newExperience) {
        const url = this.controllerEndpoint +
            `${personEmail}/personalInfo/addExperience`
        const body = newExperience

        return await axios.put(url, body)
    }


    async deleteExperience(personEmail, title) {
        const url = this.controllerEndpoint +
            `${personEmail}/personalInfo/deleteExperience/${title}`


        return await axios.delete(url)
    }


    async updateExperience(personEmail, title, newExperience) {
        const url = this.controllerEndpoint +
            `${personEmail}/personalInfo/updateExperience/${title}`
        const body = newExperience

        return await axios.put(url, body)
    }

    //////////////////////////////////////////////////////////////////////////////////// Resumes

    async addResume(personEmail) {
        const url = this.controllerEndpoint +
            `${personEmail}/addResume`

        return await axios.put(url)
    }

    async deleteResume(personEmail, resumeId) {
        const url = this.controllerEndpoint +
            `${personEmail}/deleteResume/${resumeId}`

        return await axios.delete(url)
    }

    async updateResume(personEmail, resume) {
        const url = this.controllerEndpoint +
            `${personEmail}/updateResume`

        const body = resume

        return await axios.put(url, body)
    }

    async generatePdf(htmlContent, styling) {


        const url = this.controllerEndpoint +
            `generatePdf`

        const body = {
            htmlContent,
            styling
        }

        return await axios.post(url, body, {
            responseType: 'blob', // Set response type as blob
        });
    }

    //////////////////////////////////////////////////////////////////////////////////// Skills

    async getPersonsSkills(personEmail) {
        const url = this.controllerEndpoint +
            `${personEmail}/skills`

        return await axios.get(url)
    }

    async addPersonSkill(personEmail, skill) {
        const url = this.controllerEndpoint +
            `${personEmail}/skills`
        const body = skill

        return await axios.put(url, body)
    }

    async deletePersonSkill(personEmail, skill) {
        const url = this.controllerEndpoint +
            `${personEmail}/skills`

        const body = skill

        return await axios.post(url,body)
    }

    async updatePersonSkill(personEmail, skillName, newSkill) {
        const url = this.controllerEndpoint +
            `${personEmail}/skills/${encodeURIComponent(skillName)}`
        const body = newSkill

        return await axios.put(url, body)
    }

    async validateSkill(personEmail, newSkill) {
        const url = this.controllerEndpoint +
            `${personEmail}/skills/validateSkill`
        const body = newSkill

        return await axios.post(url, body)
    }

    ////

    async getSuggestedSkill(inputText) {
        const url = this.controllerEndpoint +
            `getSuggestedSkills`

        const body = {
            InpText: inputText
        }


        return await axios.post(url, body)
    }

    async getSkillsStartingWith(personEmail, inputText) {
        const url = this.controllerEndpoint +
            `${personEmail}/skills/findSkillsStartingWith`

        const body = {
            InpText: inputText
        }


        return await axios.post(url, body)
    }
}