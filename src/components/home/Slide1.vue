<template>
  <div id="slide_1">
    <white-pattern color="white"></white-pattern>
    <div id="title" class="hidden-sm-and-down">
      <transition name="svg-fade">
        <div v-if="showMainTitle" id="main_title_1">
          <img src="@/assets/icons/home/slide_1/text_one.svg" height="50px" alt="">
        </div>
      </transition>
      <transition name="home-fade">
        <p v-if="showMainTitle" id="main_title_2" align="left">
          МЫ ЗНАЕМ ВСЁ<br>
          О ВАШИХ ЖЕЛАНИЯХ
        </p>
      </transition>
      <transition name="svg-fade">
        <p v-if="showMainTitle" id="main_title_3" align="right">
          <img src="@/assets/icons/home/slide_1/text_two.svg" height="34px" alt=""><br>
          <router-link to="/shop">
            <app-theme-btn
              class="mt-4"
              type="primary"
              width="178px"
              fontSize="12px">
              ВЫБРАТЬ ТОВАР
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
      showMainTitle: false
    }
  },
  mounted () {
    setInterval(() => {
      this.showMainTitle = true
    }, 2250)
  }

}
</script>

<style scoped lang="scss">
  #title {
    position: absolute;
    left: 54%;
    top: 132px;
    margin-right: 70px;
  }

  #main_title_1 {
    display: flex;
    justify-content: start;
  }

  #main_title_2 {
    position: relative;
    font-family: $secondary-font;
    font-size: 45px;
    margin-bottom: 0;
    padding-right: 30px;
    background: linear-gradient(55deg, $color-secondary 32%, $color-info 55%, $color-secondary 63%);
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
</style>
