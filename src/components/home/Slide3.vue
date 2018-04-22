<template>
  <div>
    <white-pattern color="black"></white-pattern>
    <el-row type="flex" justify="center" style="flex-wrap: wrap">
      <el-col :xs="22" :sm="20" :md="22" :lg="22" :xl="22">
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <transition name="app-fade-left">
            <el-col v-if="isLoadedSlide3"
                    id="sale_descr_col"
                    :xs="24" :sm="22" :md="10" :lg="10" :xl="8">
              <transition name="fade">
                <div v-for="sale in sales"
                     :key="sale.id"
                     v-if="Object.values(sales).indexOf(sale) === curSlide">
                  <div id="sale_descr_wrap">
                    <p id="sale_title">{{ sale.title | snippet(100)}}</p>
                    <p v-if="sale.description"
                       v-html="sale.description.slice(0, 300)"
                       id="sale_subtitle"></p>
                    <div align="left">
                      <router-link to="/news" exact>
                        <el-button id="all_sales_btn">
                          Все акции
                        </el-button>
                      </router-link>
                    </div>
                  </div>
                  <el-row id="mobile_controls">
                    <el-col :span="12">
                      <p class="sales_swiper_forward" @click="nextSale">
                        Вперед
                      </p>
                    </el-col>
                    <el-col :span="12">
                      <p class="sales_swiper_back" @click="prevSale">
                        Назад
                      </p>
                    </el-col>
                  </el-row>
                </div>
              </transition>
            </el-col>
          </transition>
          <transition name="app-fade-right">
            <el-col v-show="isLoadedSlide3"
                    id="sales_swiper"
                    :md="12" :lg="11" :xl="11">
              <swiper
                @slideChange="updateCurIndex"
                ref="salesSwiper"
                :options="swiperOption">
                <swiper-slide
                  v-for="sale in sales"
                  :key="sale.id">
                  <img v-if="sale.img_0" :src="sale.img_0.original">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
              <el-row type="flex" justify="center">
                <el-col :span="12" align="left">
                  <el-button  @click="salesSwiper.slideNext()" type="text" class="sales_swiper_forward">
                    Вперед
                  </el-button>
                </el-col>
                <el-col :span="12" align="right">
                  <el-button @click="salesSwiper.slidePrev()" type="text" class="sales_swiper_back">
                    Назад
                  </el-button>
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
        loop: true,
        speed: 700,
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
  methods: {
    loadNews () {
      this.$store.dispatch('loadNews', {type: 'sale'})
    },
    updateCurIndex () {
      this.curSlide = this.salesSwiper.realIndex
    },
    nextSale () {
      if (this.curSlide === this.sales.length - 1) {
        this.curSlide = 1
      } else {
        this.curSlide++
      }
    },
    prevSale () {
      if (this.curSlide === 0) {
        this.curSlide = this.sales.length - 1
      } else {
        this.curSlide--
      }
    }
  },
  computed: {
    salesSwiper () {
      if (this.$refs.salesSwiper) {
        return this.$refs.salesSwiper.swiper
      }
    },
    sales () {
      return this.$store.getters.news ? Object.values(this.$store.getters.news) : {}
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
  #sale_descr_col {
    padding-left: 40px;
    margin-top: 17vh;
  }

  #sale_descr_wrap {
  }

  #sale_title {
    font-family: $secondary-font;
    font-size: 32px;
    font-weight: 500;
    text-align: left;
    padding-right: 20px;
    color: $color-primary;
  }

  #sale_title:after {
    content: "";
    display: block;
    width: 45%;
    margin-top: 10px;
    border-bottom: 1px solid $color-primary;
  }

  #sale_subtitle {
    color: white;
    font-size: 12px;
    padding-right: 30px;
    text-align: left;
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
  .sales_swiper_forward,
  .sales_swiper_back {
    font-size: 12px;
    font-weight: 500;
    color: white;
    margin-top: 35px;
    transition: all .5s;
  }

  .sales_swiper_forward:hover,
  .sales_swiper_back:hover {
    cursor: pointer;
    text-shadow: $secondary-text-shadow
  }

  .sales_swiper_forward {
    text-align: left;
  }

  .sales_swiper_back {
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

  .sales_swiper_forward:before {
    @include control_line;
  }

  .sales_swiper_back:before {
    @include control_line;
    right: 0;
  }

  #mobile_controls {
    display: none;
  }

  /* MEDIA */
  @media only screen and (max-width: $sm-screen) {
    #sales_swiper {
      display: none;
    }
    #mobile_controls {
      display: block;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #sale_descr_col {
      margin-top: 8vh;
      padding-left: 10px;
    }

    #sale_title {
      margin-top: 20px;
      font-size: 20px;
    }
  }
</style>
