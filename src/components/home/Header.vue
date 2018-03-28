<template>
  <el-row type="flex" justify="center" class="main_header">
    <el-col :xs="14" :sm="16" :md="14" :lg="12" :xl="10">
      <el-row type="flex" justify="center" style="flex-wrap: wrap" class="pl-1 pr-3">
        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
          <router-link to="" active-class="active_header_link">
            ГЛАВНАЯ
          </router-link>
        </el-col>
        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
          <router-link to="shop" active-class="active_header_link">
            КАТАЛОГ
          </router-link>
        </el-col>
        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
          <router-link to="about" active-class="active_header_link">
            О НАС
          </router-link>
        </el-col>
        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
          <router-link to="sale" active-class="active_header_link">
            АКЦИИ
          </router-link>
        </el-col>
        <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
          <router-link to="about" active-class="active_header_link">
            КОНТАКТЫ
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
    padding-top: 40px;
    font-size: 13px;
    line-height: 34px;
  }

  .header_link {
  }

  .active_header_link {
    color: white;
    padding-bottom: 7px;
    font-weight: bold;
    border-bottom: 1px solid $color-secondary;
  }
</style>
