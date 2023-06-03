<script>
import GenericCard from './GenericCard.vue'

export default {
    data() {
        return {
            cardStyle: {
                border: 'none',
                borderRadius: '0rem',
                backgroundColor: 'transparent'
            }
        }
    },
    components: { GenericCard }
}
</script>

<template>
    <div>
        <GenericCard :cardStyle="cardStyle">
            <template #title>
                <slot name="title">

                </slot>
            </template>

            <template #body>
                <slot name="body">

                </slot>
                
            </template>
        </GenericCard>
        <hr>
    </div>
</template>

