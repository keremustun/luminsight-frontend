<script>
import Stars from './Stars.vue'


export default {
    props: ['skillNameProp', 'proficiencyProp'],

    data() {
        return {
            skillName: this.skillNameProp,

        }
    },
    methods: {
    },
    components:{Stars}
}
</script>

<template>
    <div class="skill">
        <div class="name">
            {{ skillName }}
        </div>
        <div class="proficiency">
            <Stars ref="stars" :proficiencyPropStars="proficiencyProp">

            </Stars>
        </div>

    </div>
</template>


<style>
.skill {
    border: 1px solid black;
    border-radius: 0.3rem;
    width: 10rem;
    padding: 5%;
    background: linear-gradient(60deg,rgba(255, 161, 10, 0.385),rgba(0, 208, 255, 0.534));
}
</style>
