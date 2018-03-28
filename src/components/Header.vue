<template>
  <div class="mb-3">
    <!--Toolbar-->
    <el-row type="flex" justify="center" class="hidden-xs-only">
      <el-menu :default-active="this.$router.history.current.name"
               :router="true"
               mode="horizontal">
        <el-menu-item index="home" route="/">ReHigh Store</el-menu-item>
        <el-menu-item index="shop" route="/shop">Shop</el-menu-item>
        <el-menu-item index="about" route="/about"> About</el-menu-item>
        <el-menu-item index="cart" route="/cart">
          Cart
          <el-tag size="mini" class="mb-1">{{ productCount }}</el-tag>
        </el-menu-item>
        <el-submenu index="user">
          <template slot="title">User</template>
          <el-menu-item index="account" route="/account">
            Account
          </el-menu-item>
          <el-menu-item index="signin" route="/signin" v-if="this.isAnonymousUser">
            Sign in
          </el-menu-item>
          <el-menu-item index="signup" route="/signup" v-if="this.isAnonymousUser">
            Sign up
          </el-menu-item>
          <el-menu-item index="logout" route="/logout" v-if="!this.isAnonymousUser"
                        @click="onLogout"> Logout
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-row>
    <!--Mobile toolbar-->
    <v-toolbar class="hidden-sm-and-up primary white--text">
      <v-toolbar-side-icon
        @click="sideNav = !sideNav"
        class="hidden-sm-and-up white--text">
      </v-toolbar-side-icon>
      <h2>ReHigh Store</h2>
    </v-toolbar>
    <!--Navigation drawer-->
    <v-navigation-drawer temporary absolute v-model="sideNav" height="100vh">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!--LIVE CHAT-->
    <div v-if="this.$store.getters.user">
      <live-chat :chatId="this.$store.getters.user.uid"
                 :isUserSide="true"
                 :isCollapsed="true"
      ></live-chat>
    </div>
  </div>
</template>

<script>
import LiveChat from '@/components/shared/LiveChat'

export default {
  components: {
    LiveChat
  },
  data () {
    return {
      sideNav: false,
      menuItems: [
        {title: 'Home', link: '/', icon: 'home'},
        {title: 'Shop', link: '/shop', icon: 'loyalty'},
        {title: 'Info', link: '/info', icon: 'info'},
        {title: 'Account', link: '/account', icon: 'people'},
        {title: 'Sing in', link: '/signin', icon: 'perm_identity'}
      ]
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    productCount () {
      return this.$store.getters.cart.length
    }
  }
}
</script>

<style scoped lang="sass">
  .app-header
    height: 60px

</style>
