<template>
  <v-app id="app">
    <app-header v-if="!this.$router.history.current.fullPath.includes('admin') &&
                       this.$router.history.current.fullPath !== '/'">
    </app-header>
    <user-icons v-if="!this.$router.history.current.fullPath.includes('admin') &&
                       this.$router.history.current.fullPath !== '/'"></user-icons>
    <!--Content-->
    <transition name="fade">
      <router-view></router-view>
    </transition>
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
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,700&subset=cyrillic,cyrillic-ext');
  @import url('https://fonts.googleapis.com/css?family=Yeseva+One&subset=cyrillic,cyrillic-ext');

  body, html {
    margin: 0;
    padding: 0;
  }

  a {
    color: $color-secondary;
  }

  #app {
    font-family: $primary-font;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(to right, $color-primary, #161516);
    text-align: center;
    color: $color-primary;
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
</style>
