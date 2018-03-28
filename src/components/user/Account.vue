<template>
  <div>
    <!--Loading circular-->
    <v-container v-if="this.isLoading">
      <app-loader></app-loader>
    </v-container>
    <div v-else>
      <div v-if="user.emailVerified">
        <!--Personal card-->
        <div></div>
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col :xs="24" :sm="6" :md="5" :lg="4" :xl="3" class="ml-1 mr-1 mb-2">
            <el-card :body-style="{ padding: '0px' }">
              <img src="@/assets/placeholders/person_placeholder.png" height="200px">
              <div style="padding: 14px;">
                <span v-if="user.firstname">{{ user.firstname }}</span>
                <span v-if="user.lastname">{{ user.lastname }}</span>
                <span v-if="!user.firstname && !user.firstname">Anonymous</span>
              </div>
            </el-card>
            <el-card class="mt-2" :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <span v-if="user.birthday">{{ user.birthday.toDateString() }}</span>
                <span v-else>DD-MM-YYYY</span>
              </div>
            </el-card>
            <el-card class="mt-2" :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <span v-if="this.user.email">{{ this.user.email }}</span><br>
                <span v-if="this.user.phone">{{ this.user.phone }}</span>
              </div>
            </el-card>
            <!--EDIT PERSONAL INFO-->
            <edit-personal-info></edit-personal-info>
          </el-col>
          <el-col :xs="24" :sm="17" :md="15" :lg="12" :xl="9" class="ml-1 mr-1">
            <el-card>
              <h3 class="mb-3">
                Contacts
                <!--EDIT CONTACTS-->
                <edit-personal-address></edit-personal-address>
              </h3>
              <el-row type="flex"
                      style="flex-wrap: wrap">
                <el-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" class="pl-2 pr-2" align="left">
                  <p>Country:
                    <span v-if="user.address">{{ user.address.country }}</span>
                    <span v-else class="info--text"> no data</span>
                  </p>
                  <p>City:
                    <span v-if="user.address">{{ user.address.city }}</span>
                    <span v-else class="info--text"> no data</span>
                  </p>
                  <p>Street:
                    <span v-if="user.address">{{ user.address.street }}</span>
                    <span v-else class="info--text"> no data</span>
                  </p>
                </el-col>
                <el-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" class="pl-2 pr-2" align="left">
                  <p>Build:
                    <span v-if="user.address">{{ user.address.build }}</span>
                    <span v-else class="info--text"> no data</span>
                  </p>
                  <p>House:
                    <span v-if="user.address">{{ user.address.house }}</span>
                    <span v-else class="info--text"> no data</span>
                  </p>
                  <p>Post Code:
                    <span v-if="user.address">{{ user.address.postCode }}</span>
                    <span v-else class="info--text"> no data</span>
                  </p>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div v-else-if="!this.isAnonymousUser">
        <h3>
          <i class="el-icon-info"></i>
          Confirm your email address to continue
        </h3>
        <p>Email with verification link sent to address: <br><span>{{ user.email }}</span></p>
      </div>
      <div v-if="this.isAnonymousUser">
        <h2 class="mb-2">
          Welcome anonymous user!
        </h2>
        <img src="@/assets/icons/anonymous-logo.png" height="40px" class="mb-4 mt-3"> <br>
        <p class="error--text">
          <el-tag type="danger">
            * Note: Your data is not accessible on other devices and you can't manage full account.
          </el-tag>
          <br>
          <router-link to="/signup">
            <el-button type="text" class="primary--text">Register</el-button>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import EditPersonalInfo from '@/components/user/EditPersonalInfo'
import EditPersonalAddress from '@/components/user/EditPersonalAddress'

export default {
  name: 'Account',
  data () {
    return {}
  },
  components: {
    EditPersonalInfo,
    EditPersonalAddress
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style scoped>

</style>
