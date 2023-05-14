<script>
import GenericCard from './GenericCard.vue';

export default {
    props: {
        header: {
            default: ""
        },
        title:{
            default: ""
        },
        body: {
            default: ""
        },
        taskCompleted: {
            default: false
        },
    },

    methods: {

        homeTaskCardUpdated() {
            this.$emit('skills-updated')
        }
    },

    components: { GenericCard }
}
</script>

<template>
    <GenericCard :headerBackgroundColor="'rgb(103, 10, 155,0.8)'" :headerColor="'white'">
        <template #header >
            <slot name="header"></slot>
        </template>

        <template #title>
        <slot name="title"></slot>
        </template>
        <template #body>
            <slot name="body"></slot>
        </template>

    </GenericCard>
</template>

<style>

.aa{
    color:rgb(93, 0, 255)
    
}
</style>
