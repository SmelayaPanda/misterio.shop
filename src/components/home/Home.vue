<template>
  <div class="home_page">
    <app-header class="app_header"></app-header>
    <social-icons class="social_icons"></social-icons>
    <!--LIVE CHAT-->
    <div v-if="this.$store.getters.user" class="live_chat">
      <live-chat :chatId="this.$store.getters.user.uid"
                 :isUserSide="true"
                 :isCollapsed="true"
                 class="live_chat">
      </live-chat>
    </div>
    <div id="phone_number">+7 (800) <b>100 66 66</b></div>
    <div id="flip_down_wrapper" @click="nextSlide">
      <p id="flip_down">Листай вниз</p>
    </div>
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
import AppHeader from '@/components/Header'
import UserIcons from '@/components/UserIcons'
import SocialIcons from '@/components/home/SocialIcons'
import LiveChat from '@/components/shared/LiveChat'
import Slide1 from '@/components/home/Slide1'
import Slide2 from '@/components/home/Slide2'
import Slide3 from '@/components/home/Slide3'
import Slide4 from '@/components/home/Slide4'

export default {
  name: 'Home',
  components: {
    HomeFrame,
    AppHeader,
    UserIcons,
    SocialIcons,
    LiveChat,
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
        initialSlide: 0,
        loop: true,
        effect: 'fade',
        speed: 1000,
        spaceBetween: 0,
        mousewheel: true
      }
    }
  },
  methods: {
    nextSlide () {
      console.log(this.swiper.realIndex)
      this.swiper.slideNext()
    }
  },
  computed: {
    swiper () {
      if (this.$refs.homeSwiper) {
        return this.$refs.homeSwiper.swiper
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .home_page {
    overflow: hidden
  }

  .swiper_slide {
    background: url("../../../static/bg/home/draft_bg.png") no-repeat;
    width: 100vw;
    height: 100vh;
    background-size: cover;
  }

  .slide_1 {
    background: linear-gradient(to right, $color-primary, $color-primary-light);
  }

  .slide_2 {
    background: linear-gradient(to right, $color-primary-light, $color-primary);
  }

  .slide_3 {
    background: linear-gradient(to right, $color-secondary, $color-primary)
  }

  .slide_4 {
    background: linear-gradient(to right, $color-primary-light, $color-primary);
  }

  .app_header {
    position: absolute;
    z-index: 2;
    width: 100vw;
  }

  .social_icons {
    position: absolute;
    z-index: 2;
  }

  #flip_down_wrapper {
    position: absolute;
    z-index: 2;
    bottom: 12px;
    left: 50%;
    @include translateX(-43px);
    :hover {
      cursor: pointer;
    }
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

  #phone_number {
    position: absolute;
    z-index: 2;
    bottom: 54px;
    left: 40px;
    font-size: 19px;
    color: $color-secondary;
  }

  .live_chat {
    position: absolute;
    z-index: 3;
    bottom: 20px;
    right: 30px;
  }
</style>
