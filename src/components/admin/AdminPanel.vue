<template>
  <v-app light>

    <!--Navigation drawer-->
    <v-navigation-drawer temporary absolute v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in menuItems"
                     :key="item.title"
                     :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <!--Logout-->
        <v-list-tile v-if="!this.isAnonymousUser" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!--Toolbar-->
    <v-toolbar dark class="primary">
      <v-toolbar-title>
        <router-link to="/admin" class="title">
          {{ mainTitle }}
        </router-link>
      </v-toolbar-title>
      <app-balls-loader v-if="this.isLoading"></app-balls-loader>
      <v-toolbar-side-icon
        @click="sideNav = !sideNav"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <!--Go Home-->
        <v-btn flat @click="goHome" class="primary white--text">
          <v-icon left dark>home</v-icon>
          Home
        </v-btn>

        <v-btn flat
               v-for="item in menuItems"
               :key="item.title"
               :to="item.link"
               class="primary white--text"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <!--Logout-->
        <v-btn flat
               v-if="!this.isAnonymousUser"
               @click="onLogout"
               class="primary white--text"
        >
          <v-icon left dark>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!--No admin case-->
    <v-container v-if="!this.isAdmin">
      <v-card>
        <!--Alert message-->
        <v-layout row v-if="error">
          <v-flex xs12>
            <app-alert
              :dismissed="onDismissed"
              :text="error.message"
            ></app-alert>
          </v-flex>
        </v-layout>

        <v-card-title>For admin access:</v-card-title>
        <v-card-text>
          <p>Alexey Azarov</p>
          <p>8 (999) 467 78 57</p>
          <p>smelayapandagm@gmail.com</p>
        </v-card-text>
      </v-card>
    </v-container>

    <el-row type="flex" justify="start" v-if="this.isAdmin">
      <el-col style="width: 160px" >
        <div>
          <admin-nav-menu></admin-nav-menu>
        </div>
      </el-col>
      <el-col class="ml-2 mt-2">
        <main>
          <router-view></router-view>
        </main>
      </el-col>
    </el-row>

  </v-app>
</template>

<script>
import AdminNavMenu from './AdminNavMenu'

export default {
  components: {
    AdminNavMenu
  },
  data: function () {
    return {
      sideNav: false,
      mainTitle: 'Admin Panel'
    }
  },
  computed: {
    menuItems:
        function () {
          let menuItems = []
          if (this.isAnonymousUser) {
            menuItems = [
              {icon: 'account_circle', title: 'Singup', link: '/signup'},
              {icon: 'lock_open', title: 'Singin', link: '/signin'}
            ]
          }
          return menuItems
        },
    error:
        function () {
          return this.$store.getters.error
        }
  },
  methods: {
    onLogout:
        function () {
          this.$store.dispatch('logout')
        },
    goHome:
        function () {
          this.$router.push('/')
          window.location.reload() // TODO: fix it
        },
    onDismissed:
        function () {
          this.$store.dispatch('CLEAR_ERR') // action
        }
  }
}
</script>

<style scoped>
  .title {
    cursor: pointer;
    color: white;
    text-decoration: none
  }
</style>
