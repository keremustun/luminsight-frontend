import axios from 'axios';
import store from '../store/index.js'

export class PersonService {
    controllerEndpoint = 'https://localhost:7224/api/person/'

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
        const url = 'https://localhost:7224/api/person/findPersonsWithSkills'
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


    async updateExperience(personEmail,title, newExperience) {
        const url = this.controllerEndpoint +
            `${personEmail}/personalInfo/updateExperience/${title}`
        const body = newExperience

        return await axios.put(url, body )
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

    async deletePersonSkill(personEmail, skillName) {
        const url = this.controllerEndpoint +
            `${personEmail}/skills/${encodeURIComponent(skillName)}`

        return await axios.delete(url)
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