import axios from 'axios';

export class PersonService {
    async getPerson(personEmail) {
        return await axios.get(`https://localhost:7224/api/person/getPerson`, { params: { email: personEmail } })
    }

    async getPersonsSkills(personEmail) {
        return await axios.get(`https://localhost:7224/api/person/${personEmail}/skills`)
       
    }

    async deletePersonSkill(personEmail, skillName) {
        return await axios.delete(`https://localhost:7224/api/person/${personEmail}/skills/${encodeURIComponent(skillName)}`)
            
    }

    async updatePersonSkill(personEmail, skillName, newSkill) {
        return await axios.put(`https://localhost:7224/api/person/${personEmail}/skills/${encodeURIComponent(skillName)}`, newSkill)
            
    }
}