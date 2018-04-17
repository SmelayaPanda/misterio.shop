<template>
  <transition name="bounce">
    <div v-if="isCollapsedChat"
         @click="openChat">
      <div class="heart">
        <h2 v-if="unreadByUser">
          <span class="unread_by_user">
            +{{ unreadByUser }}
          </span>
        </h2>
        <img v-else src="@/assets/icons/common/heartbeat.svg" alt="">
      </div>
    </div>
    <v-card v-if="!isCollapsedChat"
            id="live_chat_card">
      <el-row type="flex" id="chat_header_wrap">
        <div id="chat_header_icon_wrap">
          <img id="chat_header_icon" src="@/assets/icons/common/chat_common.svg" alt="">
        </div>
        <el-col :span="3">
          <el-button @click="closeChat" type="text" id="close_chat_wrap">
            <i id="close_chat" class="el-icon-close"></i>
          </el-button>
        </el-col>
        <el-col :span="9" align="left">
          <div class="chat_header">
            Онлайн чат
          </div>
        </el-col>
        <el-col :span="7" align="right">
          <span id="consultant">
            Консультант
          </span>
        </el-col>
        <el-col :span="4" align="left" class="mr-2 ml-1">
          <span v-if="isTypingAdmin" key="1" class="consultant_status">
                ...<v-icon size="medium" class="white--text">edit</v-icon>
          </span>
          <span v-else-if="!isTypingAdmin && isOnlineAdmin" class="consultant_status" key="2">
                онлайн
            </span>
          <span v-else-if="!isOnlineAdmin" class="consultant_status" key="3">
                оффлайн
            </span>
        </el-col>
      </el-row>
      <v-card-text v-if="chatMessages"
                   ref="chatMessages"
                   id="chat_msg_wrap">
          <p v-if="Object.keys(chatMessages).length === 0" style="margin-top: 60px;">
            <span id="need_consulting">
              Нужна консультация? <br>
              Мы рады ответить на любой Ваш вопрос :)
            </span>
          </p>
        <div v-for="(chat, key) in chatMessages"
             :key="key">
          <el-row>
            <el-col :span="24" class="chat_msg_meta">
                <span :class="chat.creator ? 'left' : 'right'">
                <span>{{ chat.creator ? 'Вы' : 'Консультант' }}:</span>
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
      <div>
      <textarea v-model="msg"
                ref="msgInput"
                cols="46" rows="3"
                placeholder="Введите текст..."
                id="chat_input"
                @input="detectTyping"
                @keydup.shift.enter="msg+='\n'"
                @keydup.ctrl.enter="msg+='\n'"
                @keydup.alt.enter="msg+='\n'"
                @keydup.meta.enter="msg+='\n'"
                @keydup.down="msg+='\n'"
                @keyup.enter.exact="sendChatMessage">
      </textarea>
        <el-row>
          <el-button @click="sendChatMessage" id="send_msg_btn">
            Отправить
          </el-button>
        </el-row>
      </div>
    </v-card>
  </transition>
</template>

<script>
export default {
  name: 'UserLiveChat',
  props: ['chatId', 'isCollapsed'],
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
      this.setUnread('unreadByUser', 0)
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
          creator: 1 // user
        })
          .then(() => {
            this.$nextTick(function () {
              this.msg = ''
              this.$forceUpdate()
              this.scrollToBottom()
            })
          })
      }
      if (this.isCollapsedAdmin) {
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
        props: 'isTypingUser',
        value: this.isTyping ? 1 : 0
      })
    },
    setCollapse () {
      this.$store.dispatch('setChatProp', {
        chatId: this.chatId,
        props: 'isCollapsedUser',
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
      return this.$store.getters.chatMessages ? this.$store.getters.chatMessages : {}
    },
    isTypingAdmin () {
      return this.$store.getters.chatPropByName('isTypingAdmin')
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
  },
  created () {
    this.$bus.$on('openLiveChat', () => {
      this.openChat()
    })
  },
  beforeDestroy () {
    this.$bus.$off('openLiveChat')
  }
}
</script>

<style scoped lang="scss">
  #live_chat_card {
    position: fixed;
    bottom: 30px;
    right: 50px;
    width: 320px;
    height: 400px;
    border-radius: 8px;
    z-index: 10000;
  }

  #chat_header_icon_wrap {
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: -24px;
    width: 54px;
    height: 44px;
    background: $color-secondary;
    border-radius: 6px;
  }

  #chat_header_icon {
    margin-top: 8px;
    height: 16px;
  }

  #chat_header_wrap {
    height: 45px;
    background: $color-secondary;
    align-items: center;
  }

  .chat_header {
    color: white;
    font-size: 12px;
    font-weight: 600;
  }

  #close_chat_wrap {
    padding: 10px;
    color: white;
  }

  #close_chat {
    transition: all 0.5s;
  }

  #close_chat:hover {
    transform: rotate(180deg) scale(1.4);
  }

  #consultant {
    color: white;
    font-size: 10px;
  }

  .consultant_status {
    color: white;
    font-size: 10px;
  }
  #need_consulting {
    color: $color-info-dark;
    font-weight: 500;
  }

  #send_msg_btn {
    color: white;
    font-size: 11px;
    background: $color-secondary;
    width: 96%;
    border-radius: 7px;
    padding: 7px;
    margin-bottom: 6px;
  }

  #chat_input {
    padding: 5px;
  }

  #chat_msg_wrap {
    font-size: 12px;
    width: 100%;
    height: 280px;
    overflow: scroll;
  }

  textarea {
    font-size: 12px;
    margin-top: 5px;
    border: 1px solid lightgrey;
    border-radius: 3px;
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

  .chat_msg_meta {
    font-size: 10px;
    color: $color-info-dark
  }

  .chat_msg {
    white-space: pre-wrap;
    text-align: left;
  }

  /* User live chat heart */
  .heart {
    width: 64px;
    height: 64px;
    /** height is required as absolute value **/
    background-color: $color-secondary;
    border-radius: 100%;
    position: relative;
    animation: pulse 2000ms linear infinite;
    -webkit-animation: pulse 2000ms linear infinite;
    -moz-animation: pulse 2000ms linear infinite;
  }

  .heart:hover {
    cursor: pointer;
  }

  .heart img {
    height: 27px;
    position: absolute;
    top: 20px;
    left: 16px;
    color: white;
    text-shadow: $primary-text-shadow;
  }

  .unread_by_user {
    position: absolute;
    top: 16px;
    left: 20px;
    font-size: 22px;
    color: white;
  }

  .heart:after,
  .heart:before {
    display: block;
    margin: auto;
    position: absolute;
    content: "";
    width: 64px;
    height: 64px;
    border-radius: 100%;
    background-color: $color-secondary;
  }

  .heart:after {
    z-index: -100;
    -webkit-animation: outer-ripple 2000ms linear infinite;
    -moz-animation: outer-ripple 2000ms linear infinite;
    animation: outer-ripple 2000ms linear infinite;
  }

  .heart:before {
    z-index: -200;
    -webkit-animation: inner-ripple 2000ms linear infinite;
    -moz-animation: inner-ripple 2000ms linear infinite;
    animation: inner-ripple 2000ms linear infinite;
  }

  /* outer ripple */

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    10% {
      transform: scale(1.1);
      filter: alpha(opacity=1);
      opacity: 1;
    }
    20% {
      transform: scale(0.9);
      filter: alpha(opacity=1);
      opacity: 1;
    }
    100% {
      transform: scale(0.8);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
  }

  @-moz-keyframes pulse {
    0% {
      transform: scale(0.8);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    10% {
      transform: scale(1.1);
      filter: alpha(opacity=1);
      opacity: 1;
    }
    20% {
      transform: scale(0.9);
      filter: alpha(opacity=1);
      opacity: 1;
    }
    100% {
      transform: scale(0.8);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
  }

  @-webkit-keyframes pulse {
    0% {
      transform: scale(0.8);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    10% {
      transform: scale(1.1);
      filter: alpha(opacity=1);
      opacity: 1;
    }
    20% {
      transform: scale(0.9);
      filter: alpha(opacity=1);
      opacity: 1;
    }
    100% {
      transform: scale(0.8);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
  }

  @keyframes outer-ripple {
    0% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    80% {
      transform: scale(3);
      filter: alpha(opacity=0);
      opacity: 0;
    }
    100% {
      transform: scale(3);
      filter: alpha(opacity=0);
      opacity: 0;
    }
  }

  @-webkit-keyframes outer-ripple {
    0% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    80% {
      transform: scale(3);
      filter: alpha(opacity=0);
      opacity: 0;
    }
    100% {
      transform: scale(3);
      filter: alpha(opacity=0);
      opacity: 0;
    }
  }

  @-moz-keyframes outer-ripple {
    0% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    80% {
      transform: scale(3);
      filter: alpha(opacity=0);
      opacity: 0;
    }
    100% {
      transform: scale(3);
      filter: alpha(opacity=0);
      opacity: 0;
    }
  }

  /* inner ripple */

  @keyframes inner-ripple {
    0% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    30% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    100% {
      transform: scale(2.5);
      filter: alpha(opacity=0);
      opacity: 0;
    }
  }

  @-webkit-keyframes inner-ripple {
    0% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    30% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    100% {
      transform: scale(2.5);
      filter: alpha(opacity=0);
      opacity: 0;
    }
  }

  @-moz-keyframes inner-ripple {
    0% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    30% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    100% {
      transform: scale(2.5);
      filter: alpha(opacity=0);
      opacity: 0;
    }
  }
</style>
