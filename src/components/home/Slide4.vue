<template>
  <div id="slide_4">
    <white-pattern color="white"></white-pattern>
    <p id="title_slide_4">КОНТАКТЫ</p>
    <el-row type="flex" justify="center">
      <el-col id="contact_links" :xs="23" :sm="18" :md="10" :lg="10" :xl="9" align="middle">
        <el-row type="flex" justify="start" style="flex-wrap: wrap">
          <el-col :xs="11" :sm="10" :md="10" :lg="10" :xl="9" align="left">
            <span class="line ver_line hor_line"></span>
            <p id="header_1" class="header">УСЛУГИ</p>
            <p class="sub_header">Каталог</p>
            <p class="sub_header">Оплата и доставка</p>
            <p class="sub_header">Акции и новости</p>
            <p class="sub_header">Отзывы о нас</p>
          </el-col>
          <el-col :xs="13" :sm="10" :md="10" :lg="10" :xl="10" align="left">
            <p id="header_2" class="header">ВАЖНО ЗНАТЬ О...</p>
            <p class="sub_header">Подарочные карты</p>
            <p class="sub_header">Гид размеров</p>
            <p class="sub_header">Вакансии</p>
            <p class="sub_header">Подарки для Вас</p>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start" style="flex-wrap: wrap; margin-top: 20px;">
          <el-col :span="22" align="left">
            <p class="contacts">
              <img src="@/assets/icons/footer/phone.svg" height="22px" class="contact_icon" alt="">
              +7 (800) 100 66 66
            </p>
            <p class="contacts">
              <img src="@/assets/icons/footer/mail.svg" height="17px" class="contact_icon" alt="">
              otkrovennieigri@mail.ru
            </p>
            <p class="contacts">
              <img src="@/assets/icons/footer/chat.svg" height="27px" class="contact_icon" alt="">
              Нужна консультация? <br>
              <span class="we_answer">Мы ответим на любой Ваш вопрос</span>
            </p>
            <app-theme-btn>
              Задать вопрос
            </app-theme-btn>
          </el-col>
        </el-row>
      </el-col>
      <el-col id="slide_4_instagram"
              :xs="20" :sm="18" :md="10" :lg="10" :xl="9"
              type="flex" align="middle">
        <p id="header_4" class="header">
          ИНСТАГРАМ
        </p>
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col v-for="i in (0,4)" :key="i"
                  :span="12" align="center"
                  class="inst_card_wrap">
            <el-card class="inst_card">
              {{ i }}
            </el-card>
          </el-col>
        </el-row>
        <el-row id="watch_news_wrap" type="flex" justify="start" style="flex-wrap: wrap">
          <el-col :span="10" align="left">
            <p id="watch_news" align="left">СЛЕДИ ЗА НОВОСТЯМИ</p>
          </el-col>
          <el-col id="soc_icons_wrap" :span="14" align="right">
            <img class="soc_icon" src="@/assets/icons/footer/vk.svg" alt="">
            <img class="soc_icon" src="@/assets/icons/footer/inst.svg" alt="">
            <img class="soc_icon" src="@/assets/icons/footer/facebook.svg" alt="">
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import WhitePattern from './WhitePattern'
export default {
  name: 'Slide4',
  components: {WhitePattern}
}
</script>

<style scoped lang="scss">
  #slide_4 {
    margin-top: 12vh;
  }

  #title_slide_4 {
    padding-top: 30px;
    margin-bottom: 8vh;
    font-family: $secondary-font;
    font-size: 32px;
    margin-top: -25px;
    background: linear-gradient(to right, white 43%, $color-secondary 51%);
    color: transparent;
    -webkit-background-clip: text;
  }

  #title_slide_4:after {
    content: "";
    display: block;
    width: 150px;
    height: 3px;
    margin: -5px auto;
    border-bottom: 1px solid $color-secondary;
  }

  #contact_links{
    padding-left: 20px;
    padding-top: 10px;
  }

  .line {
    position: absolute;
    left: -30px;
    top: -30px;
  }

  .hor_line {
    border-top: 1px solid;
    width: 36%;
  }

  .ver_line {
    border-left: 1px solid $color-secondary;
    height: 420px;
  }

  .hor_line:after {
    content: "";
    display: block;
    width: 200%;
    height: 2px;
    border-bottom: 1px solid;
    background-image: linear-gradient(to right, $color-secondary 0%, white 100%);
  }

  .header {
    font-family: $secondary-font;
    letter-spacing: 1px;
    color: white;
  }

  .header:after {
    content: "";
    display: block;
    height: 1px;
    border-bottom: 1px solid $color-secondary;
  }

  #header_1:after {
    width: 65px;
  }

  #header_2:after {
    width: 120px;
  }

  #header_4 {
    margin-top: -30px;
    margin-bottom: 0;
    font-size: 16px;
    letter-spacing: 2px;
  }

  #header_4:after {
    width: 100px;
  }

  .sub_header {
    font-family: $primary-font;
    font-weight: 600;
    color: $color-info;
    font-size: 12px;
    line-height: 22px;
  }

  .contacts {
    font-family: $primary-font;
    font-weight: 600;
    color: $color-info;
    font-size: 14px;
  }

  .contact_icon {
    margin-bottom: -5px;
    margin-right: 10px;
  }

  .we_answer {
    font-family: $primary-font;
    font-weight: 600;
    font-size: 10px;
  }

  .inst_card {
    height: 170px;
    width: 100%;
  }

  .inst_card_wrap {
    padding: 10px;
  }

  #watch_news_wrap {
    margin-top: 10px;
  }

  #watch_news {
    font-family: $primary-font;
    font-weight: 600;
    font-size: 14px;
    color: $color-info;
    padding-left: 10px;
  }

  #soc_icons_wrap {
    padding-right: 10px;
  }

  .soc_icon {
    padding-left: 20px;
  }

  @media only screen and (max-width: $md-screen) {
    #title_slide_4 {
      font-size: 24px;
    }
    #title_slide_4:after {
      width: 130px;
    }
  }

  @media only screen and (max-width: $sm-screen) {
    #title_slide_4 {
      font-size: 20px;
    }

    #slide_4_instagram {
      display: none;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #slide_4 {
      margin-top: 6vh;
    }
    #title_slide_4 {
      margin-bottom: 6vh;
    }
    .ver_line,
    .hor_line:after {
      display: none;
    }
  }
</style>
