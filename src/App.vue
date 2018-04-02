<template>
  <v-app id="app">
    <transition-group name="fade">
      <app-header key="head" v-if="!this.$route.path.includes('admin') && this.$route.path !== '/'"></app-header>
      <div
        key="liveChat"
        id="live_chat"
        v-if="showLiveChat">
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
    </transition-group>
  </v-app>
</template>

<script>
import AppHeader from '@/components/Header'
import AdminPanel from '@/components/admin/AdminPanel'
import UserIcons from '@/components/UserIcons'
import LiveChat from '@/components/shared/LiveChat'

export default {
  components: {
    AppHeader,
    AdminPanel,
    UserIcons,
    LiveChat
  },
  name: 'App',
  computed: {
    showLiveChat () {
      let showIn = ['/account', '/shop', '/cart', '/favorite']
      return this.$store.getters.user &&
          (showIn.includes(this.$route.path) || this.$route.path.endsWith('/product') !== -1) &&
        this.$route.path.indexOf('admin') === -1
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
