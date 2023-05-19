<script>

export default {
    props: ['fieldValue', 'fieldName'],

    data() {
        return {
            clicked: false,
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
        },

        setClickedTrue() {
            this.clicked = true
            this.$nextTick(() => {
                this.$refs.inputElement.focus();
            });
        },

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
    <div>

        <div class="fieldName">
            <p>{{ field }}</p>
        </div>

        <div class="fieldValue" v-if="this.valueType === 'string' || this.valueType === 'number'">
            <div v-if="clicked">
                <input ref="inputElement" @blur="clicked = false" v-model="value" type="text" >
            </div>
            <div v-else>
                <p @click="setClickedTrue"> {{ value }} </p>

            </div>
        </div>

    </div>
</template>

<style>

.personalInfoField {
  border: 0.05rem solid black;
  border-radius: 1rem;
  margin-top: 1rem;
}

.fieldName{
    margin: 1%;
}

.fieldValue{
    margin: 1%;
}
</style>