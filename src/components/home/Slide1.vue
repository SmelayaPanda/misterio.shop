<template>
  <div id="slide_1">
    <div id="title">
      <transition :name="this.$vuetify.breakpoint.name === 'xs' ? '' : 'svg-fade'">
        <div v-if="isLoadedSlide1" id="main_title_1">
          <img src="@/assets/icons/home/slide_1/text_one.svg" height="43px" alt="">
        </div>
      </transition>
      <transition name="home-fade">
        <p v-if="isLoadedSlide1" id="main_title_2" align="left">
          МЫ ЗНАЕМ ВСЁ<br v-if="this.$vuetify.breakpoint.name !== 'xs'">
          <span class="ml-5">О ВАШИХ ЖЕЛАНИЯХ</span>
        </p>
      </transition>
      <transition :name="this.$vuetify.breakpoint.name === 'xs' ? '' : 'svg-fade'">
        <p v-if="isLoadedSlide1" id="main_title_3" align="right">
          <img src="@/assets/icons/home/slide_1/text_two.svg" height="28px" alt=""><br>
          <router-link to="/shop">
            <app-theme-btn
              class="mt-4"
              type="primary"
              width="170px">
              Выбрать товар
            </app-theme-btn>
          </router-link>
        </p>
      </transition>
    </div>
  </div>
</template>

<script>
import WhitePattern from './WhitePattern'

export default {
  name: 'Slide1',
  components: {WhitePattern},
  data () {
    return {
      isLoadedSlide1: false
    }
  },
  mounted () {
    this.isLoadedSlide1 = true
  },
  created () {
    this.$bus.$on('isHomeSlide1', () => {
      this.isLoadedSlide1 = true
    })
    this.$bus.$on('isHomeSlide2', () => {
      this.isLoadedSlide1 = false
    })
    this.$bus.$on('isHomeSlide3', () => {
      this.isLoadedSlide1 = false
    })
    this.$bus.$on('isHomeSlide4', () => {
      this.isLoadedSlide1 = false
    })
  }
}
</script>

<style scoped lang="scss">
  #title {
    position: absolute;
    left: 54%;
    top: 150px;
    margin-right: 70px;
  }

  #main_title_1 {
    display: flex;
    justify-content: start;
  }

  #main_title_2 {
    position: relative;
    font-family: $secondary-font;
    font-size: 42px;
    margin-bottom: 0;
    padding-right: 30px;
    background: linear-gradient(30deg, $color-secondary 33%, white 50%, $color-secondary 65%);
    color: transparent;
    -webkit-background-clip: text;
  }

  #main_title_3 {
    position: relative;
    color: white;
    font-weight: bold;
    font-size: 32px;
    margin-top: -8px;
  }

  /* home-fade */
  .home-fade-enter-active {
    transition: all 1s ease;
    animation: main-text-animation 1.5s ease;
  }

  .home-fade-leave-active {
    transition: all 1.5s cubic-bezier(1.0, 0.5, 0.5, 1.0);
  }

  .home-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }

  @keyframes main-text-animation {
    0% {
      opacity: 0;
      filter: blur(4px);
      transform: translateX(-52px);
    }
    20% {
      filter: blur(5px);
      transform: translateX(-55px);
    }
    100% {
      opacity: 1;
      filter: blur(0px);
      transform: translateX(0);
    }
  }

  /* svg-fade */
  .svg-fade-enter-active {
    transition: all 1s ease;
    animation: svg-text-animation 1.5s ease;
  }

  .svg-fade-leave-active {
    transition: all 1.5s cubic-bezier(1.0, 0.5, 0.5, 1.0);
  }

  .svg-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }

  @keyframes svg-text-animation {
    0% {
      opacity: 0;
      filter: blur(4px);
      transform: translateX(82px);
    }
    20% {
      filter: blur(5px);
      transform: translateX(85px);
    }
    100% {
      opacity: 1;
      filter: blur(0px);
      transform: translateX(0);
    }
  }

  @media only screen and (max-width: $md-screen) {
    #main_title_2 {
      font-size: 35px;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #title {
      position: absolute;
      left: 0;
      top: 0;
      margin-right: 30px;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: inset 0 0 6px rgba(35, 35, 35, 0.85)
    }
    #main_title_1 {
      margin-left: 20px;
      margin-top: 37vh;
    }
    #main_title_2 {
      font-size: 24px;
      margin-left: 40px;
      background: linear-gradient(10deg, $color-secondary 33%, white 50%, $color-secondary 65%);
      color: transparent;
      -webkit-background-clip: text;
    }
    #main_title_3 {
      margin-right: 20px;
    }
  }
</style>
