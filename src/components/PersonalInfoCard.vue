<script>

export default {
    props: ['fieldValue', 'fieldName', 'fieldNameDisplay', 'isMyProfileProp'],

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
            console.log('notifying')
            this.$emit('updateData', this.value, this.field);
        },

        setClicked(state) {
            if (this.isMyProfileProp) {
                this.clicked = state
                if (this.clicked === true) {
                    this.$nextTick(() => {
                        this.$refs.inputElement.focus();
                    });

                }
                this.notifyParent()

            }

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

        <div class="fieldNameContainer">
            <p class="fieldName">{{ fieldNameDisplay }}</p>
        </div>

        <div class="fieldValue" v-if="this.valueType === 'string' || this.valueType === 'number'">
            <div v-if="clicked">
                <input ref="inputElement" @blur="setClicked(false)" v-model="value" type="text">
            </div>
            <div v-else>
                <p v-if="isMyProfileProp" @click="setClicked(true)"> {{ value }} [edit icon]</p>
                <p v-else @click="setClicked(true)"> {{ value }}</p>

            </div>
        </div>
        <hr>

    </div>
</template>

<style>
.personalInfoField {}

.fieldNameContainer,
.fieldName {
    font-weight: 700;
    display: inline-block;
}

.fieldValue {
    margin-left: 1%;
    display: inline-block;
}
</style>