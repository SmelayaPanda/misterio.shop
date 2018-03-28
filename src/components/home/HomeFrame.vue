<template>
  <div class="full_slide">
    <el-row type="flex" justify="center" class="main_header">
      <el-col :xs="24" :sm="14" :md="12" :lg="10" :xl="8">
        <el-row type="flex" justify="center" class="pl-1 pr-3">
          <el-col align="center">
            <router-link to="" active-class="active_header_link">
              ГЛАВНАЯ
            </router-link>
          </el-col>
          <el-col>
            <router-link to="shop" active-class="active_header_link">
              КАТАЛОГ
            </router-link>
          </el-col>
          <el-col>
            <router-link to="about" active-class="active_header_link">
              О НАС
            </router-link>
          </el-col>
          <el-col>
            <router-link to="sale" active-class="active_header_link">
              АКЦИИ
            </router-link>
          </el-col>
          <el-col>
            <router-link to="about" active-class="active_header_link">
              КОНТАКТЫ
            </router-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <slot name="bg_image"></slot>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: 'HomeFrame',
  methods: {
    nextSlide () {
      console.log('Next')
    }
  }
}
</script>

<style scoped lang="scss">
  a {
    color: $color-secondary;
    text-decoration: none;
  }

  .full_slide {
    z-index: 10;
  }

  .main_header {
    color: $color-secondary;
    display: flex;
    padding-top: 50px;
    font-size: 13px;
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
