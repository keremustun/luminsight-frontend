import axios from 'axios';
import store from '../store/index.js'

export class PersonService {
    async getPerson(personEmail) {
        const url = `https://localhost:7224/api/person/getPerson/${personEmail}`
        return await axios.get(url, { headers: { Authorization: `Bearer ${store.state.accessToken}` } })
    
    }

    async getPersonsSkills(personEmail) {
        return await axios.get(`https://localhost:7224/api/person/${personEmail}/skills`)

    }

    async addPersonSkill(personEmail, skill) {
        return await axios.put(`https://localhost:7224/api/person/${personEmail}`, skill)
    }

    async deletePersonSkill(personEmail, skillName) {
        return await axios.delete(`https://localhost:7224/api/person/${personEmail}/skills/${encodeURIComponent(skillName)}`)

    }

    async updatePersonSkill(personEmail, skillName, newSkill) {
        return await axios.put(`https://localhost:7224/api/person/${personEmail}/skills/${encodeURIComponent(skillName)}`, newSkill)

    }

    async validateSkill(personEmail, newSkill) {
        return await axios.post(`https://localhost:7224/api/person/${personEmail}/skills/validateSkill`, newSkill)

    }
}