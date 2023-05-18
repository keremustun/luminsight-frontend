<script>

export default {
    props: ['skillNameProp', 'proficiencyProp', 'skillNameMatched','proficiencyDeficiency'],

    data() {
        return {
            skillName: this.skillNameProp,
            proficiency: this.proficiencyProp,
            stars: [1, 2, 3, 4, 5],

        }
    },
    methods: {
        selectStars(star) {
            this.proficiency = star;
            this.tagChanged()
        },
        starFilled(star) {
            return star <= this.proficiency;
        },
    },
}
</script>

<template>
    <div class="skill">
        <div class="name">
            
            {{ skillName }}
        </div>
        <div class="proficiency">
            {{ proficiency }}
        </div>

    </div>
</template>


<style>
.skill{
    border: 1px solid black;
    border-radius: 0.3rem;
  width: 10rem;
  padding: 5%;
}

</style>
