<template>
  <div>
    <div class="user_icons hidden-sm-and-down">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <img src="@/assets/img/common/favorite.svg" alt=""
               class="favorite_icon"
               height="40px">
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <img src="@/assets/img/common/user.svg" alt=""
               class="user_icon"
               height="40px">
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <img src="@/assets/img/common/bag.svg" alt=""
               height="40px">
        </el-col>
      </el-row>
    </div>
    <!--Mobile version-->
    <el-row type="flex" justify="center" class="mobile_user_icons hidden-md-and-up">
      <el-col :span="5">
        <img src="@/assets/img/common/favorite.svg" alt=""
             class="favorite_icon"
             height="40px">
      </el-col>
      <el-col :span="5">
        <img src="@/assets/img/common/user.svg" alt=""
             class="user_icon"
             height="40px">
      </el-col>
      <el-col :span="5">
        <img src="@/assets/img/common/bag.svg" alt=""
             height="40px">
      </el-col>
    </el-row>
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
    right: 30px;
    top: 45px;
    width: 174px;
  }

  .mobile_user_icons {
    margin-top: 20px;
  }
</style>
