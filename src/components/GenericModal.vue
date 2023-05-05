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

    mounted() {
        if (this.open) {
            this.openModal();
        }
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

                <div class="top-frame">
                    
                </div>

                <div class="modal-header">
                    <slot name="title"></slot>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <slot name="body"></slot>
                </div>

                <div class="modal-footer">
                    <div>

                        <slot name="leftButton"></slot>
                    </div>
                    <div>
                        <slot name="rightButton"></slot> 

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style>
.top-frame{
    background-color: rgb(53, 0, 53);
    height: 1rem;
}

.modal-content{
    border-radius: 0;
}
</style>