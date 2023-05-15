<script>
export default {
  props: {
    cardStyle:{
      default:''
    },
    headerStyle:{
      default: ''
    },
    titleStyle:{
      default:''
    },
    bodyStyle:{
      default:''
    }
  }
}
</script>

<template>
  <div :style="cardStyle" class="card">

    <div :style="headerStyle" v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>

    <div :style="bodyStyle" v-if="$slots.body" class="card-body">
      <h5 :style="titleStyle" class="card-title">
        <slot v-if="$slots.title" name="title"></slot>
      </h5>

      <slot v-if="$slots.body" name="body"></slot>
    </div>

  </div>
</template>
