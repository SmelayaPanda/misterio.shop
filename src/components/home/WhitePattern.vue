<template>
  <img v-if="color === 'white'" class="white_pattern" src="@/assets/img/home/white_pattern.svg" alt="">
  <img v-else class="white_pattern" style="opacity: 0.30" src="@/assets/img/home/black_pattern.svg" alt="">
</template>

<script>
export default {
  name: 'WhitePattern',
  props: ['color']
}
</script>

<style scoped>
  .white_pattern {
    position: absolute;
    height: 100vh;
    transform: scale(1.35);
    opacity: 0.15;
    left: 0;
    top: 0;
    z-index: 0;
  }
</style>
