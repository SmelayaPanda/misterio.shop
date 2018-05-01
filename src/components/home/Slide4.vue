<template>
  <div>
    <white-pattern color="white"></white-pattern>
    <transition :name="this.$vuetify.breakpoint.name === 'xs' ? '' : 'app-fade-left'">
      <p v-if="isLoadedSlide4" id="title_slide_4">КОНТАКТЫ</p>
    </transition>
    <el-row type="flex" justify="center">
      <el-col :xs="23" :sm="8" :md="8" :lg="7" :xl="9" align="left">
        <transition :name="this.$vuetify.breakpoint.name === 'xs' ? '' : 'app-fade-right'">
          <span v-if="isLoadedSlide4" class="line ver_line hor_line"></span>
        </transition>
        <transition :name="this.$vuetify.breakpoint.name === 'xs' ? '' : 'app-fade-left'">
          <el-row v-if="isLoadedSlide4" id="contact_links" type="flex">
            <el-col :span="20" align="left">
              <contacts-services></contacts-services>
            </el-col>
          </el-row>
        </transition>
        <transition :name="this.$vuetify.breakpoint.name === 'xs' ? '' : 'app-fade-left'">
          <el-row  v-if="isLoadedSlide4" type="flex" id="contact_block">
            <el-col :span="20" align="left">
              <contacts-phone></contacts-phone>
              <div @click="$bus.$emit('openLiveChat')">
                <app-theme-btn width="170px">
                  Задать вопрос
                </app-theme-btn>
              </div>
            </el-col>
          </el-row>
        </transition>
      </el-col>
      <transition :name="this.$vuetify.breakpoint.name === 'xs' ? '' : 'app-fade-right'">
        <instagram-photos v-if="isLoadedSlide4"/>
      </transition>
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
  },
  data () {
    return {
      isLoadedSlide4: false
    }
  },
  created () {
    this.$bus.$on('isHomeSlide1', () => {
      this.isLoadedSlide4 = false
    })
    this.$bus.$on('isHomeSlide2', () => {
      this.isLoadedSlide4 = false
    })
    this.$bus.$on('isHomeSlide3', () => {
      this.isLoadedSlide4 = false
    })
    this.$bus.$on('isHomeSlide4', () => {
      this.isLoadedSlide4 = true
    })
  }
}
</script>

<style scoped lang="scss">
  #title_slide_4 {
    padding-top: 25px;
    font-family: $secondary-font;
    font-size: 32px;
    margin-bottom: 6vh;
    margin-top: 8vh;
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
    margin-top: 22px;
  }

  #contact_links {
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 25px;
    z-index: 2;
  }

  .line {
    position: absolute;
    top: -20px;
    left: 7vw;
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
    #contact_links {
      padding-top: 10px;
      padding-left: 10px;
    }
    #contact_block {
      margin-left: 10px;
    }
  }

  @media only screen and (max-width: $sm-screen) {
    #title_slide_4 {
      font-size: 20px;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #title_slide_4 {
      margin-bottom: 10px;
    }
    #contact_links {
      padding-left: 0;
    }
    .ver_line,
    .hor_line:after {
      display: none;
    }
    #contact_block {
      margin-top: 10px;
      margin-left: 0;
    }
  }
</style>
