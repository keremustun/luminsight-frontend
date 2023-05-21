<script>

export default {
    props: {
        fieldValue:{

        },
        fieldName:{

        },
        fieldNameDisplay:{

        },
        fieldType: {
            default: 'input'
        },
        isMyProfileProp:{

        }

    },


    data() {
        return {
            clicked: false,
            field: this.fieldName,
            value: this.fieldValue,
            valueType: typeof (this.fieldValue),
            branchOptions: ['Rotterdam', 'Amsterdam', 'Apeldoorn', 'Arnhem']
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

        <slot name="title">

        </slot>

        <div class="fieldNameContainer">
            <p class="fieldName">{{ fieldNameDisplay }}:</p>
        </div>

        <slot name="body">

        </slot>

        <div class="fieldValue" v-if="this.valueType === 'string' || this.valueType === 'number'">
            <div v-if="clicked">
                <div v-if="fieldType === 'combobox'">
                    <select ref="inputElement" @blur="setClicked(false)" v-model="value">
                        <option v-for="option in branchOptions" :value="option">{{ option }}</option>
                    </select>
                </div>
                <div v-if="fieldType === 'textarea'">
                    <textarea ref="inputElement" @blur="setClicked(false)" v-model="value" type="text"></textarea>
                </div>
                <div v-if="fieldType === 'input'">

                    <input ref="inputElement" @blur="setClicked(false)" v-model="value" type="text">
                </div>
            </div>
            <div v-else>
                <div class="value-container" v-if="isMyProfileProp" @click="setClicked(true)">

                    <div class="value">
                        {{ value }}
                    </div>
                </div>
                <p v-else @click="setClicked(true)"> {{ value }}</p>

            </div>
        </div>

        <hr>

    </div>
</template>

<style>


.value-container {
    cursor: url('../assets/edit-pen-icon.svg') -60 50, auto;
    
}
.value {
    display: inline-block;
    
}



.fieldNameContainer,
.fieldName {
    float: left;
    font-weight: 700;
    display: inline-block;

}

.fieldValue {
    margin-left: 1%;
    display: inline-block;
}
</style>