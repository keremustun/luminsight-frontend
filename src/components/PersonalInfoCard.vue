<script>

export default {
    props: ['fieldValue', 'fieldName'],

    data() {
        return {
            field: this.fieldName,
            value: this.fieldValue,
            valueType: typeof (this.fieldValue)
        }
    },
    methods: {
        notifyParent() {
            // Emit the event with the updated data and index
            this.$emit('updateData', this.value, this.field);
            console.log('notifying parent')
        }
    },
    watch: {
        value: {
            deep: true,
            handler() {
                // Call the notifyParent method when any changes occur in the data object
                this.notifyParent();
            }
        }
    }
}
</script>

<template>
    <div class="personalInfoField">

        <p>{{ field }}</p>

        <div v-if="this.valueType === 'string' || this.valueType === 'number'">
            <p>{{ this.fieldValue }}</p>
            <input v-model="value" type="text" name="" id="">
        </div>

    </div>
</template>