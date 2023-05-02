import {useFetch} from "@/services/UseFetch";

class SkillsService {
    async   fetchCatFacts() {
        const facts = await useFetch('https://cat-fact.herokuapp.com/facts');
        return facts;
    }
}

export const skillsService = new SkillsService();
