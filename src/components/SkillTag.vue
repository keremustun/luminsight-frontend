<script>
import Stars from './Stars.vue'

export default {
    props: ['skillNameProp', 'proficiencyPropSkillTag', 'index'],

    data() {
        return {
            skillName: this.skillNameProp,
        }
    },
    methods: {
        removeTag() {
            this.$emit('removeTag', this.skillName)
        },

        tagChanged() {
            this.$emit('tagChanged',
                {
                    skillName: this.skillName,
                    proficiency: this.$refs.stars.proficiency
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
    },

    components: {
        Stars
    }
}
</script>

<template>
    <div >
        <div>
            <div class="skill-name">{{ skillName }}</div>
            <div class="tag-close" @click="removeTag">&times;</div>
        </div>

        <div class="skill-container">
            <Stars ref="stars" :proficiencyPropStars="proficiencyPropSkillTag" :editable="true"
                @proficiencyChanged="tagChanged()">

            </Stars>
        </div>


    </div>
</template>


<style>
.skill-container{
    margin-top: -5%;
    margin-bottom: 5%;
}
.skill-name {
    padding: 5%;
    font-weight: 600;
    display: inline-block;
}

.tag-close {
    padding: 5%;
    cursor: pointer;
    align-self: flex-end;
    display: inline-block;
    float: right;
    font-weight: 700;
}

.tag-close:hover {
    text-shadow: 0px 0px 2px red;
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
</style>
