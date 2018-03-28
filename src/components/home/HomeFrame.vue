<template>
  <div class="full_slide">
    <el-row type="flex" justify="center" class="main_header">
      <el-col :xs="24" :sm="14" :md="12" :lg="10" :xl="8">
        <el-row type="flex" justify="center">
          <el-col align="center">
            <router-link to="/">
              <span type="text" class="header_link">
                ГЛАВНАЯ
              </span>
            </router-link>
          </el-col>
          <el-col>
            <router-link to="shop">
              <span class="header_link">КАТАЛОГ</span>
            </router-link>
          </el-col>
          <el-col>
            <router-link to="about">
              <span class="header_link">О НАС</span>
            </router-link>
          </el-col>
          <el-col>
            <router-link to="sale">
              <span class="header_link">АКЦИИ</span>
            </router-link>
          </el-col>
          <el-col>
            <router-link to="about">
              <span class="header_link">КОНТАКТЫ</span>
            </router-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <slot name="bg_image"></slot>
    <slot name="content"></slot>
    <div class="next_slide_wrapper">
    <el-button type="text"
               @click="nextSlide"
               class="next_slide white--text">
      Листай вниз
    </el-button>
    </div>
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
    padding-top: 20px;
    width: 40px;
    z-index: 10;
    position: relative;
  }

  .header_link:after {
    content: "";
    display: block;
    width: 50px;
    padding-top: 5px;
    margin: 0 auto;
    border-bottom: 1px solid $color-secondary;
  }

  .next_slide_wrapper {
    position: absolute;
    bottom: 24px;
    left: 50%;
    @include translateX(-51px)
  }

  .next_slide_wrapper:after {
    content: "";
    position: absolute;
    left: -15px;
    bottom: 50%;
    width: 58px;
    margin: 0 0 0 40px;
    border-bottom: 2px solid $color-secondary;
    @include rotate(-90deg);
  }
  .next_slide {
    height: 25px;
    font-size: 11px;
    @include rotate(-90deg)
  }
</style>
