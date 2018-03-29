<template>
  <div class="full_slide">
    <slot name="bg_image"></slot>
    <slot name="content"></slot>
  </div>
</template>

<script>

export default {
  name: 'HomeFrame',
  components: {},
  methods: {
    nextSlide () {
      console.log('Next')
    }
  }
}
</script>

<style scoped lang="scss">
  .full_slide {
    z-index: 1;
  }
</style>
