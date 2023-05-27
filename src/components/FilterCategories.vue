
<script>
export default {
    props: ['title', 'options'],

    data() {
        return {
            branches:[],
            showBranches: true,

            minimalAvailableDaysPerWeek: 5
        }
    },

    watch:{
        branches:{
            deep: true,
            handler(){
                this.$emit('filtersUpdated')
            }
        },
        minimalAvailableDaysPerWeek:{
            deep: true,
            handler(){
                this.$emit('filtersUpdated')
            }
        },
        
    }

};
</script>


<template>
    <div class="category">
        <div class="category-header" @click="showBranches = !showBranches">
            <span class="arrow" :class="{ 'expanded': showBranches }">
                Branches</span>
        </div>
        <div class="branch-options" v-if="showBranches">
            <div class="branch" v-for="branch in branches" :key="branch.name" @click="branch.checked = !branch.checked">
                <input class="branch-checkbox" type="checkbox" v-model="branch.checked">
                {{ branch.name }}
            </div>
        </div>
    </div>

    <div class="category">
        <label class="label-days" for="available-days">Min. Available Days Per Week</label>
        <select id="available-days" v-model="minimalAvailableDaysPerWeek">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    </div>
</template>
  

<style>
.category-header {
    cursor: pointer;
}

.category {
    margin-bottom: 1rem
}

.label-days {
    margin-right: 0.5rem;
}

.arrow::after {
    content: '\25B8';
    /* Right-pointing arrow */
    display: inline-block;
    margin-right: 5px;
    transform: rotate(0deg);
    transition: transform 0.2s;
}

.arrow.expanded::after {
    transform: rotate(90deg);
}

.branch:hover {
    background-color: rgba(128, 128, 128, 0.103);
    cursor: pointer;
}

.branch-checkbox {
    cursor: pointer;
}
</style>