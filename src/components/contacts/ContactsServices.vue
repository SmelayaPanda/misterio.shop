<template>
  <div>
    <p id="header_1">УСЛУГИ</p>
    <router-link to="/shop" exact>
      <el-button type="text" class="sub_header">
        Каталог
      </el-button>
    </router-link>
    <br>
    <router-link to="/news" exact>
      <el-button type="text" class="sub_header">
        Акции и новости
      </el-button>
    </router-link>
    <br>
    <router-link to="/about" exact>
      <el-button type="text" class="sub_header">
        Отзывы о нас
      </el-button>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'contacts-services'
}
</script>
<style scoped lang="scss">
  #header_1 {
    font-size: 13px;
    font-family: $secondary-font;
    letter-spacing: 1px;
    color: white;
    margin-bottom: 10px;
  }
  #header_1:after {
    width: 65px;
    content: "";
    display: block;
    height: 1px;
    border-bottom: 1px solid $color-secondary;
  }

  .sub_header {
    font-family: $primary-font;
    font-weight: 600;
    color: $color-info;
    font-size: 12px;
  }

  @media only screen and (max-width: $xs-screen) {
  }
</style>
