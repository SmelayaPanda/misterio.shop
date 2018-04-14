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
      <mobile-menu v-if="isSecondaryRouters" key="mobile" ></mobile-menu>
      <app-header v-if="isSecondaryRouters" key="head" ></app-header>
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
      <app-footer v-if="isSecondaryRouters && this.$route.path !== '/contacts'" key="footer" ></app-footer>
    </transition-group>
  </v-app>
</template>

<script>
import AppHeader from '@/components/Header'
import AppFooter from '@/components/Footer'
import AdminPanel from '@/components/admin/AdminPanel'
import UserIcons from '@/components/UserIcons'
import LiveChat from '@/components/shared/LiveChat'
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
  @import url('https://fonts.googleapis.com/css?family=Poiret+One&subset=cyrillic'); /* logo font */

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

  #live_chat {
    position: fixed;
    bottom: 40px;
    right: 60px;
    z-index: 10;
  }

  .router_header {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
  }

  /* fade */
  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .5s
  }

  .fade-enter-active {
    transition-delay: .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  /* slide-fade */
  .slide-fade-enter-active {
    transition: all 2.5s ease-in;
  }

  .slide-fade-leave-active {
    transition: all 2.5s cubic-bezier(1.0, 0.5, 0.5, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */
  {
    transform: translateY(7px);
    opacity: 0;
  }

  /* bounce */
  .bounce-enter-active {
    animation: bounce-in 0.75s;
  }

  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  @media only screen and (max-width: $xs-screen) {
    .router_header {
      top: 50px;
    }
    #live_chat {
      bottom: 15px;
      right: 20px;
    }
  }
</style>
