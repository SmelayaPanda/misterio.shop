<template>
  <div class="home_page">
    <transition-group name="welcome">
      <loading-misterio v-show="!isLoadedHome"
                        key="1"
                        id="misterio_shop_wrap">
      </loading-misterio>
      <div v-show="isLoadedHome" key="2">
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
          <user-live-chat
            :color="curSlide === 2 ? 'black' : 'red'"
            :chatId="this.$store.getters.user.uid"
            :isCollapsed="true"
            class="live_chat">
          </user-live-chat>
        </div>
        <div>
          <a id="phone_number"
             :class="curSlide === 2 ? 'primary--text' : ''"
             :href="'tel://' + companyInfo.contacts.phone.replace(/[ -]/g,'')">
            {{ companyInfo.contacts.phone.slice(0, 5) }}
            <b>{{ companyInfo.contacts.phone.slice(5, 15) }}</b>
          </a>
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
        <v-btn v-if="curSlide !== 3" @click="swiper.slideNext()"
               id="home_down_btn" fab class="secondary white--text">
          <v-icon>keyboard_arrow_down</v-icon>
        </v-btn>
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
import UserLiveChat from '@/components/live_chat/UserLiveChat'
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
    UserLiveChat,
    Slide1,
    Slide2,
    Slide3,
    Slide4
  },
  data () {
    return {
      isMountedHome: false,
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
      let slideNo = this.curSlide + 1
      this.$bus.$emit('isHomeSlide' + slideNo)
    }
  },
  computed: {
    swiper () {
      if (this.$refs.homeSwiper) {
        return this.$refs.homeSwiper.swiper
      }
    },
    companyInfo () {
      return this.$store.getters.companyInfo
    },
    isLoadedHome () {
      return this.isMountedHome &&
          this.$store.getters.news &&
          this.$store.getters.companyInfo.photos
    }
  },
  mounted () {
    setInterval(() => {
      this.isMountedHome = true
    }, 500)
  }
}
</script>

<style scoped lang="scss">
  /*
  home slide-fade
  -----------
  -enter
  -enter-active
  -enter-to
  -----------
  -leave
  -leave-active
  -leave-to
  -----------
  */
  .welcome-enter {
  }

  .welcome-enter-active {
    transition: 2.5s;
    opacity: 0;
  }

  .welcome-enter-to {
  }

  /* --------------- */
  .welcome-leave {
  }

  .welcome-leave-active {
    transition: 2.5s cubic-bezier(1, 0.8, 0.8, 1);
    opacity: 1;
  }

  .welcome-leave-to {
    transform: translateY(30px);
    opacity: 0;
  }

  /* END transitions */

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
      font-size: 12px;
      color: white;
      @include rotate(-90deg);
    }
    #flip_down:after {
      content: "";
      display: block;
      width: 60px;
      margin: 5px auto;
      border-bottom: 1px solid $color-secondary;
      animation: colorchange 6s;
      animation-iteration-count: infinite;
    }
  }

  @keyframes colorchange {
    0% {
      border-bottom: 1px solid $color-secondary
    }
    50% {
      border-bottom: 1px solid white
    }
    100% {
      border-bottom: 1px solid $color-secondary
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

  #home_down_btn {
    display: none;
  }

  @media only screen and (max-width: $sm-screen) {
    #phone_number {
      font-size: 13px;
      bottom: 25px;
      left: 50%;
      transform: translateX(-56px);
    }

    #flip_down, .social_icons {
      display: none;
    }
    .live_chat {
      bottom: 10px;
    }

    #home_down_btn {
      display: block;
      z-index: 4000;
      position: fixed;
      left: 14px;
      bottom: 12px;
    }

    #home_down_btn:hover {
      cursor: pointer;
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
