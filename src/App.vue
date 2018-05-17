<template>
  <v-app id="app">
    <transition name="fade">
      <app-header v-if="isSecondaryRouters" key="head" id="app_header"></app-header>
    </transition>
    <transition-group name="app-fade-left">
      <img v-show="$route.path === '/contacts'"
           class="router_header"
           key="contacts"
           src="@/assets/img/contacts/header.png" alt="">
      <img v-show="$route.path.includes('news') && !$route.path.includes('admin')"
           class="router_header"
           key="news"
           src="@/assets/img/news/header.png" alt="">
      <img v-show="$route.path === '/about'"
           class="router_header"
           key="about"
           src="@/assets/img/about/header.png" alt="">
      <img v-show="$route.path === '/shop' || $route.path.includes('/product/')"
           class="router_header"
           key="shop"
           src="@/assets/img/shop/shop_bg.png" alt="">
      <mobile-menu v-if="isSecondaryRouters" key="mobile"></mobile-menu>
      <div v-if="isSecondaryRouters"
           key="liveChat"
           id="live_chat">
        <user-live-chat
          :chatId="$store.getters.user.uid"
          :isCollapsed="true"
          key="userLiveChat">
        </user-live-chat>
      </div>
    </transition-group>
    <transition name="fade">
      <router-view key="routers"
                   :style="isSecondaryRouters && $vuetify.breakpoint.name !== 'xs' ? 'margin-top: 100px' : ''">
      </router-view>
    </transition>
    <transition name="fade">
      <app-footer v-if="isSecondaryRouters && $route.path !== '/contacts'" key="footer"></app-footer>
    </transition>
    <back-to-top v-if="$route.path !== '/'"
                 visibleOffset="500"
                 id="back_to_bottom"
                 :style="$vuetify.breakpoint.name === 'sm' || $vuetify.breakpoint.name === 'xs' ?
                  'right: ;left: 20px; bottom: 12px' :
                  'right: 140px; bottom: 37px'">
      <v-btn fab :class="$route.path.includes('admin') ? 'primary_a white--text' : 'secondary'">
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

  #app_header {
    position: absolute;
    z-index: 2;
    width: 100vw;
  }
</style>
