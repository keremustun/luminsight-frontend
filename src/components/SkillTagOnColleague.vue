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

        <!-- <span v-for="star in stars" :key="star" class="starr" :class="{
            oldSelection: star <= proficiency,
            glowing: star <= hovered,
            'bi': true,
            'bi-star': !starFilled(star),
            'bi-star-fill': starFilled(star)
        }">
        </span> -->
    </div>
</template>


<style>
.skill{
    border: 1px solid black;
    border-radius: 10rem;
    display: inline-block;
    margin-right: 1%;
}

</style>
