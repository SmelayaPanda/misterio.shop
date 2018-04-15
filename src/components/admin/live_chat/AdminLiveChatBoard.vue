<template>
  <div>
    <el-row type="flex" justify="left" style="flex-wrap: wrap">
      <!--ALL USERS-->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8"
              class="pl-2 pr-2 mt-2">
        <v-card>
          <v-card-title class="event_header primary_a white--text">
            <h3 class="pl-3 white--text">
              Пользователи
            </h3>
            <el-switch
              v-model="showOnlineUsers"
              class="pl-2"
              active-color="#13ce66">
            </el-switch>
            <span class="pl-2">
              <span v-if="showOnlineUsers">онлайн</span>
              <span v-else>оффлайн</span>
            </span>
          </v-card-title>
          <v-card>
            <div id="chat_users" ref="chatUsers" v-if="liveChats">
              <div v-for="(chat, id) of liveChats"
                   :key="id"
                   v-if="showOnlineUsers ? chat.props.onlineFrom : chat.props.lastOnline"
                   :class="chatId === id ? 'primary_a' : ''">
                <span v-if="chat.props.isTypingUser">
                  ...<v-icon size="small" class="primary_a--text">edit</v-icon>
                </span>
                <el-button type="text"
                           :class="chatId === id ? 'white--text' : ''"
                           @click="openChat(id)">
                  {{ chat.props.userEmail ? ( chat.props.userEmail ) : `Анонимный ( ${id.substring(0, 5)} )` }}
                  <el-tag size="mini"
                          :type="chatId === id ? '' : 'success'">
                    {{ chat.props.unreadByAdmin }}
                  </el-tag>
                  <span class="info--text">/</span>
                  <el-tag size="mini"
                          :type="chatId === id ? '' : 'info'">
                    <span v-if="chat.events">{{ Object.keys(chat.events).length }}</span>
                    <span v-else>0</span>
                  </el-tag>
                </el-button>
              </div>
            </div>
          </v-card>
        </v-card>
      </el-col>
      <!--USER EVENTS-->
      <user-events/>
      <!--LIVE CHAT-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8"
              class="pl-2 pr-2 mt-2">
        <live-chat
          v-if="chatId"
          :chatId="chatId"
          :isUserSide="false"
          :isCollapsed="false">
        </live-chat>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LiveChat from '@/components/live_chat/LiveChat'
import UserEvents from './UserEvents'

export default {
  name: 'AdminLiveChatBoard',
  components: {
    UserEvents,
    LiveChat
  },
  data () {
    return {
      chatId: '',
      showOnlineUsers: true
    }
  },
  methods: {
    openChat (chatId) {
      // CLOSE OLD CHAT
      if (this.chatId && this.chatId !== chatId) {
        this.$store.dispatch('setChatProp', {
          chatId: this.chatId,
          props: 'isCollapsedAdmin',
          value: 1
        })
        this.$store.dispatch('unsubscribeFromChat', this.chatId)
      }
      // OPEN NEW CHAT
      this.$store.dispatch('setChatProp', {
        chatId: chatId,
        props: 'isCollapsedAdmin',
        value: 0
      })
      this.$store.dispatch('setChatProp', {
        chatId: chatId,
        props: 'unreadByAdmin',
        value: 0
      })
      this.$store.dispatch('openChat', chatId)
      this.chatId = chatId
    }
  },
  computed: {
    liveChats () {
      return this.$store.getters.liveChats
    }
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
    height: 420px;
    overflow: scroll;
  }
</style>
