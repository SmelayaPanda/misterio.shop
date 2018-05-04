<template>
  <div>
    <white-pattern color="white"></white-pattern>
    <transition :name="this.$vuetify.breakpoint.name === 'xs' ? '' : 'app-fade-left'">
      <h1 v-if="isLoadedSlide2" id="slide_2_title">
        НАШИ СИЛЬНЫЕ СТОРОНЫ
      </h1>
    </transition>
    <el-row type="flex" justify="center" style="flex-wrap: wrap">
      <transition :name="this.$vuetify.breakpoint.name === 'xs' ? '' : 'app-fade-left'">
        <el-col v-if="isLoadedSlide2" :xs="24" :sm="20" :md="20" :lg="15" :xl="12">
          <el-row type="flex" justify="center" style="flex-wrap: wrap">
            <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
              <div class="adv_icon_wrap">
                <img src="@/assets/icons/home/quality.svg" id="quality_icon" class="adv_icon" alt="">
              </div>
              <p class="advantage_title" align="left">
                ПОДБИРАЕМ ДЛЯ ВАС ЛУЧШИЕ ТОВАРЫ
              </p>
              <p class="adv_text" align="left">
                На нашем сайте представлена процукция,
                которая прошла необходимые проверки и имеет соответствующие сертификаты
              </p>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
              <div class="adv_icon_wrap">
                <img src="@/assets/icons/home/anonym.svg" id="anonym_icon" class="adv_icon" alt="">
              </div>
              <p class="advantage_title" align="left">
                ЭТО ОСТАЕТСЯ НАШЕЙ ТАЙНОЙ
              </p>
              <p class="adv_text" align="left">
                Мы запрашиваем минимум информации для доставки,
                а все заказы доставляются в упаковке без опознавательных знаков
              </p>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
              <div class="adv_icon_wrap">
                <img src="@/assets/icons/home/present.svg" id="present_icon" class="adv_icon" alt="">
              </div>
              <p class="advantage_title" align="left">
                ПОДАРКИ К КАЖДОМУ ЗАКАЗУ
              </p>
              <p class="adv_text" align="left">
                При заказе до 3000 рублей – лубрикант-пробник
                При заказе от 3000 рублей – вагинальный лубрикант
              </p>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
              <div class="adv_icon_wrap">
                <img src="@/assets/icons/home/delivery.svg" id="delivery_icon" class="adv_icon" alt="">
              </div>
              <p class="advantage_title" align="left">
                БЕСПЛАТНАЯ ДОСТАВКА ОТ 3000 тысяч рублей
              </p>
              <p class="adv_text" align="left">
                Вне зависимости от способа доставки (курьер, почта, Pick Point, СДЭК)
              </p>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
              <div class="adv_icon_wrap">
                <img src="@/assets/icons/home/price.svg" id="price_icon" class="adv_icon" alt="">
              </div>
              <p class="advantage_title" align="left">
                ПРИЯТНЫЕ ЦЕНЫ НА ТОВАРЫ И СКИДКИ
              </p>
              <p class="adv_text" align="left">
                Мы подумали о Вас и сделали цены низкими.
                Также у нас регулярно проводятся акции, имеются скидки
              </p>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
              <div class="adv_icon_wrap">
                <img src="@/assets/icons/home/see_product.svg" id="see_product_icon" class="adv_icon" alt="">
              </div>
              <p class="advantage_title" align="left">
                ОСМОТР И ПРОВЕРКА ТОВАРА ПРИ ДОСТАВКЕ
              </p>
              <p class="adv_text" align="left">
                Вы можете проверить работоспособность при получении заказа и,
                в случае брака, вернуть товар (подробнее в разделе «Возврат и гарантия»)
              </p>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
              <div class="adv_icon_wrap">
                <img src="@/assets/icons/home/support.svg" id="support_icon" class="adv_icon" alt="">
              </div>
              <p class="advantage_title" align="left">
                ИНДИВИДУАЛЬНЫЙ ПОДХОД К КЛИЕНТАМ
              </p>
              <p class="adv_text" align="left">
                Вы можете задать вопрос нашему консультанту, заполнив форму на сайте
              </p>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
              <router-link to="/about" exact>
                <div id="more_btn_wrap">
                  <app-theme-btn :width="this.$vuetify.breakpoint.name === 'xs' ? '130px' : '170px'" id="more_btn">
                    Подробнее
                    <i class="el-icon-d-arrow-right"></i>
                  </app-theme-btn>
                </div>
              </router-link>
            </el-col>
          </el-row>
        </el-col>
      </transition>
      <!--IMG-->
      <transition :name="this.$vuetify.breakpoint.name === 'xs' ? '' : 'app-fade-right'">
        <el-col v-if="isLoadedSlide2" :md="6" :lg="5" :xl="4" id="back_girl">
          <img src="@/assets/img/home/slide_2_lady.png" alt="">
        </el-col>
      </transition>
    </el-row>
  </div>
</template>

<script>
import WhitePattern from './WhitePattern'

export default {
  name: 'Slide2',
  components: {WhitePattern},
  data () {
    return {
      isLoadedSlide2: false
    }
  },
  created () {
    this.$bus.$on('isHomeSlide1', () => {
      this.isLoadedSlide2 = false
    })
    this.$bus.$on('isHomeSlide2', () => {
      this.isLoadedSlide2 = true
    })
    this.$bus.$on('isHomeSlide3', () => {
      this.isLoadedSlide2 = false
    })
    this.$bus.$on('isHomeSlide4', () => {
      this.isLoadedSlide2 = false
    })
  }
}
</script>

<style scoped lang="scss">
  #slide_2_title {
    position: relative;
    font-family: $secondary-font;
    font-weight: 400;
    font-size: 28px;
    margin-bottom: 20px;
    margin-top: 100px;
    letter-spacing: 1px;

    background: linear-gradient(55deg, $color-info 40%, $color-secondary 60%);
    color: transparent;
    -webkit-background-clip: text;
  }

  .adv_block {
    color: white;
  }

  .adv_icon_wrap {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .adv_icon {
    transform: scale(0.7);
    padding-right: 15px;
  }

  .advantage_title {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: $color-secondary;
    padding-right: 25px;
    padding-left: 25px;
    margin-bottom: 0;
  }

  .adv_text {
    font-size: 11px;
    font-weight: 500;
    color: white;
    padding-right: 25px;
    padding-left: 25px;
  }

  #quality_icon {
  }

  #anonym_icon {
  }

  #present_icon {
  }

  #delivery_icon {
  }

  #price_icon {
  }

  #see_product_icon {
  }

  #support_icon {
  }

  #more_btn_wrap {
    padding-right: 25px;
    padding-left: 25px;
  }

  #more_btn {
    margin-top: 60px;
  }

  #back_girl img {
    height: 70vh;
    margin-top: -50px;
  }

  @media only screen and (max-width: $md-screen) {
    #slide_2_title {
      margin-top: 18vh;
    }
    .adv_text {
      display: none;
    }
    .advantage_title {
      margin: 10px;
    }
  }

  @media only screen and (max-width: $sm-screen) {
    #back_girl {
      display: none;
    }

    #slide_2_title {
      font-size: 24px;
      padding: 10px;
      margin-bottom: 5px;
    }

    .advantage_title {
      font-size: 12px;
      font-weight: 500;
      color: $color-secondary;
      padding-right: 10px;
      padding-left: 10px;
      text-align: center;
      margin-bottom: 0;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #slide_2_title {
      font-size: 20px;
      padding: 5px;
      margin: 0;
      margin-top: 60px;
    }
    .advantage_title {
      font-size: 11px;
      margin: 0;
      padding-right: 5px;
      padding-left: 5px;
    }
    .adv_icon_wrap {
      height: 50px;
    }
    .adv_icon {
      transform: scale(.5);
      padding: 0;
      margin: 0;
    }
  }
</style>
