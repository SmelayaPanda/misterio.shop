<template>
  <div id="slide_2">
    <h1 id="slide_2_title">
      НАШИ СИЛЬНЫЕ СТОРОНЫ
    </h1>
    <el-row type="flex" justify="center" style="flex-wrap: wrap">
      <el-col :xs="20" :sm="20" :md="20" :lg="14" :xl="12">
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
            <div class="adv_icon_wrap">
              <img src="@/assets/icons/home/quality.svg" id="quality_icon" class="adv_icon" alt="">
            </div>
            <p class="adv_title" align="left">
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
            <p class="adv_title" align="left">
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
            <p class="adv_title" align="left">
              ПОДАРКИ К КАЖДОМУ ЗАКАЗУ
            </p>
            <p class="adv_text" align="left">
              При заказе до 2000 рублей – лубрикант-пробник
              При заказе от 2000 рублей – вагинальный лубрикант
            </p>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
            <div class="adv_icon_wrap">
              <img src="@/assets/icons/home/delivery.svg" id="delivery_icon" class="adv_icon" alt="">
            </div>
            <p class="adv_title" align="left">
              БЕСПЛАТНАЯ ДОСТАВКА ОТ 2000 тысяч рублей
            </p>
            <p class="adv_text" align="left">
              Вне зависимости от способа доставки (курьер, почта, Pick Point)
            </p>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
            <div class="adv_icon_wrap">
              <img src="@/assets/icons/home/price.svg" id="price_icon" class="adv_icon" alt="">
            </div>
            <p class="adv_title" align="left">
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
            <p class="adv_title" align="left">
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
            <p class="adv_title" align="left">
              ИНДИВИДУАЛЬНЫЙ ПОДХОД К КЛИЕНТАМ
            </p>
            <p class="adv_text" align="left">
              Вы можете задать вопрос нашему консультанту, заполнив форму на сайте
            </p>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
            <div id="more_btn_wrap">
              <app-theme-btn width="142px" id="more_btn">
                Подробнее
                <i class="el-icon-d-arrow-right"></i>
              </app-theme-btn>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <!--IMG-->
      <el-col :md="6" :lg="5" :xl="4" id="back_girl">
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Slide2'
}
</script>

<style scoped lang="scss">
  #slide_2 {
    margin-top: 100px;
  }

  #slide_2_title {
    position: relative;
    font-family: $secondary-font;
    font-weight: 400;
    font-size: 32px;
    margin-bottom: 30px;
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
    transform: scale(0.8);
    padding-right: 10px;
  }

  .adv_title {
    font-size: 12px;
    font-weight: 600;
    color: $color-secondary;
    padding-right: 25px;
    padding-left: 25px;
    margin-bottom: 0;
  }

  .adv_text {
    font-size: 12px;
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

  @media only screen and (max-width: $md-screen) {
  }

  @media only screen and (max-width: $sm-screen) {
    #slide_2 {
      margin-top: 20px;
    }

    #slide_2_title {
      font-size: 24px;
      padding: 10px;
      margin-bottom: 5px;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #slide_2 {
      margin-top: 20px;
    }
    #slide_2_title {
      font-size: 24px;
      padding: 10px;
      margin-bottom: 5px;
    }
    .adv_text, #back_girl {
      display: none;
    }
    .adv_icon {
      transform: scale(.5);
    }
    .adv_title {
      font-size: 10px;
      font-weight: 500;
      color: $color-secondary;
      padding-right: 10px;
      padding-left: 10px;
      text-align: center;
      margin-bottom: 0;
    }
    #more_btn_wrap {
    }
  }
</style>
