<template>
  <el-row type="flex" justify="center" class="main_header">
    <div id="app_main_logo_wrapper">
      <img id="app_main_logo" src="@/assets/icons/logo/logo_site.svg" alt="">
      <img v-if="color === 'black'" class="text_logo" src="@/assets/icons/logo/text_black.svg" alt="">
      <img v-else class="text_logo" src="@/assets/icons/logo/text_red.svg" alt="">
    </div>
    <el-col :xs="14" :sm="12" :md="11" :lg="10" :xl="9">
      <el-row type="flex" justify="center" class="pl-1 pr-3">
        <el-col>
          <router-link to="/" active-class="active_header_link" exact>
            <span>
              ГЛАВНАЯ
            </span>
          </router-link>
        </el-col>
        <el-col>
          <router-link to="/shop" active-class="active_header_link" exact>
            <span :class="color === 'black' ? 'primary--text' : ''">
              КАТАЛОГ
            </span>
          </router-link>
        </el-col>
        <el-col>
          <router-link to="/about" active-class="active_header_link" exact>
            <span :class="color === 'black' ? 'primary--text' : ''">
              О НАС
            </span>
          </router-link>
        </el-col>
        <el-col>
          <router-link to="/news" active-class="active_header_link" exact>
            <span :class="color === 'black' ? 'primary--text' : ''">
              АКЦИИ
            </span>
          </router-link>
        </el-col>
        <el-col>
          <router-link to="/contacts" active-class="active_header_link" exact>
            <span :class="color === 'black' ? 'primary--text' : ''">
              КОНТАКТЫ
            </span>
          </router-link>
        </el-col>
      </el-row>
      <user-icons :color="color === 'black' ? 'black' : 'red'"></user-icons>
    </el-col>
  </el-row>
</template>

<script>
import UserIcons from './UserIcons'
import MobileMenu from './MobileMenu'

export default {
  name: 'Header',
  props: ['color'],
  components: {MobileMenu, UserIcons}
}
</script>

<style scoped lang="scss">
  a {
    color: $color-secondary;
    text-decoration: none;
    transition: all .5s;
  }

  a:hover {
    color: white;
  }

  #app_main_logo_wrapper {
    position: absolute;
    left: 40px;
    top: 25px;
    z-index: 10;
    #app_main_logo {
      height: 80px;
    }
  }

  .text_logo {
    position: absolute;
    top: 17px;
    left: 73px;
    height: 40px;
  }

  .main_header {
    flex-wrap: wrap;
    color: $color-secondary;
    font-weight: 500;
    padding-top: 40px;
    font-size: 13px;
    line-height: 34px;
    margin-bottom: 30px;
    z-index: 10;
  }

  .active_header_link {
    color: white;
    padding-bottom: 7px;
    font-weight: bold;
    border-bottom: 1px solid $color-secondary;
  }

  @media only screen and (max-width: $sm-screen) {
    .main_header {
      display: none;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #app_main_logo_wrapper {
      display: none;
    }
  }
</style>
