<script>

export default {
    props: {
        current: {
            default: 0
        },
        total: {
            default: 1
        },
    }
}
</script>  

<template>
    <div class="row completedRow">
        <div class="col-3"></div>
        <div class="col-6 completed" >Completed: {{ current }}/{{ total }}</div>
        <div class="col-3"></div>
    </div>
    <div class="row progress">
        <div class="col-4"></div>
        <div class="col-4">

            <progress class="progressBar" :value="current" :max="total" />
        </div>
        
    </div>
</template>

<style>

.completedRow{
    margin-top:15%
}

.progress {
    height: 10%;
    background-color: transparent;
    display: flex;
    text-align: center;
}

.progressBar {
    display: inline;
    width: 100%;
}

</style>