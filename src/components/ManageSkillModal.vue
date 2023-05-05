<script>
import { Modal } from 'bootstrap'
import GenericModal from './GenericModal.vue';

export default {
    data() {
        return {
            skillName: this.skillNameProp
        }
    },
    props: {
        skillNameProp: {
            default: ''
        },
        open: {
            default: false
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
            <slot name="body"></slot>
        </template>

        <template #leftButton>
            <slot name="leftButton"></slot>
        </template>

        <template #rightButton>
            <slot name="rightButton"></slot>

        </template>
    </GenericModal>
</template>
