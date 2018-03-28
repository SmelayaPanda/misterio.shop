<template>
  <div class="full_slide">
    <user-icons></user-icons>
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
    <div id="flip_down_wrapper">
      <p id="flip_down">Листай вниз</p>
    </div>
    <slot name="bg_image"></slot>
    <slot name="content"></slot>
  </div>
</template>

<script>
import UserIcons from '@/components/home/UserIcons'
export default {
  name: 'HomeFrame',
  components: {
    UserIcons
  },
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

  #flip_down_wrapper {
    position: absolute;
    bottom: 12px;
    left: 50%;
    @include translateX(-43px);
    #flip_down {
      font-size: 11px;
      color: white;
      @include rotate(-90deg);
    }
    #flip_down:after {
      content: "";
      display: block;
      width: 60px;
      margin: 5px auto;
      border-bottom: 1px solid $color-secondary;
    }
  }
</style>
