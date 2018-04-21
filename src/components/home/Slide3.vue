<template>
  <div>
    <white-pattern color="black"></white-pattern>
    <el-row type="flex" justify="center" style="flex-wrap: wrap">
      <el-col :span="22">
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <transition name="app-fade-left">
            <el-col v-if="isLoadedSlide3" id="slide_3_left" :xs="24" :sm="22" :md="10" :lg="10" :xl="8">
              <div v-for="sale in sales"
                   :key="sale.id"
                   v-if="Object.values(sales).indexOf(sale) === curSlide">
                <p id="title_3_main" align="left">
                  <span class="dark_title">
                    {{ sale.title | snippet(100)}}
                  </span>
                  <!--<span class="dark_title"> ПРИ ПОКУПКЕ </span>-->
                  <!--<span class="white_title"> 2Х </span> <br>-->
                  <!--<span class="dark_title"> ВТУЛОК </span>-->
                  <!--<span class="white_title"> 3УЮ </span> <br>-->
                  <!--<span class="dark_title"> ЗАБТРАЕТЕ </span> <br>-->
                  <!--<span class="white_title"> В ПОДАРОК! </span>-->
                </p>
                <p v-if="sale.description"
                   v-html="sale.description.slice(0, 300)"
                   id="title_3_sub" align="left"></p>
                <div align="left">
                  <router-link to="/news" exact>
                    <el-button id="all_sales_btn">
                      Все акции
                    </el-button>
                  </router-link>
                </div>
              </div>
            </el-col>
          </transition>
          <transition name="app-fade-right">
            <el-col v-show="isLoadedSlide3"
                    id="sales_swiper"
                    :md="12" :lg="11" :xl="11" align="right">
              <swiper
                @slideChange="updateCurIndex"
                ref="salesSwiper"
                :options="swiperOption">
                <swiper-slide
                  v-for="sale in sales"
                  :key="sale.id">
                  <img v-if="sale.img_0" :src="sale.img_0.original" alt="">
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
          </transition>
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
      isLoadedSlide3: false,
      curSlide: 0,
      loadedNews: {},
      swiperOption: {
        effect: 'cube',
        grabCursor: true,
        cubeEffect: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          speed: 1000,
          shadowScale: 0.94
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  methods: {
    loadNews () {
      this.$store.dispatch('loadNews')
    },
    updateCurIndex () {
      this.curSlide = this.salesSwiper.realIndex
    }
  },
  computed: {
    salesSwiper () {
      if (this.$refs.salesSwiper) {
        return this.$refs.salesSwiper.swiper
      }
    },
    sales () {
      return this.$store.getters.news ? Object.values(this.$store.getters.news).filter(el => el.type === 'sale') : {}
    }
  },
  created () {
    this.loadNews()
    this.$bus.$on('isHomeSlide1', () => {
      this.isLoadedSlide3 = false
    })
    this.$bus.$on('isHomeSlide2', () => {
      this.isLoadedSlide3 = false
    })
    this.$bus.$on('isHomeSlide3', () => {
      this.isLoadedSlide3 = true
    })
    this.$bus.$on('isHomeSlide4', () => {
      this.isLoadedSlide3 = false
    })
  }
}
</script>

<style scoped lang="scss">
  #slide_3_left {
    padding-left: 40px;
    margin-top: 17vh;
  }

  #title_3_main {
    padding-right: 20px;
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
    font-size: 32px;
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
    font-size: 14px;
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
    margin-top: 17vh;
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
    #slide_3_left {
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
