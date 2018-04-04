<template>
  <div>
    <app-heart-loader v-if="this.isLoading"></app-heart-loader>
    <div v-else-if="user">
      <div v-if="!user.isAnonymous && user.emailVerified">
        <!--Personal card-->
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col :xs="23" :sm="23" :md="21" :lg="16" :xl="13" align="left" class="ml-1 mr-1 mb-3 mt-2">
            <img src="@/assets/icons/user/user_account.svg" id="user_icon" alt="">
            <span id="account_title">
                ЛИЧНЫЙ КАБИНЕТ
              </span>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col :xs="23" :sm="6" :md="6" :lg="4" :xl="4" class="ml-1 mr-1 mb-2">
            <el-card :body-style="{ padding: '0px' }">
              <img src="@/assets/placeholders/person_placeholder.png" height="210px">
              <div style="padding: 14px;">
                <span v-if="user.firstname">{{ user.firstname }}</span>
                <span v-if="user.lastname">{{ user.lastname }}</span>
                <span v-if="!user.firstname && !user.firstname">
                  Анонимный
                </span>
              </div>
            </el-card>
            <!--TODO: wrong date converting-->
            <el-card class="mt-2" :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <span v-if="user.birthday">{{ user.birthday | birthday }}</span>
                <span v-else>DD-MM-YYYY</span>
              </div>
            </el-card>
            <el-card class="mt-2" :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <span v-if="user.email">{{ user.email }}</span><br>
                <span v-if="user.phone">{{ user.phone }}</span>
              </div>
            </el-card>
            <!--EDIT PERSONAL INFO-->
            <edit-personal-info></edit-personal-info>
            <br>
            <div @click="onLogout">
              <app-theme-btn
                id="logout"
                type="primary"
                width="120px">
                Выйти
              </app-theme-btn>
            </div>
          </el-col>
          <el-col :xs="23" :sm="16" :md="14" :lg="11" :xl="8" class="ml-1 mr-1">
            <el-card>
              <!--EDIT CONTACTS-->
              <edit-personal-address></edit-personal-address>
              <el-row type="flex"
                      style="flex-wrap: wrap">
                <el-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" class="pl-2 pr-2" align="left">
                  <p>Страна:
                    <span v-if="user.address">{{ user.address.country }}</span>
                    <span v-else class="info--text"> no data</span>
                  </p>
                  <p>Город:
                    <span v-if="user.address">{{ user.address.city }}</span>
                    <span v-else class="info--text"> no data</span>
                  </p>
                  <p>Улица:
                    <span v-if="user.address">{{ user.address.street }}</span>
                    <span v-else class="info--text"> no data</span>
                  </p>
                </el-col>
                <el-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12" class="pl-2 pr-2" align="left">
                  <p>Дом:
                    <span v-if="user.address">{{ user.address.build }}</span>
                    <span v-else class="info--text"> no data</span>
                  </p>
                  <p>Квартира:
                    <span v-if="user.address">{{ user.address.house }}</span>
                    <span v-else class="info--text"> no data</span>
                  </p>
                  <p>Почтовый код:
                    <span v-if="user.address">{{ user.address.postCode }}</span>
                    <span v-else class="info--text"> no data</span>
                  </p>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div v-else style="margin-top: 60px;">
        <el-row type="flex" justify="center">
          <el-col :xs="23" :sm="20" :md="15" :lg="13" :xl="12" type="flex" align="center">
            <b class="white--text">
              <i class="el-icon-info"></i>
              Чтобы продолжить, подтвердите свой аккаунт.
            </b>
            <p class="white--text">
              Верификациооная ссылка отправлена на Вашу почту <span>{{ user.email }}</span>
            </p>
            <p id="error_email">Ошиблись с email?</p>
            <router-link to="/signup" exact>
              <app-theme-btn type="primary" class="mt-1 mb-2">
                Зарегистрироваться
              </app-theme-btn>
            </router-link>
          </el-col>
        </el-row>
      </div>
      <!--Anonymous-->
      <anonymous-account></anonymous-account>
    </div>
  </div>
</template>

<script>
import EditPersonalInfo from './EditPersonalInfo'
import EditPersonalAddress from './EditPersonalAddress'
import AnonymousAccount from './AnonymousAccount'

export default {
  name: 'Account',
  data () {
    return {}
  },
  components: {
    AnonymousAccount,
    EditPersonalInfo,
    EditPersonalAddress
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style scoped lang="scss">
  #logout {
    margin: 0 auto;
  }

  #account_title {
    color: $color-secondary;
    font-size: 16px;
    margin-top: 20px;
  }

  #user_icon {
    position: relative;
    height: 28px;
    margin-bottom: -7px;
    padding-right: 12px;
  }

  #error_email {
    color: white;
    font-size: 12px;
    font-weight: 500;
    margin-top: 60px;
    margin-bottom: 0;
  }
</style>
