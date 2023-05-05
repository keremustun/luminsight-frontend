<script>
import { Modal } from 'bootstrap'
import GenericModal from './GenericModal.vue';

export default {
    props: {
        open: {
            default: false
        },
        starsProp: {
            default: 1
        }
    },

    data() {
        return {
            oldSelectedStars: this.starsProp,
            newSelectedStars: 0,
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
            this.newSelectedStars = star;
        },
        starFilled(star) {
            return star <= this.newSelectedStars;
        }
    },

    components: { GenericModal }
}
</script>

<template>
    <GenericModal :open="open">
        <template #title>
            <slot name="title"></slot>
        </template>

        <template #body>

            <slot name="body">


            </slot>

            <div>
                <span v-for="star in stars" :key="star" class="starr" :class="{
                        oldSelection: star <= oldSelectedStars,
                        glowing: star <= hovered,
                        'bi': true,
                        'bi-star': !starFilled(star),
                        'bi-star-fill': starFilled(star)
                    }" @mouseover="hoverStars(star)" @mouseleave="resetStars" @click="selectStars(star)">
                </span>
            </div>

        </template>

        <template #leftButton>
            <slot name="leftButton"></slot>
        </template>

        <template #rightButton>
            <slot name="rightButton"></slot>

        </template>
    </GenericModal>
</template>

<style>
.starr{
    cursor:pointer;
    margin:0.2%
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
