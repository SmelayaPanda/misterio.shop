<template>
  <div class="home_page">
    <transition-group name="slide-fade">
      <div v-if="this.isLoadingHome"
           key="1"
           id="misterio_shop_wrap">
        <loading-misterio></loading-misterio>
      </div>
      <div v-else key="2">
        <!-- MOBILE -->
        <mobile-menu></mobile-menu>
        <!-- DESCTOP -->
        <app-header
          :color="curSlide === 2 ? 'black' : 'red'"
          class="app_header">
        </app-header>
        <social-icons
          :color="curSlide === 2 ? 'black' : 'red'"
          class="social_icons">
        </social-icons>
        <!--LIVE CHAT-->
        <div class="live_chat">
          <live-chat
            :color="curSlide === 2 ? 'black' : 'red'"
            :chatId="this.$store.getters.user.uid"
            :isUserSide="true"
            :isCollapsed="true"
            class="live_chat">
          </live-chat>
        </div>
        <div
          :class="curSlide === 2 ? 'primary--text' : ''"
          id="phone_number">
          +7 (800) <b>100 66 66</b>
        </div>
        <div v-if="curSlide !== 3" id="flip_down_wrapper" @click="swiper.slideNext()">
          <p id="flip_down">
            Листай вниз
          </p>
        </div>
        <div id="swiper_bullets">
          <div
            v-for="i in 4" :key="i"
            @click="swiper.slideTo(i - 1)"
            class="bullet_wrapper">
            <div :class="curSlide === i - 1 ? 'active_bullet' : 'bullet'"></div>
          </div>
        </div>
        <swiper
          @slideChange="updateCurIndex"
          :options="swiperOption"
          ref="homeSwiper"
          class="swiper_slide">
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
    </transition-group>
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
import LoadingMisterio from './LoadingMisterio'
import MobileMenu from '../MobileMenu'

export default {
  name: 'Home',
  components: {
    MobileMenu,
    LoadingMisterio,
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
      isLoadingHome: true,
      curSlide: 0,
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 1,
        initialSlide: 0,
        effect: 'fade',
        speed: 1000,
        spaceBetween: 0,
        mousewheel: true
      }
    }
  },
  methods: {
    updateCurIndex () {
      this.curSlide = this.swiper.realIndex
    }
  },
  computed: {
    swiper () {
      if (this.$refs.homeSwiper) {
        return this.$refs.homeSwiper.swiper
      }
    }
  },
  mounted () {
    let t = setInterval(() => {
      if (document.readyState === 'complete') {
        this.isLoadingHome = false
        clearInterval(t)
      }
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
  .home_page {
    overflow: hidden
  }

  .swiper_slide {
    /*background: url("../../../static/bg/home/draft_bg.png") no-repeat;*/
    /*background-size: cover;*/
    /*background: url("../../../static/bg/home/wthite_pattern.svg") no-repeat center;*/
    /*background-size: cover;*/
    width: 100vw;
    height: 100vh;
  }

  /*  background: linear-gradient(to right, $color-primary, $color-primary-light);*/
  .slide_1 {
    /*background: url("../../../static/bg/home/draft_bg.png") no-repeat center;*/
    background-size: cover;
  }

  .slide_2 {
    background: linear-gradient(to right, $color-primary-light, $color-primary);
  }

  .slide_3 {
    background: linear-gradient(to right, $color-secondary-dark, $color-secondary-ultra-dark)
  }

  .slide_4 {
    background: linear-gradient(to right, $color-primary-light, $color-primary);
  }

  #misterio_shop_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
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
    position: fixed;
    z-index: 3;
    bottom: 40px;
    right: 60px;
  }

  #swiper_bullets {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }

  .bullet_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 20px;
  }

  .bullet_wrapper:hover {
    cursor: pointer;
    .bullet {
      background: white;
    }
  }

  .bullet {
    background: $color-secondary;
    width: 2px;
    height: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
    transition: all .5s;
  }

  .active_bullet {
    background: white;
    width: 2px;
    height: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
    transition: all .5s;
  }

  @media only screen and (max-width: $sm-screen) {
    #phone_number {
      font-size: 13px;
      bottom: 25px;
      left: 20px;
    }

    #flip_down, .social_icons {
      display: none;
    }
    .live_chat {
      bottom: 10px;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #swiper_bullets {
      display: none;
    }
    .live_chat {
      bottom: 15px;
      right: 20px;
    }
  }
</style>
