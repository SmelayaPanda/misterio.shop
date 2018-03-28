<template>
  <div>
    <el-row type="flex" justify="left" style="flex-wrap: wrap">
      <!--ALL USERS-->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8"
              class="pl-2 pr-2 mt-2">
        <v-card>
          <v-card-title class="event_header primary white--text">
            <h3 class="pl-3 white--text">
              Live chat users
            </h3>
            <el-switch
              v-model="showOnlineUsers"
              class="pl-2"
              active-color="#13ce66">
            </el-switch>
            <span class="pl-2">
              <span v-if="showOnlineUsers">online</span>
              <span v-else>offline</span>
            </span>
          </v-card-title>
          <v-card>
            <div id="chat_users" ref="chatUsers" v-if="liveChats">
              <div v-for="(chat, id) of liveChats"
                   :key="id"
                   v-if="showOnlineUsers ? chat.props.onlineFrom : chat.props.lastOnline"
                   :class="chatId === id ? 'primary' : ''">
                <span v-if="chat.props.isTypingUser">
                  ...<v-icon size="small" class="primary--text">edit</v-icon>
                </span>
                <el-button type="text"
                           :class="chatId === id ? 'white--text' : ''"
                           @click="openChat(id)">
                  {{ chat.props.userEmail ? ( chat.props.userEmail ) : `Anonymous ( ${id.substring(0, 5)} )` }}
                  <el-tag size="mini"
                          :type="chatId === id ? '' : 'success'">
                    {{ chat.props.unreadByAdmin }}
                  </el-tag>
                  <span :class="chatId === id ? 'primary--text' : 'info--text'">/</span>
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
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8"
              class="pl-2 pr-2 mt-2"
              v-if="userEvents">
        <v-card>
          <v-card-title class="event_header primary white--text">
            <h3 class="pl-3 white--text">
              User Events
            </h3>
          </v-card-title>
          <div ref="userEvents" id="event_messages">
            <el-row v-for="(event, idx) in userEvents"
                    :key="idx"
                    justify="left">
              <el-col :span="6" class="info--text left pr-1 chat_time">
                {{ new Date(event.date) | chatTime }}
              </el-col>
              <el-col :span="18" align="left" class="pb-2">{{ event.name }}</el-col>
            </el-row>
          </div>
        </v-card>
      </el-col>
      <!--LIVE CHAT-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8"
              class="pl-2 pr-2 mt-2"
              v-if="userEvents">
        <live-chat v-if="chatId"
                   :chatId="chatId"
                   :isUserSide="false"
                   :isCollapsed="false">
        </live-chat>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LiveChat from '@/components/shared/LiveChat'

export default {
  name: 'AdminLiveChat',
  components: {
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
    },
    scrollEventsToBottom () {
      if (this.$refs.userEvents) {
        let events = this.$refs.userEvents
        events.scrollTop = events.scrollHeight
      }
    }
  },
  computed: {
    liveChats () {
      return this.$store.getters.liveChats
    },
    userEvents () {
      return this.$store.getters.userEvents
    }
  },
  watch: {
    userEvents () {
      this.$nextTick(function () {
        this.scrollEventsToBottom()
      })
    }
  }
}
</script>

<style scoped>
  .event_header {
    margin-bottom: 1px;
    padding-bottom: 12px;
  }

  #event_messages {
    width: 100%;
    height: 420px;
    overflow: scroll;
  }

  #chat_users {
    width: 100%;
    height: 420px;
    overflow: scroll;
  }

  .chat_time {
    font-size: 10px;
    padding-top: 4px;
  }
</style>
