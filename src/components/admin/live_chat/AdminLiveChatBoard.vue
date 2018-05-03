<template>
  <div>
    <el-row type="flex" justify="left" style="flex-wrap: wrap; margin-bottom: 60px;">
      <!--ALL USERS-->
      <el-col :xs="24" :sm="12" :md="12" :lg="9" :xl="8" class="pl-3 pr-3 mt-2">
        <users-list/>
      </el-col>
      <!--USER DATA-->
      <el-col :xs="24" :sm="12" :md="12" :lg="9" :xl="8" class="pl-3 pr-3 mt-2">
        <user-data/>
      </el-col>
      <!--USER EVENTS-->
      <el-col :xs="24" :sm="12" :md="12" :lg="9" :xl="8" class="pl-3 pr-3 mt-2">
        <user-events/>
      </el-col>
      <!--LIVE CHAT-->
      <el-col :xs="24" :sm="12" :md="12" :lg="9" :xl="8" class="pl-3 pr-3 mt-2">
        <admin-live-chat/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AdminLiveChat from '@/components/live_chat/AdminLiveChat'
import UserEvents from './UserEvents'
import UserData from './UserData'
import UsersList from './UsersList'

export default {
  name: 'AdminLiveChatBoard',
  components: {
    UsersList,
    UserData,
    UserEvents,
    AdminLiveChat
  },
  data () {
    return {}
  }
}
</script>
