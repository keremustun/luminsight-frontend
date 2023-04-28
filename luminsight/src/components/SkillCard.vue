<script>
export default {
  props: {
    stars: {
      default: 4
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-header">Add a skill</div>
    <div class="card-body">
      <h5 class="card-title">C#</h5>
      <p class="card-text">
        <i v-for="x in stars" class="bi bi-star-fill"></i>
        <i v-for="x in 5 - (stars ?? 0)" class="bi bi-star"></i>
      </p>
      <a href="#" class="btn btn-primary">Save</a>
    </div>
  </div>
</template>

<style scoped></style>
