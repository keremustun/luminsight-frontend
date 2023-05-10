import axios from 'axios';
import store from '../store/index.js'

export class PersonService {
    controllerEndpoint = 'https://localhost:7224/api/person/'

    async getPerson(personEmail) {
        const url = this.controllerEndpoint +
            `getPerson/${personEmail}`

        return await axios.get(url, { headers: { Authorization: `Bearer ${store.state.accessToken}` } })
    }

    async createPerson(personEmail) {
        const url = this.controllerEndpoint +
            `createPerson/${personEmail}`

        return await axios.post(url)
    }

    //////////////////////////////////////////////////////////////////////////////////// Personal Info

    async getPersonsPersonalInfo(personEmail) {
        const url = this.controllerEndpoint +
            `${personEmail}/personalInfo`

        return await axios.get(url)
    }

    async savePersonalInfo(personEmail, personalInfo) {
        const url = this.controllerEndpoint +
            `${personEmail}/personalInfo`
        const body = personalInfo

        return await axios.put(url, body)
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

}