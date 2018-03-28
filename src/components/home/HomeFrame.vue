<template>
  <div class="full_slide">
    <user-icons></user-icons>
    <social-icons></social-icons>
    <app-header></app-header>
    <div id="flip_down_wrapper">
      <p id="flip_down">Листай вниз</p>
    </div>
    <slot name="bg_image"></slot>
    <slot name="content"></slot>
  </div>
</template>

<script>
import UserIcons from '@/components/home/UserIcons'
import SocialIcons from '@/components/home/SocialIcons'
import AppHeader from '@/components/home/Header'

export default {
  name: 'HomeFrame',
  components: {
    SocialIcons,
    UserIcons,
    AppHeader
  },
  methods: {
    nextSlide () {
      console.log('Next')
    }
  }
}
</script>

<style scoped lang="scss">
  .full_slide {
    z-index: 10;
  }

  #flip_down_wrapper {
    position: absolute;
    bottom: 12px;
    left: 50%;
    @include translateX(-43px);
    #flip_down {
      font-size: 11px;
      color: white;
      @include rotate(-90deg);
    }
    #flip_down:after {
      content: "";
      display: block;
      width: 60px;
      margin: 5px auto;
      border-bottom: 1px solid $color-secondary;
    }
  }
</style>
