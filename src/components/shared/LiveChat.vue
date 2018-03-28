<template>
  <transition name="bounce">
    <v-btn fab class="primary collapsed_chat"
           v-if="isCollapsedChat"
           @click="openChat"
    >
      <v-icon v-if="isUserSide && !unreadByUser">chat</v-icon>
      <v-icon v-if="!isUserSide && !unreadByAdmin">chat</v-icon>
      <h2 v-if="isUserSide && unreadByUser"> +{{ unreadByUser }}</h2>
      <h2 v-if="!isUserSide && unreadByAdmin"> +{{ unreadByAdmin }}</h2>
    </v-btn>
    <v-card v-if="!isCollapsedChat" :class="isUserSide ? 'user_live_chat' : 'admin_live_chat'">
      <v-card-title class="chat_header primary">
        <el-button type="text"
                   class="closeChat"
                   @click="closeChat"
        >
          <v-icon class="white--text">close</v-icon>
        </el-button>
        <h3 class="pl-3 white--text">
          Live Chat
          <span class="pl-3">|</span>
        </h3>
        <transition name="fade">
            <span v-if="isUserSide ? isTypingAdmin : isTypingUser" class="pl-4 white--text">
                <span v-if="!isUserSide">User</span>
                <span v-if="isUserSide">Admin</span>
                ...<v-icon size="medium" class="white--text">edit</v-icon>
            </span>
            <span v-if="isUserSide && !isTypingAdmin && isOnlineAdmin" class="pl-4 white--text">
              Admin online
            </span>
            <span v-if="isUserSide && !isOnlineAdmin" class="pl-4 white--text">
              Admin offline
            </span>
        </transition>
      </v-card-title>
      <v-card-text v-if="chatMessages"
                   ref="chatMessages"
                   :class="isUserSide ? 'user_chat_messages' : 'admin_chat_messages'">
          <span v-if="Object.keys(chatMessages).length === 0 && isUserSide">
            <h2 class="pt-5 info--text">Have question?</h2>
          </span>
        <div v-for="(chat, key) in chatMessages"
             :key="key">
          <el-row>
            <el-col :span="24" class="info--text chat_msg_meta">
                <span :class="chat.creator ? 'left' : 'right'">
                <span v-if="isUserSide">{{ chat.creator ? 'You' : 'ReHigh' }}:</span>
                <span v-if="!isUserSide">{{ chat.creator ? 'User' : 'You' }}:</span>
                {{ new Date(chat.date) | chatTime }}
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
      <textarea v-model="msg"
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
                @keyup.enter.exact="sendChatMessage"></textarea>
      </v-card-actions>
    </v-card>
  </transition>
</template>

<script>
export default {
  name: 'LiveChat',
  // isUserSide === false -> admin
  props: ['chatId', 'isUserSide', 'isCollapsed'],
  data () {
    return {
      msg: '',
      isTyping: false,
      isCollapsedChat: this.isCollapsed
    }
  },
  methods: {
    openChat () {
      this.isCollapsedChat = false
      this.setCollapse()
      this.setUnread(this.isUserSide ? 'unreadByUser' : 'unreadByAdmin', 0)
      this.$nextTick(function () {
        this.scrollToBottom()
      })
    },
    closeChat () {
      this.isCollapsedChat = true
      this.setCollapse()
    },
    sendChatMessage () {
      if (this.msg.trim()) {
        this.$store.dispatch('sendChatMessage', {
          chatId: this.chatId,
          msg: this.msg,
          creator: this.isUserSide ? 1 : 0
        })
          .then(() => {
            this.$nextTick(function () {
              this.msg = ''
              this.$forceUpdate()
              this.scrollToBottom()
            })
          })
      }
      if (!this.isUserSide && (this.isCollapsedUser || !this.isOnlineUser)) { // message from admin
        this.setUnread('unreadByUser', this.unreadByUser + 1)
      } else if (this.isCollapsedAdmin && this.isUserSide) { // message from user
        this.setUnread('unreadByAdmin', this.unreadByAdmin + 1)
      }
    },
    detectTyping () {
      this.isTyping = true
      this.setTyping()
      setTimeout(() => {
        this.isTyping = false
        this.setTyping()
      }, 4000)
    },
    setTyping () {
      this.$store.dispatch('setChatProp', {
        chatId: this.chatId,
        props: this.isUserSide ? 'isTypingUser' : 'isTypingAdmin',
        value: this.isTyping ? 1 : 0
      })
    },
    setCollapse () {
      this.$store.dispatch('setChatProp', {
        chatId: this.chatId,
        props: this.isUserSide ? 'isCollapsedUser' : 'isCollapsedAdmin',
        value: this.isCollapsedChat ? 1 : 0
      })
    },
    setUnread (by, count) {
      this.$store.dispatch('setChatProp', {
        chatId: this.chatId,
        props: by,
        value: count
      })
    },
    scrollToBottom () {
      if (this.$refs.chatMessages) {
        let chat = this.$refs.chatMessages
        chat.scrollTop = chat.scrollHeight
      }
      if (this.$refs.msgInput) {
        this.$refs.msgInput.focus()
      }
    }
  },
  computed: {
    chatMessages () {
      return this.$store.getters.chatMessages
    },
    isTypingUser () {
      return this.$store.getters.chatPropByName('isTypingUser')
    },
    isTypingAdmin () {
      return this.$store.getters.chatPropByName('isTypingAdmin')
    },
    isCollapsedUser () {
      return this.$store.getters.chatPropByName('isCollapsedUser')
    },
    isCollapsedAdmin () {
      return this.$store.getters.chatPropByName('isCollapsedAdmin')
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
    isOnlineAdmin () {
      return this.$store.getters.isOnlineAdmin
    }
  },
  watch: {
    chatMessages () {
      this.$nextTick(function () {
        this.scrollToBottom()
      })
    }
  }
}
</script>

<style scoped>
  .chat_header {
    margin-bottom: 1px;
    padding-bottom: 12px;
  }

  .chat_input {
    padding: 5px;
  }

  .user_chat_messages {
    width: 100%;
    height: 280px;
    overflow: scroll;
  }

  .admin_chat_messages {
    width: 100%;
    height: 326px;
    overflow: scroll;
  }

  .user_live_chat {
    position: fixed;
    bottom: 30px;
    right: 40px;
    width: 320px;
    height: 400px;
    z-index: 10000;
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
    font-size: 10px
  }

  .chat_msg {
    white-space: pre-wrap;
    text-align: left;
  }
</style>
