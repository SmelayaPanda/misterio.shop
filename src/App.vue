<template>
  <v-app id="app">
    <transition-group name="fade">
      <img v-if="this.$route.path === '/contacts'"
           class="router_header"
           key="contacts"
           src="@/assets/img/contacts/header_bg.png" alt="">
      <img v-if="this.$route.path === '/news'"
           class="router_header"
           key="news"
           src="@/assets/img/news/news_header.png" alt="">
      <img v-if="this.$route.path === '/about'"
           class="router_header"
           key="about"
           src="@/assets/img/about/header_bg.png" alt="">
      <mobile-menu v-if="isSecondaryRouters" key="mobile"></mobile-menu>
      <app-header v-if="isSecondaryRouters" key="head"></app-header>
      <div
        v-if="showLiveChat"
        key="liveChat"
        id="live_chat">
        <live-chat
          :chatId="this.$store.getters.user.uid"
          :isUserSide="true"
          :isCollapsed="true"
          key="liveChatIn"
          class="live_chat">
        </live-chat>
      </div>
      <!--Content-->
      <router-view key="routers"></router-view>
      <app-footer v-if="isSecondaryRouters && this.$route.path !== '/contacts'" key="footer"></app-footer>
    </transition-group>
  </v-app>
</template>

<script>
import AppHeader from '@/components/Header'
import AppFooter from '@/components/Footer'
import AdminPanel from '@/components/admin/AdminPanel'
import UserIcons from '@/components/UserIcons'
import LiveChat from '@/components/live_chat/LiveChat'
import MobileMenu from '@/components/MobileMenu'

export default {
  components: {
    MobileMenu,
    AppHeader,
    AppFooter,
    AdminPanel,
    UserIcons,
    LiveChat
  },
  name: 'App',
  computed: {
    showLiveChat () {
      let showIn = ['/account', '/shop', '/cart', '/favorite']
      return this.$store.getters.user &&
          (showIn.includes(this.$route.path) || this.$route.path.indexOf('/product') !== -1) &&
          this.$route.path.indexOf('admin') === -1
    },
    isSecondaryRouters () {
      return !this.$route.path.includes('admin') && this.$route.path !== '/'
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&subset=cyrillic,cyrillic-ext');
  @import url('https://fonts.googleapis.com/css?family=Yeseva+One&subset=cyrillic,cyrillic-ext');

  body, html {
    margin: 0;
    padding: 0;
    font-family: $primary-font;
  }

  a {
    color: $color-secondary;
    text-decoration: none;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: $primary-font;
    background: $color-primary;
    color: $color-primary;
    text-align: center;
  }
</style>
