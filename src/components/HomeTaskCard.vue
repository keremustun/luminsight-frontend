<script>
import GenericCard from './GenericCard.vue';

export default {
    props: {
        header: {
            default: ""
        },
        taskCompleted: {
            default: false
        },
        body: {
            default: ""
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
    <GenericCard>
        <template #header>
            {{ header }}
        </template>

        <template #body>
            {{ body }}
        </template>


    </GenericCard>
</template>

<style></style>
