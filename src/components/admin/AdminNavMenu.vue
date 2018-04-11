<template>
  <div align="left" id="admin_nav_menu">
    <el-button type="text" @click="isCollapsed = !isCollapsed" class="mt-2 ml-3 pl-1">
      <v-icon v-if="isCollapsed">hdr_strong</v-icon>
      <v-icon v-if="!isCollapsed">hdr_weak</v-icon>
    </el-button>
    <el-menu
      :default-active="this.$router.history.current.fullPath"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapsed"
      :router="true">
      <el-menu-item index="/admin" route="/admin">
        <v-icon>insert_chart</v-icon>
        <span slot="title">Информация</span>
      </el-menu-item>
      <el-menu-item index="/admin/products" route="/admin/products">
        <v-icon>playlist_add</v-icon>
        <span slot="title">Товары</span>
      </el-menu-item>
      <el-menu-item index="/admin/orders" route="/admin/orders">
        <v-icon>description</v-icon>
        <span slot="title">Покупки</span>
      </el-menu-item>
      <el-menu-item index="/admin/oneClick" route="/admin/oneClick">
        <v-icon>touch_app</v-icon>
        <span slot="title">Один клик</span>
      </el-menu-item>
      <el-menu-item index="/admin/reviews" route="/admin/reviews">
        <v-icon>record_voice_over</v-icon>
        <span slot="title">Отзывы</span>
      </el-menu-item>
      <el-menu-item index="/admin/news" route="/admin/news">
        <v-icon>import_contacts</v-icon>
        <span slot="title">Новости/Акции</span>
      </el-menu-item>
      <el-menu-item index="/admin/company" route="/admin/company">
        <v-icon>account_balance</v-icon>
        <span slot="title">Компания</span>
      </el-menu-item>
      <el-menu-item index="/admin/dictionaries" route="/admin/dictionaries">
        <v-icon>text_format</v-icon>
        <span slot="title">Словари</span>
      </el-menu-item>
      <el-menu-item index="/admin/liveChat" route="/admin/liveChat">
        <v-icon>chat</v-icon>
        <span slot="title">
          <span class="mr-1">Онлайн чат</span>
          <v-chip small outline label color="primary_a">
            {{ onlineUsers }}
          </v-chip>
        </span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import AdminProducts from './products/AdminProducts'
import AdminOrders from './orders/AdminOrders'
import Dictionaries from './dictionaries/Dictionaries'
import AdminOneClick from './oneclick/AdminOneClick'

export default {
  name: 'NavMenu',
  components: {
    AdminOneClick,
    AdminProducts,
    AdminOrders,
    Dictionaries
  },
  data () {
    return {
      isCollapsed: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {
    onlineUsers () {
      let liveChats = this.$store.getters.liveChats
      let i = 0
      for (let chat in liveChats) {
        if (liveChats.hasOwnProperty(chat) && liveChats[chat].props.onlineFrom) {
          i++
        }
      }
      return i
    }
  }
}
</script>

<style scoped>
</style>
