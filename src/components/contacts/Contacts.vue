<template>
  <div id="main">
    <app-heart-loader v-if="this.isLoading"></app-heart-loader>
    <div>
      <transition name="title-fade-left">
        <app-theme-page-title v-if="!isLoadingContacts">
          <p slot="middleTitle">КОНТАКТЫ</p>
          <p slot="bottomTitle">Мы всегда на связи, чтобы подобрать для Вас самое подходящее</p>
        </app-theme-page-title>
      </transition>
      <el-row type="flex" justify="center" style="flex-wrap: wrap" class="mt-5">
        <transition name="title-fade-left">
          <el-col v-if="!isLoadingContacts" :xs="23" :sm="18" :md="10" :lg="10" :xl="9" type="flex" align="middle"
                  class="pl-2">
            <el-row type="flex" justify="start" style="flex-wrap: wrap">
              <el-col :xs="12" :sm="10" :md="10" :lg="10" :xl="9" align="left">
                <span class="line ver_line hor_line"></span>
                <contacts-services/>
              </el-col>
              <el-col :xs="12" :sm="10" :md="10" :lg="10" :xl="10" align="left">
                <contacts-important/>
              </el-col>
            </el-row>
            <el-row type="flex" justify="start" style="flex-wrap: wrap; margin-top: 40px;">
              <el-col :span="22" align="left">
                <contacts-phone/>
                <app-theme-btn>
                  Задать вопрос
                </app-theme-btn>
              </el-col>
            </el-row>
          </el-col>
        </transition>
        <transition name="title-fade-right">
          <el-col v-if="!isLoadingContacts" :xs="24" :sm="18" :md="10" :lg="10" :xl="9" type="flex" align="middle">
            <p id="header_3" class="header">
              ИНСТАГРАМ
            </p>
            <el-row v-if="instPhotos" type="flex" justify="center" style="flex-wrap: wrap">
              <el-col v-for="(photo, idx) in instPhotos" :key="idx"
                      :xs="23" :sm="8" :md="12" :lg="8" :xl="8" align="center"
                      class="inst_card_wrap">
                <img :src="photo" class="inst_photo" alt="">
              </el-col>
            </el-row>
            <el-row id="watch_news_wrap" type="flex" justify="start" style="flex-wrap: wrap">
              <el-col :span="10" align="left">
                <p id="watch_news" align="left">СЛЕДИ ЗА НОВОСТЯМИ</p>
              </el-col>
              <el-col id="soc_icons_wrap" :span="14" align="right">
                <contacts-social/>
              </el-col>
            </el-row>
          </el-col>
        </transition>
      </el-row>
    </div>
  </div>
</template>

<script>
import ContactsServices from './ContactsServices'
import ContactsImportant from './ContactsImportant'
import ContactsPhone from './ContactsPhone'
import ContactsSocial from './ContactsSocial'

export default {
  name: 'Contacts',
  components: {ContactsSocial, ContactsPhone, ContactsImportant, ContactsServices},
  data () {
    return {
      isLoadingContacts: true
    }
  },
  computed: {
    instPhotos () {
      return this.$store.getters.companyInfo.photos
    }
  },
  mounted () {
    setInterval(() => {
      this.isLoadingContacts = false
    }, 500)
  }
}
</script>

<style scoped lang="scss">
  #main {
    margin-bottom: 80px;
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

  .line {
    position: absolute;
    left: -35px;
    top: -35px;
  }

  .hor_line {
    border-top: 1px solid;
    width: 36%;
  }

  .ver_line {
    border-left: 1px solid $color-secondary;
    height: 434px;
  }

  .hor_line:after {
    content: "";
    display: block;
    width: 200%;
    height: 2px;
    border-bottom: 1px solid;
    background-image: linear-gradient(to right, $color-secondary 0%, white 100%);
  }

  #header_3 {
    margin-top: -30px;
    margin-bottom: 0;
    font-size: 16px;
    letter-spacing: 2px;
  }

  #header_3:after {
    width: 100px;
  }

  .inst_photo {
    height: 180px;
    width: 100%;
    object-fit: cover;
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
    font-size: 12px;
    color: $color-info;
    padding-left: 10px;
  }

  #soc_icons_wrap {
    padding-right: 10px;
  }

  @media only screen and (max-width: $sm-screen) {
    #header_3 {
      margin-top: 30px;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    .inst_card {
      height: 280px;
      width: 280px;
    }
    .ver_line,
    .hor_line {
      display: none;
    }
  }
</style>
