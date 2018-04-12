<template>
  <div v-if="this.isAnonymousUser">
    <el-row type="flex" justify="center">
      <el-col :xs="23" :sm="20" :md="15" :lg="13" :xl="12" type="flex" align="center">
        <div id="anonymous_card">
          <p id="greeting">
            Приветствуем!
          </p>
          <b>Вы зашли как анонимный пользователь!</b><br>
          <img src="@/assets/icons/common/anonymous.png"
               id="anonymous_icon"><br>
          <b>
            Вы не сможете управлять своими данными на на других устройствах
            и аккаунтом также как зарегистрированный пользователь!
            <br>
            <router-link to="/signup" exact>
              <app-theme-btn type="primary" class="mt-4 mb-2">
                Зарегистрироваться
              </app-theme-btn>
            </router-link>
            <router-link to="/signin" exact>
              <app-theme-btn class="mt-4 mb-2">
                Войти
              </app-theme-btn>
            </router-link>
          </b>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AnonymousAccount'
}
</script>

<style scoped lang="scss">
  #greeting {
    font-family: $secondary-font;
    font-size: 20px;
    letter-spacing: 1px;
    background: linear-gradient(to right, $color-secondary-light 43%, $color-secondary 51%);
    color: transparent;
    -webkit-background-clip: text;
    margin-top: 20px;
  }

  #greeting:after {
    content: '';
    display: block;
    width: 120px;
    height: 3px;
    border-bottom: 2px solid $color-secondary;
  }

  #anonymous_card {
    padding: 15px;
    border-radius: 8px;
    color: white;
  }

  #anonymous_icon {
    height: 80px;
    margin-top: 10px;
  }

  #red_mask {
  }
</style>
