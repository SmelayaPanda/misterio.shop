<template>
  <v-card>
    <v-card-title class="event_header primary_a white--text">
      <h3 class="pl-3 white--text">
        Пользователи
      </h3>
      <el-switch v-model="showOnlineUsers" class="pl-2" active-color="#13ce66">
      </el-switch>
      <span class="pl-2">
              <span v-if="showOnlineUsers">онлайн</span>
              <span v-else>оффлайн</span>
            </span>
    </v-card-title>
    <v-card>
      <div v-if="liveChats" id="chat_users" ref="chatUsers">
        <div v-if="showOnlineUsers ? chat.props.onlineFrom : chat.props.lastOnline"
             v-for="(chat, id) of liveChats"
             :key="id"
             :class="chatId === id ? 'primary_a' : ''">
                <span v-if="chat.props.isTypingUser">
                  ...<v-icon size="small" class="primary_a--text">edit</v-icon>
                </span>
          <span v-if="chat.props.unreadByAdmin">
                  <v-icon>fiber_manual_record</v-icon>
                </span>
          <el-button @click="openChat(id)" type="text" :class="chatId === id ? 'white--text' : ''">
            {{ chat.props.userEmail ? ( chat.props.userEmail ) : `Анонимный ( ${id.substring(0, 5)} )` }}
            <el-tag size="mini" :type="chatId === id ? '' : 'success'">
              {{ chat.messages ? Object.keys(chat.messages).length : 0 }}
            </el-tag>
            <span class="info--text">/</span>
            <el-tag size="mini" :type="chatId === id ? '' : 'info'">
              <span>{{ chat.events ? Object.keys(chat.events).length : 0 }}</span>
            </el-tag>
          </el-button>
        </div>
      </div>
    </v-card>
  </v-card>
</template>
<script>
export default {
  name: 'users-list',
  data () {
    return {
      chatId: '',
      showOnlineUsers: true
    }
  },
  methods: {
    async openChat (chatId) {
      // CLOSE OLD CHAT
      await this.$store.dispatch('LOADING', true)
      if (this.chatId && this.chatId !== chatId) {
        await Promise.all([
          this.$store.dispatch('setChatProp', {chatId: this.chatId, props: 'isCollapsedAdmin', value: 1}),
          this.$store.dispatch('setChatMessages', []),
          this.$store.dispatch('setUserEvents', []),
          this.$store.dispatch('unsubscribeFromChat', this.chatId)
        ])
      }
      // OPEN NEW CHAT
      await this.$store.dispatch('openChat', chatId)
      this.$store.dispatch('setChatProp', {chatId: chatId, props: 'isCollapsedAdmin', value: 0})
      this.$store.dispatch('setChatProp', {chatId: chatId, props: 'unreadByAdmin', value: 0})
      this.chatId = chatId
      this.$bus.$emit('openLiveChat')
      await this.$store.dispatch('LOADING', false)
    }
  },
  computed: {
    liveChats () {
      return this.$store.getters.liveChats
    }
  },
  beforeDestroy () {
    this.$store.dispatch('setChatProp', {chatId: this.chatId, props: 'isCollapsedAdmin', value: 1})
    this.$store.dispatch('unsubscribeFromChat', this.chatId)
  }
}
</script>
<style scoped>
  .event_header {
    margin-bottom: 1px;
    padding-bottom: 12px;
  }

  #chat_users {
    width: 100%;
    height: 320px;
    overflow: scroll;
  }
</style>
