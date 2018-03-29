<template>
  <div>
    <app-heart-loader v-if="this.isLoading"></app-heart-loader>
    <div v-else-if="user">
      <div v-if="!user.isAnonymous">
        <!--Personal card-->
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col :xs="24" :sm="7" :md="6" :lg="5" :xl="4" class="ml-1 mr-1 mb-2">
            <el-card :body-style="{ padding: '0px' }">
              <img src="@/assets/placeholders/person_placeholder.png" height="200px">
              <div style="padding: 14px;">
                <span v-if="user.firstname">{{ user.firstname }}</span>
                <span v-if="user.lastname">{{ user.lastname }}</span>
                <span v-if="!user.firstname && !user.firstname">
                  Анонимный
                </span>
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
                <span v-if="user.email">{{ user.email }}</span><br>
                <span v-if="user.phone">{{ user.phone }}</span>
              </div>
            </el-card>
            <!--EDIT PERSONAL INFO-->
            <edit-personal-info></edit-personal-info>
            <br>
            <el-button type="danger" @click="onLogout">
              Выйти
            </el-button>
          </el-col>
          <el-col :xs="24" :sm="16" :md="14" :lg="11" :xl="8" class="ml-1 mr-1">
            <el-card>
              <h3 class="mb-3">
                Адрес
                <!--EDIT CONTACTS-->
                <edit-personal-address></edit-personal-address>
              </h3>
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
      <div v-else>
        <h3>
          <i class="el-icon-info"></i>
          Чтобы продолжить, подтвердите свой аккаунт.
        </h3>
        <p>Верификационная ссылка отправлена на почту: <br><span>{{ user.email }}</span></p>
      </div>
      <!--Anonimous-->
      <el-row type="flex" justify="center" v-if="this.isAnonymousUser">
        <el-col :span="14">
          <v-card style="padding: 10px;">
            <h2 class="mb-2 mt-2">
              Приветствуем! <br> Вы зашли как анонимный пользователь!
            </h2>
            <img src="@/assets/icons/anonymous-logo.png"
                 height="40px" class="mb-4 mt-3 white"> <br>
            <p style="font-weight: bold;">
              Вы не сможете управлять своими данными на на других устройствах
              и аккаунтом также как зарегистрированный пользователь!
              <br>
              <router-link to="/signup">
                <el-button type="text" class="secondary--text mt-2">
                  Зарегистрироваться
                </el-button>
              </router-link>
            </p>
          </v-card>
        </el-col>
      </el-row>
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

<style scoped>

</style>
