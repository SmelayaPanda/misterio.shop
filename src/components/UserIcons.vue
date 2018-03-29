<template>
  <div>
    <div class="user_icons hidden-sm-and-down">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <router-link to="/favorite" exact>
            <div>
              <img v-if="this.$route.path === '/favorite'"
                   src="@/assets/icons/favorite_white.svg" alt=""
                   class="favorite_icon"
                   height="40px" width="40px">
              <img v-else
                   src="@/assets/icons/favorite.svg" alt=""
                   class="favorite_icon"
                   height="40px" width="40px">
            </div>
          </router-link>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <router-link to="/account" exact>
            <div>
              <img v-if="this.$route.path === '/account'"
                   src="@/assets/icons/user_white.svg" alt=""
                   class="user_icon"
                   height="40px">
              <img v-else
                   src="@/assets/icons/user.svg" alt=""
                   class="user_icon"
                   height="40px">
            </div>
          </router-link>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <router-link to="/cart" exact>
            <div>
              <img v-if="this.$route.path === '/cart'"
                   src="@/assets/icons/bag_white.svg"
                   alt=""
                   height="40px">
              <img v-else
                   src="@/assets/icons/bag.svg"
                   alt=""
                   height="40px">
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <!--Mobile version-->
  </div>
</template>

<script>
export default {
  name: 'UserIcons'
}
</script>

<style scoped lang="scss">
  .user_icons {
    position: absolute;
    width: 174px;
    z-index: 2;
  }

  .mobile_user_icons {
    margin-top: 20px;
    margin-bottom: 30px;
  }

  img:hover {
    filter: drop-shadow(2px 2px 10px #888);
  }
</style>
