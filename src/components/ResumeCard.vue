<script>
import GenericCard from './GenericCard.vue'

export default{
    
    components:{ GenericCard }
}
</script>

<template>
    
    <GenericCard>
        <template #title>
            <div>
                Title
            </div>
        </template>

        <template #body>
            <div>
                Skills:
            </div>
            <div>
                Date created
            </div>
        </template>
    </GenericCard>
</template>