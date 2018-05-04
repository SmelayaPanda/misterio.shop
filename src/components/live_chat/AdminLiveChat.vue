<template>
  <transition name="bounce" v-if="chatId">
    <!--Admin-->
    <v-btn v-if="isCollapsedChat"
           fab class="primary_a white--text collapsed_chat"
           @click="openChat">
      <v-icon v-if="!unreadByAdmin">chat</v-icon>
      <h2 v-if="unreadByAdmin">
        +{{ unreadByAdmin }}
      </h2>
    </v-btn>
    <v-card v-if="!isCollapsedChat"
            id="liveChat"
            class="admin_live_chat">
      <v-card-title class="chat_header_admin">
        <el-button @click="closeChat" type="text" class="closeChat">
          <v-icon class="white--text">close</v-icon>
        </el-button>
        <h3 class="pl-3 white--text">
          Live Chat
          <span class="pl-3">|</span>
        </h3>
        <transition name="fade">
            <span v-if="isTypingUser" class="pl-4 white--text">
                <span>User</span>
                ...<v-icon size="medium" class="white--text">edit</v-icon>
            </span>
        </transition>
      </v-card-title>
      <v-card-text
        v-if="chatMessages"
        @scroll="autoLoadPrevMsg"
        ref="adminChatMessages"
        class="admin_chat_messages">
        <el-button
          v-if="!isAllMessagesLoaded"
          @click="loadPreviousChatMessages"
          :disabled="isPrevLoading"
          type="text">
          История
          <transition name="fade">
            <i v-if="isPrevLoading" class="el-icon-loading mt-1"></i>
            <i v-else class="el-icon-date mt-1"></i>
          </transition>
        </el-button>
        <div v-for="(chat, key) in chatMessages"
             :key="key">
          <el-row>
            <el-col :span="24" class="info--text chat_msg_meta">
                <span :class="chat.creator ? 'left' : 'right'">
                <span>{{ chat.creator ? 'Клиент' : 'Вы' }}:</span>
                <el-tooltip :content="new Date(chat.date) | date" placement="bottom">
                  <span class="info--text">{{ new Date(chat.date) | chatTime }}</span>
                </el-tooltip>
                </span>
            </el-col>
          </el-row>
          <el-row :class="chat.creator ? 'left' : 'right'">
            <el-col :span="24">
              <p :class="chat.creator ? 'pr-4 primary--text' : 'pl-4 success--text'"
                 class="chat_msg">{{ chat.msg }}</p>
            </el-col>
          </el-row>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
      <textarea
        v-model="msg"
        ref="msgInput"
        cols="100" rows="3"
        placeholder="Type..."
        class="chat_input"
        @input="detectTyping"
        @keydup.shift.enter="msg+='\n'"
        @keydup.ctrl.enter="msg+='\n'"
        @keydup.alt.enter="msg+='\n'"
        @keydup.meta.enter="msg+='\n'"
        @keydup.down="msg+='\n'"
        @keyup.enter.exact="sendChatMessage">
      </textarea>
      </v-card-actions>
    </v-card>
  </transition>
</template>

<script>
export default {
  name: 'AdminLiveChat',
  data () {
    return {
      msg: '',
      isTyping: false,
      isCollapsedChat: false,
      isPrevLoadingEvent: false,
      isPrevLoading: false,
      prevScrollHeight: 0
    }
  },
  methods: {
    openChat () {
      this.setCollapse(0)
      this.setUnread('unreadByAdmin', 0)
      this.$nextTick(function () {
        this.scrollToBottom()
      })
    },
    closeChat () {
      this.setCollapse(1)
    },
    sendChatMessage () {
      if (this.msg.trim()) {
        this.$store.dispatch('sendChatMessage', {chatId: this.chatId, msg: this.msg, creator: 0})
          .then(() => {
            this.$nextTick(function () {
              this.msg = ''
              this.$forceUpdate()
              this.scrollToBottom()
            })
          })
      }
      if (this.isCollapsedUser) {
        this.setUnread('unreadByUser', this.unreadByUser + 1)
      }
    },
    detectTyping () {
      this.setTyping(1)
      setTimeout(() => {
        this.setTyping(0)
      }, 4000)
    },
    setTyping (val) {
      this.isTyping = val
      this.$store.dispatch('setChatProp', {chatId: this.chatId, props: 'isTypingAdmin', value: val})
    },
    setCollapse (val) {
      this.isCollapsedChat = val
      this.$store.dispatch('setChatProp', {chatId: this.chatId, props: 'isCollapsedAdmin', value: val})
    },
    setUnread (by, count) {
      this.$store.dispatch('setChatProp', {chatId: this.chatId, props: by, value: count})
    },
    scrollToBottom () {
      if (this.$refs.adminChatMessages) {
        let chat = this.$refs.adminChatMessages
        chat.scrollTop = chat.scrollHeight
      }
    },
    async loadPreviousChatMessages () {
      console.log('Start loading')
      this.isPrevLoadingEvent = true
      this.isPrevLoading = await true
      await this.$store.dispatch('loadPreviousChatMessages')
      this.isPrevLoading = await false
    },
    autoLoadPrevMsg (event) {
      if (event.target.scrollTop < 100 && !this.isPrevLoading && !this.isAllMessagesLoaded) {
        this.loadPreviousChatMessages()
      }
    }
  },
  computed: {
    chatId () {
      return this.$store.getters.chatPropByName('id')
    },
    chatMessages () {
      return this.$store.getters.chatMessages ? this.$store.getters.chatMessages : []
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
    isOnlineUser () {
      return this.$store.getters.chatPropByName('onlineFrom')
    },
    isAllMessagesLoaded () {
      return this.$store.getters.isAllLoaded('messages')
    }
  },
  watch: {
    chatMessages () {
      if (this.isPrevLoadingEvent) {
        let chat = this.$refs.adminChatMessages
        chat.scrollTop = chat.scrollHeight - this.prevScrollHeight + 95
        this.prevScrollHeight = chat.scrollHeight
        this.isPrevLoadingEvent = false
      } else {
        this.$nextTick(function () {
          this.scrollToBottom()
        })
      }
    }
  },
  created () {
    this.$bus.$on('openLiveChat', () => {
      this.openChat()
    })
  }
}
</script>

<style scoped lang="scss">
  #liveChat {
    z-index: 10;
  }

  .chat_header_admin {
    margin-bottom: 1px;
    padding-bottom: 12px;
    background: $color-primary_a;
  }

  .chat_input {
    padding: 5px;
  }

  .admin_chat_messages {
    width: 100%;
    height: 326px;
    overflow: scroll;
  }

  .admin_live_chat {
    height: 400px;
    z-index: 10000;
  }

  .collapsed_chat {
    position: fixed;
    bottom: 30px;
    right: 40px;
    z-index: 10000;
  }

  textarea {
    border: 1px solid lightgrey;
    border-radius: 3px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
  {
    opacity: 0;
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .closeChat {
    margin: 0;
    padding: 0;
  }

  .chat_msg_meta {
    font-size: 10px;
    color: $color-info-dark
  }

  .chat_msg {
    white-space: pre-wrap;
    text-align: left;
  }
</style>
