<script>
export default{
  props:{
    headerBackgroundColor:{
      default:''
    },
    headerColor:{
      default:''
    }
  }
}
</script>

<template>
  <div class="card">
    
    <div :style="{ backgroundColor: headerBackgroundColor, color: headerColor }" v-if="$slots.header" class="card-header">
  <slot name="header"></slot>
</div>

    <div class="card-body">
      <h5 class="card-title">
        <slot v-if="$slots.title" name="title"></slot>
      </h5>
      
      <slot v-if="$slots.body" name="body"></slot>
    </div>

  </div>
</template>

<style>

</style>