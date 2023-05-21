<script>

export default {
    props: ['skillNameProp', 'proficiencyProp', 'index'],

    data() {
        return {
            skillName: this.skillNameProp,
            proficiency: this.proficiencyProp,

            hovered: 0,
            stars: [1, 2, 3, 4, 5],

        }
    },
    methods: {
        hoverStars(star) {
            this.hovered = star;
        },
        resetStars() {
            this.hovered = 0;
        },
        selectStars(star) {
            this.proficiency = star;
            this.tagChanged()
        },
        starFilled(star) {
            return star <= this.proficiency;
        },

        removeTag() {
            this.$emit('removeTag', this.skillName)
        },

        tagChanged() {
            this.$emit('tagChanged',
                {
                    skillName: this.skillName,
                    proficiency: this.proficiency
                })
        }
    },
    watch: {
        skillName: {
            deep: true,
            handler() {
                // Call the notifyParent method when any changes occur in the data object
                this.notifyParent();
            }
        }
    }
}
</script>

<template>
    <div>
        <div>
            <div class="skill-name">{{ skillName }}</div>
            <div class="tag-close" @click="removeTag">&times;</div>
        </div>

        <div class="stars">
            <span v-for="star in stars" :key="star" class="starr" :class="{
                oldSelection: star <= proficiency,
                glowing: star <= hovered,
                'bi': true,
                'bi-star': !starFilled(star),
                'bi-star-fill': starFilled(star)
            }" @mouseover="hoverStars(star)" @mouseleave="resetStars" @click="selectStars(star)">
            </span>
        </div>

    </div>
</template>


<style>
.skill-name{
    padding:5%;
    font-weight: 600;
    display: inline-block;
}
.tag-close {
    padding:5%;
    cursor: pointer;
    align-self: flex-end;
    display: inline-block;
    float: right;
    font-weight: 700;
}

.tag-close:hover {
    text-shadow:0px 0px 2px red;
}

.skillNameInput {
    width: 100%;
    border-radius: 1rem;
    padding-left: 1rem;
    border-color: gray;
}

.proficiencyEditText {
    margin-top: 1rem;

}

.starr {
    cursor: pointer;
    margin: 0.2%;
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

.delete {
    background-color: red;
    border: red;
}

.save {
    background-color: orange;
    border: orange;
}



</style>
