<template>
  <v-card>
    <v-card-title class="info_header primary_a white--text">
      <h3 class="pl-3 white--text">
        Информация о пользователе
      </h3>
    </v-card-title>
    <div id="info_data">
      <el-row justify="left">
        <el-col :span="22" align="left" class="pr-1 pl-3 mt-2">
          <p v-if="userId"><el-tag type="success">ИД: {{ userId }}</el-tag></p>
          <p v-if="onlineFrom"><el-tag type="success">Онлайн с: {{ onlineFrom | date }}</el-tag></p>
          <p v-if="lastOnline"><el-tag type="success">Последнее посщение: {{ lastOnline | date }}</el-tag></p>
          <p v-if="onlineFrom && isCollapsedUser"><el-tag type="success">Чат свернут</el-tag></p>
          <p v-if="onlineFrom && !isCollapsedUser"><el-tag type="success">Чат открыт</el-tag></p>
        </el-col>
      </el-row>
    </div>
  </v-card>
</template>
<script>
export default {
  name: 'user-data',
  data () {
    return {
      isPrevLoadingEvent: false,
      isPrevLoading: false,
      prevScrollHeight: 0
    }
  },
  methods: {},
  computed: {
    userId () {
      return this.$store.getters.chatPropByName('id')
    },
    isTypingUser () {
      return this.$store.getters.chatPropByName('isTypingUser')
    },
    isCollapsedUser () {
      return this.$store.getters.chatPropByName('isCollapsedUser')
    },
    unreadByUser () {
      return this.$store.getters.chatPropByName('unreadByUser')
    },
    unreadByAdmin () {
      return this.$store.getters.chatPropByName('unreadByAdmin')
    },
    onlineFrom () {
      return this.$store.getters.chatPropByName('onlineFrom')
    },
    lastOnline () {
      return this.$store.getters.chatPropByName('lastOnline')
    }
  },
  watch: {
    userId () { // TODO: user cart products
      // return this.$store.dispatch('loadUserInfoFor')
    }
  }
}
</script>
<style scoped>
  .info_header {
    margin-bottom: 1px;
    padding-bottom: 12px;
  }

  #info_data {
    width: 100%;
    height: 320px;
    padding-right: 8px;
  }
</style>
