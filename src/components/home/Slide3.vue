<template>
  <div id="slide_3">
    <white-pattern color="black"></white-pattern>
    <el-row type="flex" justify="center" style="flex-wrap: wrap">
      <el-col :span="22">
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col :xs="24" :sm="22" :md="10" :lg="10" :xl="8">
            <div id="title_3">
              <p id="title_3_main" align="left">
                <span class="dark_title"> ПРИ ПОКУПКЕ </span>
                <span class="white_title"> 2Х </span> <br>
                <span class="dark_title"> ВТУЛОК </span>
                <span class="white_title"> 3УЮ </span> <br>
                <span class="dark_title"> ЗАБТРАЕТЕ </span> <br>
                <span class="white_title"> В ПОДАРОК! </span>
              </p>
              <p id="title_3_sub" align="left">
                Драм-машина представляет собой тетрахорд. Показательный пример – струна представляет собой
                микрохроматический интервал. Техника полифигурно начинает рефрен. Плотностная компонентная форма,
                как бы это ни казалось парадоксальным, сонорна.
              </p>
              <div align="left">
                <router-link to="/news" exact>
                  <el-button id="all_sales_btn">
                    ВСЕ АКЦИИ
                  </el-button>
                </router-link>
              </div>
            </div>
          </el-col>
          <el-col id="sales_swiper"
                  :md="12" :lg="11" :xl="11" align="right">
            <swiper
              ref="salesSwiper"
              :options="swiperOption">
              <swiper-slide>
                <img src="@/assets/img/home/slide_3_three.png" alt="">
              </swiper-slide>
              <swiper-slide>
                <img src="@/assets/img/home/slide_3_two.png" alt="">
              </swiper-slide>
              <swiper-slide>
                <img src="@/assets/img/home/slide_3_one.png" alt="">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <el-row>
              <el-col :span="12">
                <p id="sales_swiper_forward" @click="salesSwiper.slideNext()">
                  Вперед
                </p>
              </el-col>
              <el-col :span="12">
                <p id="sales_swiper_back" @click="salesSwiper.slidePrev()">
                  Назад
                </p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import WhitePattern from './WhitePattern'
export default {
  name: 'Slide3',
  components: {WhitePattern},
  data () {
    return {
      swiperOption: {
        effect: 'cube',
        grabCursor: true,
        loop: true,
        cubeEffect: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  computed: {
    salesSwiper () {
      if (this.$refs.salesSwiper) {
        return this.$refs.salesSwiper.swiper
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #slide_3 {
    margin-top: 17vh;
  }

  #title_3 {
    padding-left: 40px;
  }

  #title_3_main:after {
    content: "";
    display: block;
    width: 45%;
    margin-top: 10px;
    border-bottom: 1px solid $color-primary;
  }

  #title_3_sub {
    color: white;
    font-size: 12px;
    padding-right: 30px;
  }

  @mixin slide_3_title {
    font-family: $secondary-font;
    font-size: 34px;
    font-weight: 500;
  }

  .dark_title {
    @include slide_3_title;
    color: $color-primary;
  }

  .white_title {
    @include slide_3_title;
    color: white;
  }

  #all_sales_btn {
    font-size: 13px;
    font-weight: 500;
    background: $color-primary;
    color: white;
    width: 150px;
    border: none;
    border-radius: 2px;
  }

  /* SWIPER */
  #sales_swiper {
    height: 400px;
    padding-left: 50px;
  }

  #sales_swiper img {
    object-fit: cover;
    height: 400px;
    width: 100%;
  }

  /* controls */

  #sales_swiper_forward, #sales_swiper_back {
    font-size: 12px;
    font-weight: 500;
    color: white;
    margin-top: 35px;
    transition: all .5s;
  }

  #sales_swiper_forward:hover,
  #sales_swiper_back:hover {
    cursor: pointer;
    text-shadow: $secondary-text-shadow
  }

  #sales_swiper_forward {
    text-align: left;
  }

  #sales_swiper_back {
    text-align: right;
  }

  @mixin control_line {
    content: '';
    display: block;
    position: absolute;
    width: 20%;
    top: 22px;
    border-top: 2px solid $color-primary;
  }

  #sales_swiper_forward:before {
    @include control_line;
  }

  #sales_swiper_back:before {
    @include control_line;
    right: 0;
  }

  /* MEDIA */
  @media only screen and (max-width: $sm-screen) {
    #sales_swiper {
      display: none;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #slide_3 {
      margin-top: 8vh;
    }

    #title_3_main {
      margin-top: 20px;
    }
    .dark_title, .white_title {
      font-size: 20px;
    }
  }
</style>
