<template>
  <el-row type="flex" justify="center" class="main_header hidden-sm-and-down">
    <el-col :xs="14" :sm="12" :md="11" :lg="10" :xl="9">
      <el-row type="flex" justify="center" class="pl-1 pr-3">
        <el-col>
          <router-link to="/" active-class="active_header_link" exact>
            <span class="header_link">ГЛАВНАЯ</span>
          </router-link>
        </el-col>
        <el-col>
          <router-link to="/shop" active-class="active_header_link" exact>
            <span class="header_link">КАТАЛОГ</span>
          </router-link>
        </el-col>
        <el-col>
          <router-link to="/about" active-class="active_header_link" exact>
            <span class="header_link">О НАС</span>
          </router-link>
        </el-col>
        <el-col>
          <router-link to="/news" active-class="active_header_link" exact>
            <span class="header_link">АКЦИИ</span>
          </router-link>
        </el-col>
        <el-col>
          <router-link to="/contacts" active-class="active_header_link" exact>
            <span class="header_link">КОНТАКТЫ</span>
          </router-link>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped lang="scss">
  a {
    color: $color-secondary;
    text-decoration: none;
  }

  .main_header {
    flex-wrap: wrap;
    color: $color-secondary;
    font-weight: 500;
    padding-top: 40px;
    font-size: 13px;
    line-height: 34px;
    margin-bottom: 30px;
  }

  .header_link:hover {
    text-shadow: 2px 2px 20px #141414, 0 0 15px darkred;
  }

  .active_header_link {
    color: white;
    padding-bottom: 7px;
    font-weight: bold;
    border-bottom: 1px solid $color-secondary;
  }
</style>
