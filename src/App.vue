<template>
  <v-app id="app">
    <transition-group name="app-fade-left">
      <img v-if="this.$route.path === '/contacts'"
           class="router_header"
           key="contacts"
           src="@/assets/img/contacts/header.png" alt="">
      <img v-if="this.$route.path.includes('news') && !this.$route.path.includes('admin')"
           class="router_header"
           key="news"
           src="@/assets/img/news/header.png" alt="">
      <img v-if="this.$route.path === '/about'"
           class="router_header"
           key="about"
           src="@/assets/img/about/header.png" alt="">
      <mobile-menu v-if="isSecondaryRouters" key="mobile"></mobile-menu>
      <app-header v-if="isSecondaryRouters" key="head"></app-header>
      <div v-if="isSecondaryRouters"
           key="liveChat"
           id="live_chat">
        <user-live-chat
          :chatId="this.$store.getters.user.uid"
          :isCollapsed="true"
          key="userLiveChat"
          class="live_chat">
        </user-live-chat>
      </div>
      <!--Content-->
      <router-view key="routers"></router-view>
      <app-footer v-if="isSecondaryRouters && this.$route.path !== '/contacts'" key="footer"></app-footer>
    </transition-group>
    <back-to-top v-if="this.$route.path !== '/'"
                 visibleOffset="500"
                 id="back_to_bottom"
                 :style="this.$vuetify.breakpoint.name === 'sm' || this.$vuetify.breakpoint.name === 'xs' ?
                  'right: ;left: 20px; bottom: 12px' :
                  'right: 140px; bottom: 37px'">
      <v-btn fab :class="this.$route.path.includes('admin') ? 'primary_a white--text' : 'secondary'">
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </back-to-top>
  </v-app>
</template>

<script>
import BackToTop from 'vue-backtotop'
import AppHeader from '@/components/Header'
import AppFooter from '@/components/Footer'
import AdminPanel from '@/components/admin/AdminPanel'
import UserIcons from '@/components/UserIcons'
import UserLiveChat from '@/components/live_chat/UserLiveChat'
import MobileMenu from '@/components/MobileMenu'

export default {
  components: {
    MobileMenu,
    AppHeader,
    AppFooter,
    AdminPanel,
    UserIcons,
    UserLiveChat,
    BackToTop
  },
  name: 'App',
  computed: {
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

  #back_to_bottom {
    opacity: 0.8;
    z-index: 9;
  }
</style>
