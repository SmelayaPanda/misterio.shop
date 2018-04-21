<template>
  <div>
    <app-heart-loader v-if="this.isLoading"></app-heart-loader>
    <div v-else>
      <transition name="app-fade-left">
        <app-theme-page-title v-if="isLoadedContacts">
          <p slot="middleTitle">КОНТАКТЫ</p>
          <p slot="bottomTitle">Мы всегда на связи, чтобы подобрать для Вас самое подходящее</p>
        </app-theme-page-title>
      </transition>
      <el-row type="flex" justify="center" style="flex-wrap: wrap">
        <transition name="app-fade-left">
          <span v-if="isLoadedContacts" class="line ver_line hor_line"></span>
        </transition>
        <transition name="app-fade-left">
          <el-col v-if="isLoadedContacts" :xs="23" :sm="18" :md="10" :lg="10" :xl="9" align="middle"
                  class="pl-2">
            <el-row type="flex" justify="start" style="flex-wrap: wrap">
              <el-col :xs="12" :sm="10" :md="10" :lg="10" :xl="9" align="left">
                <contacts-important/>
              </el-col>
              <el-col :xs="12" :sm="10" :md="10" :lg="10" :xl="10" align="left">
                <contacts-services/>
              </el-col>
            </el-row>
            <el-row type="flex" justify="start" style="flex-wrap: wrap; margin-top: 30px;">
              <el-col :span="22" align="left">
                <contacts-phone/>
                <div @click="$bus.$emit('openLiveChat')">
                  <app-theme-btn>
                    Задать вопрос
                  </app-theme-btn>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </transition>
        <transition name="app-fade-right">
          <el-col v-if="isLoadedContacts" :xs="24" :sm="18" :md="10" :lg="10" :xl="9" type="flex" align="middle">
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
      isLoadedContacts: false
    }
  },
  computed: {
    instPhotos () {
      return this.$store.getters.companyInfo.photos
    }
  },
  mounted () {
    setInterval(() => {
      this.isLoadedContacts = true
    }, 500)
  }
}
</script>

<style scoped lang="scss">
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
    width: 15vw;
  }

  .ver_line {
    position: absolute;
    left: 6vw;
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
    margin-bottom: 100px;
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
