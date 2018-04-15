<template>
  <el-col v-if="userEvents"
          :xs="24" :sm="12" :md="8" :lg="8" :xl="8"
          class="pl-2 pr-2 mt-2">
    <v-card>
      <v-card-title class="event_header primary_a white--text">
        <h3 class="pl-3 white--text">
          Действия пользователя
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
</template>
<script>
export default {
  name: 'user-events',
  methods: {
    scrollEventsToBottom () {
      if (this.$refs.userEvents) {
        let events = this.$refs.userEvents
        events.scrollTop = events.scrollHeight
      }
    }
  },
  computed: {
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
    padding-right: 8px;
  }

  .chat_time {
    font-size: 10px;
    padding-top: 4px;
  }
</style>
