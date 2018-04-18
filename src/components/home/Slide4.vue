<template>
  <div id="slide_4">
    <white-pattern color="white"></white-pattern>
    <p id="title_slide_4">КОНТАКТЫ</p>
    <el-row type="flex" justify="center">
      <el-col id="contact_links" :xs="23" :sm="8" :md="8" :lg="7" :xl="9" align="left">
        <span class="line ver_line hor_line"></span>
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col :span="20" align="left">
            <contacts-services></contacts-services>
          </el-col>
        </el-row>
        <el-row type="flex" id="contact_block">
          <el-col :span="20" align="left">
            <contacts-phone></contacts-phone>
            <div @click="$bus.$emit('openLiveChat')">
              <app-theme-btn>
                Задать вопрос
              </app-theme-btn>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <instagram-photos/>
    </el-row>
  </div>
</template>

<script>

import WhitePattern from './WhitePattern'
import ContactsServices from '../contacts/ContactsServices'
import ContactsImportant from '../contacts/ContactsImportant'
import ContactsPhone from '../contacts/ContactsPhone'
import InstagramPhotos from './InstagramPhotos'

export default {
  name: 'Slide4',
  components: {
    InstagramPhotos,
    ContactsPhone,
    ContactsImportant,
    ContactsServices,
    WhitePattern
  }
}
</script>

<style scoped lang="scss">
  #slide_4 {
    margin-top: 11vh;
  }

  #title_slide_4 {
    padding-top: 25px;
    font-family: $secondary-font;
    font-size: 32px;
    margin-bottom: 6vh;
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
  #contact_block {
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
  }
  #contact_links {
    padding-left: 20px;
    padding-top: 10px;
    z-index: 2;
  }

  .line {
    position: absolute;
    top: -20px;
    left: 8vw;
  }

  .hor_line {
    border-top: 1px solid;
    width: 140px;
  }

  .ver_line {
    border-left: 1px solid $color-secondary;
    height: 410px;
  }

  .hor_line:after {
    content: "";
    display: block;
    width: 200%;
    height: 2px;
    border-bottom: 1px solid;
    background-image: linear-gradient(to right, $color-secondary 0%, white 100%);
  }

  .sub_header {
    font-family: $primary-font;
    font-weight: 600;
    color: $color-info;
    font-size: 12px;
    line-height: 22px;
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
  }

  @media only screen and (max-width: $xs-screen) {
    #slide_4 {
      margin-top: 10vh;
    }
    #title_slide_4 {
      margin-bottom: 10px;
    }
    .ver_line,
    .hor_line:after {
      display: none;
    }
    #contact_block {
      margin-top: 5px;
    }
  }
</style>
