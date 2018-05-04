<template>
    <v-card  v-if="userEvents">
      <v-card-title class="event_header primary_a white--text">
        <h3 class="pl-3 white--text">
          Действия пользователя
        </h3>
      </v-card-title>
      <div v-if="userEvents"
           @scroll="autoLoadPrevEvents"
           ref="userEvents"
           id="event_messages">
        <el-button
          v-if="!isAllEventsLoaded"
          @click="loadPreviousUserEvents"
          :disabled="isPrevLoading"
          type="text">
          История
          <transition name="fade">
            <i v-if="isPrevLoading" class="el-icon-loading mt-1"></i>
            <i v-else class="el-icon-date mt-1"></i>
          </transition>
        </el-button>
        <el-row v-for="(event, idx) in userEvents"
                :key="idx"
                justify="left">
          <el-col :span="5">
            <el-tooltip :content="new Date(event.date) | date" placement="bottom">
             <span class="info--text chat_time">{{ new Date(event.date) | chatTime }}</span>
            </el-tooltip>
          </el-col>
          <el-col :span="18" align="left" class="pb-2">{{ event.name }}</el-col>
        </el-row>
      </div>
    </v-card>
</template>
<script>
export default {
  name: 'user-events',
  data () {
    return {
      isPrevLoadingEvent: false,
      isPrevLoading: false,
      prevScrollHeight: 0
    }
  },
  methods: {
    scrollToBottom () {
      if (this.$refs.userEvents) {
        let events = this.$refs.userEvents
        events.scrollTop = events.scrollHeight
      }
    },
    async loadPreviousUserEvents () {
      console.log('Start loading events')
      this.isPrevLoadingEvent = true
      this.isPrevLoading = await true
      await this.$store.dispatch('loadPreviousUserEvents')
      this.isPrevLoading = await false
    },
    autoLoadPrevEvents (event) {
      if (event.target.scrollTop < 100 && !this.isPrevLoading && !this.isAllEventsLoaded) {
        this.loadPreviousUserEvents()
      }
    }
  },
  computed: {
    userEvents () {
      return this.$store.getters.userEvents ? this.$store.getters.userEvents : []
    },
    isAllEventsLoaded () {
      return this.$store.getters.isAllLoaded('events')
    }
  },
  watch: {
    userEvents () {
      if (this.isPrevLoadingEvent) {
        let events = this.$refs.userEvents
        events.scrollTop = events.scrollHeight - this.prevScrollHeight + 95
        this.prevScrollHeight = events.scrollHeight
        this.isPrevLoadingEvent = false
      } else {
        this.$nextTick(function () {
          this.scrollToBottom()
        })
      }
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
    padding-right: 8px;
  }

  .chat_time {
    font-size: 10px;
    padding-top: 4px;
  }
</style>
