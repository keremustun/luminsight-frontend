import axios from 'axios';

export class PersonService {
    getPerson(personEmail) {
        return axios.get(`https://localhost:7224/api/person/getPerson`, { params: { email: personEmail } });
    }

    async getPersonAsync(personEmail) {
        return await axios.get(`https://localhost:7224/api/person/getPerson`, { params: { email: personEmail } })
    }

    getPersonsSkills(personEmail) {
        return [
            {
                skillName: 'C#',
                proficiency: 5,
            },
            {
                skillName: 'JavaScript',
                proficiency: 4,
            },
            {
                skillName: 'TypeScript',
                proficiency: 3,
            }
        ]
    }

    updatePersonSkill(personEmail, skillName, newSkill) {
        console.log(skillName)
        axios.put(`https://localhost:7224/api/person/${personEmail}/skills/${encodeURIComponent(skillName)}`, newSkill)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
}