<template>
  <div class="home_page">
    <swiper :options="swiperOption" ref="homeSwiper" class="swiper_slide">
      <swiper-slide class="slide_1">
        <home-frame>
          <slide1 slot="content"></slide1>
        </home-frame>
      </swiper-slide>
      <swiper-slide class="slide_2">
        <home-frame>
          <slide2 slot="content"></slide2>
        </home-frame>
      </swiper-slide>
      <swiper-slide class="slide_3">
        <home-frame>
          <slide3 slot="content"></slide3>
        </home-frame>
      </swiper-slide>
      <swiper-slide class="slide_4">
        <home-frame>
          <slide4 slot="content"></slide4>
        </home-frame>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import HomeFrame from '@/components/home/HomeFrame'
import Slide1 from '@/components/home/Slide1'
import Slide2 from '@/components/home/Slide2'
import Slide3 from '@/components/home/Slide3'
import Slide4 from '@/components/home/Slide4'

export default {
  name: 'Home',
  components: {
    HomeFrame,
    Slide1,
    Slide2,
    Slide3,
    Slide4
  },
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 1,
        speed: 1000,
        spaceBetween: 0,
        mousewheel: true
      }
    }
  },
  methods: {
    nextSlide (index) {
      this.swiper.slideNext()
    }
  },
  computed: {
    swiper () {
      return this.$refs.homeSwiper.swiper
    }
  }
}
</script>

<style scoped lang="sass">
  .home_page
    overflow: hidden
    .swiper_slide
      background: url("../../../static/bg/home/draft_bg.png") no-repeat
      width: 100vw
      height: 100vh
      z-index: 2
    .slide_1
    .slide_2
      background: linear-gradient(to right, #161516, #0d0d0d)
    .slide_3
      background: linear-gradient(to right, $--color-secondary, #0d0d0d)
    .slide_4
      background: linear-gradient(to right, #161516, #0d0d0d)
</style>
