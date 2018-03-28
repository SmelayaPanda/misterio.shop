<template>
  <div class="full_slide">
    <el-row type="flex" justify="center" class="main_header">
      <el-col :xs="24" :sm="18" :md="16" :lg="14" :xl="12">
        <span class="header_link">ГЛАВНАЯ</span>
        <span class="header_link">КАТАЛОГ</span>
        <span class="header_link">О НАС</span>
        <span class="header_link">АКЦИИ</span>
        <span class="header_link">КОНТАКТЫ</span>
      </el-col>
    </el-row>
    <slot name="bg_image"></slot>
    <slot name="content"></slot>
    <el-button type="text"
               @click="nextSlide"
               class="next_slide white--text">
      Листай вниз
    </el-button>
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
  .main_header {
    color: $--color-secondary;
    display: flex;
    padding-top: 40px;
    font-size: 14px;
  }

  .header_link {
    padding-top: 20px;
    padding-right: 30px;
    padding-left: 30px;
    border-bottom: solid white 2px;
    width: 30px
  }

  .next_slide {
    position: absolute;
    bottom: 35px;
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    border-bottom: solid $--color-secondary 2px;
    padding-right: -10px;
    height: 35px;
    font-size: 13px;
  }
</style>
