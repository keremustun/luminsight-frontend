<script>
import GenericCard from './GenericCard.vue';

export default {
    props: {
        header: {
            default: ""
        },
        title: {
            default: ""
        },
        body: {
            default: ""
        },
        taskCompleted: {
            default: false
        },
    },

    data() {
        return {
            cardStyle: {
                border: 0
            },
            headerStyle: {
                backgroundColor: 'purple',
                color: 'white',
                border: 0
            },
            titleStyle: {

            },
            bodyStyle: {

                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.078), rgb(255, 190, 70, 0.078))'
            }
        }
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
    <GenericCard :cardStyle="cardStyle" :headerStyle="headerStyle" :titleStyle="titleStyle" :bodyStyle="bodyStyle">
        <template #header>
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
