<script>
import { Modal } from 'bootstrap'
import GenericModal from './GenericModal.vue';

export default {
    props: {
        open: {
            default: false
        },
        id: {
            default: "modal-id"
        },
        closeButtonText: {
            default: null
        },
        saveButtonText: {
            default: null
        },
    },
    components: { GenericModal }
}
</script>

<template>
    <GenericModal :open="open">
        
        <template #title>
            <h3>Edit the skill</h3>
        </template>
    </GenericModal>
</template>
