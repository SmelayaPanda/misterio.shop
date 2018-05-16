<template>
  <v-app id="admin_panel">
    <!--Navigation drawer-->
    <v-navigation-drawer temporary absolute v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
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
          <v-list-tile-content>Выйти</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!--Toolbar-->
    <v-toolbar dark class="primary_a">
      <v-toolbar-title>
        <router-link to="/admin" class="title">
          Misterio Shop
        </router-link>
      </v-toolbar-title>
      <el-switch
        v-model="isOnlineAdmin"
        @change="changeAdminOnline"
        id="online_admin"
        active-color="#13ce66">
      </el-switch>
      <span class="pl-2">
        <span v-if="isOnlineAdmin">онлайн</span>
        <span v-else>оффлайн</span>
      </span>
      <app-balls-loader v-if="this.isLoading"></app-balls-loader>
      <v-toolbar-side-icon
        @click="sideNav = !sideNav"
        class="hidden-md-and-up">
      </v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <!--Go Home-->
        <v-btn flat @click="goHome" class="primary_a white--text">
          <v-icon left dark>important_devices</v-icon>
          На сайт
        </v-btn>

        <v-btn v-for="item in menuItems"
               :key="item.title"
               :to="item.link"
               flat class="primary_a white--text">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <!--Logout-->
        <v-btn flat
               v-if="!this.isAnonymousUser"
               @click="onLogout"
               class="primary_a white--text">
          <v-icon left dark>exit_to_app</v-icon>
          Выйти
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!--No admin case-->
    <el-row v-if="!this.isAdmin">
      <v-card>
        <!--Alert message-->
        <v-layout row v-if="error">
          <v-flex xs12>
            <app-alert
              :dismissed="onDismissed"
              :text="error.message">
            </app-alert>
          </v-flex>
        </v-layout>

        <h3 align="center" class="primary_a--text pt-3">
          Для доступа к функционалу необходимо зайти как <v-icon>fingerprint</v-icon> администратор

        </h3>
        <v-card-text>
          <p><b>Developer info</b><br>
            <v-icon>code</v-icon>
            <br>
            Alexey Azarov <br>
            8 (999) 467 78 57 <br>
            smelayapandagm@gmail.com</p>
        </v-card-text>
      </v-card>
    </el-row>

    <el-row type="flex" justify="start" v-if="this.isAdmin">
      <el-col style="width: 180px">
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
      isOnlineAdmin: false
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    },
    goHome () {
      this.$router.push('/')
      window.location.reload() // TODO: fix it
    },
    onDismissed () {
      this.$store.dispatch('CLEAR_ERR') // action
    },
    changeAdminOnline (val) {
      this.$store.dispatch('setAdminOnline', val ? 1 : 0)
    }
  },
  computed: {
    menuItems:
        function () {
          let menuItems = []
          if (this.isAdmin) {
            menuItems = [
              {icon: 'settings', title: 'Система', link: '/admin/system'}
            ]
          } else {
            menuItems = [
              {icon: 'account_circle', title: 'Регистрация', link: '/signup'},
              {icon: 'lock_open', title: 'Вход', link: '/signin'}
            ]
          }
          return menuItems
        },
    error () {
      return this.$store.getters.error
    }
  }
}
</script>

<style scoped lang="scss">
  .title {
    cursor: pointer;
    color: white;
    text-decoration: none
  }

  #admin_panel {
    background: white;
  }

  #online_admin {
    padding-left: 10px;
    padding-top: 2px;
  }
</style>
