<script>
export default {
    props: ['proficiencyPropStars','editable'],

    data() {
        return {

            proficiency: this.proficiencyPropStars,
            hovered: 0,
            stars: [1, 2, 3, 4, 5],
        }
    },

    methods:{
        hoverStars(star) {
            this.hovered = star;
        },
        resetStars() {
            this.hovered = 0;
        },
        selectStars(star) {
            this.proficiency = star;
            this.$emit('proficiencyChanged')
        },
        starFilled(star) {
            return star <= this.proficiency;
        },
    }
}
</script>

<template>
    <div v-if="editable" class="stars">
        <span v-for="star in stars" :key="star" class="starr" :class="{
            oldSelection: star <= proficiency,
            glowing: star <= hovered,
            'bi': true,
            'bi-star': !starFilled(star),
            'bi-star-fill': starFilled(star)
        }" @mouseover="hoverStars(star)" @mouseleave="resetStars" @click="selectStars(star)">
        </span>
    </div>
    <div v-else class="stars">
        <span v-for="star in stars" :key="star" class="starr" :class="{
            oldSelection: star <= proficiency,
            glowing: star <= hovered,
            'bi': true,
            'bi-star': !starFilled(star),
            'bi-star-fill': starFilled(star)
        }" >
        </span>
    </div>
</template>

<style>

.starr {
    cursor: pointer;
    margin: 1%;
    text-shadow: 0px 0px 1px black;
}

.stars {
    padding: 5%;
    text-align: center;
}

.bi-star {
    cursor: pointer;
    color: gray;
    cursor: pointer;
}

.bi-star-fill {

    color: gold;
}

.oldSelection {
    color: gold;
}

.newSelection {
    background-color: red;
}

.glowing {
    text-shadow: 0px 0px 5px gold;
}

</style>