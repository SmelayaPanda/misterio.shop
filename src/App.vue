<template>
  <v-app id="app">
    <transition-group name="fade">
      <app-header key="head" v-if="!this.$route.path.includes('admin') && this.$route.path !== '/'"></app-header>
      <!--Content-->
      <router-view key="routers"></router-view>
    </transition-group>
  </v-app>
</template>

<script>
import AppHeader from '@/components/Header'
import AdminPanel from '@/components/admin/AdminPanel'
import UserIcons from '@/components/UserIcons'

export default {
  components: {
    AppHeader,
    AdminPanel,
    UserIcons
  },
  name: 'App'
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&subset=cyrillic,cyrillic-ext');
  @import url('https://fonts.googleapis.com/css?family=Yeseva+One&subset=cyrillic,cyrillic-ext');

  body, html {
    margin: 0;
    padding: 0;
  }

  a {
    color: $color-secondary;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: $primary-font;
    background: $color-primary;
    color: $color-primary;
    text-align: center;
  }

  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s
  }

  .fade-enter-active {
    transition-delay: .25s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .main_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $color-secondary;
    color: white;
    padding-right: 20px;
    padding-left: 20px;
    height: 44px;
    width: 180px;
  }

  .main_btn:hover {
    cursor: pointer;
    text-shadow: $primary-text-shadow;
  }
</style>
