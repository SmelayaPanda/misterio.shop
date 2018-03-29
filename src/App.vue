<template>
  <v-app id="app">
    <transition-group name="fade">
      <div key="toolbar"
           v-if="!this.$route.path.includes('admin') &&
                  this.$route.path !== '/'">
        <app-header key="head"></app-header>
        <user-icons class="user_icons" key="user"></user-icons>
      </div>
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
    font-family: $primary-font;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: $color-primary;
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

  .user_icons {
    right: 20px;
    top: 22px;
  }
</style>
