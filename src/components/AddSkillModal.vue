<script>
import { Modal } from 'bootstrap'

export default {
    props: {
        open: {
            default: false
        },
        id: {
            default: 'modal-id'
        },
        closeButtonText: {
            default: null
        },
        saveButtonText: {
            default: null
        },
    },
    data() {
        return {
            modal: null,
        }
    },
    methods: {
        openModal() {
            if (!this.modal) {
                this.modal = new Modal(document.getElementById(this.id));
                this.modal.show();
                document.getElementById(this.id).addEventListener('hidden.bs.modal', event => {
                    this.modalIsHidden();
                })
            } else {
                this.modal.show();
            }
        },
        hideModal() {
            this.modal.hide();
        },
        modalIsHidden() {
            this.$emit('close');
        }
    },
    mounted() {
        if (this.open) {
            this.openModal();
        }
    },
    watch: {
        open: {
            handler(openState) {
                if (openState) {
                    this.openModal();
                } else if (this.modal) {
                    this.hideModal();
                }
            }
        }
    },
}
</script>

<template>
    <!-- Modal -->
    <div class="modal fade" :id="id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        <slot name="title"></slot>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ closeButtonText }} </button>
                    <button type="button" class="btn btn-primary">{{ saveButtonText }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>