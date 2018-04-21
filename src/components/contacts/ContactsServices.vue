<template>
  <div>
    <p id="header_1">УСЛУГИ</p>
    <router-link to="/shop" class="sub_header" exact>
      Каталог
    </router-link>
    <br>
    <router-link to="/news" class="sub_header" exact>
      Акции и новости
    </router-link>
    <br>
    <router-link to="/about" class="sub_header" exact>
      Отзывы о нас
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
    margin-bottom: 5px;
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
    line-height: 34px;
  }

  @media only screen and (max-width: $xs-screen) {
  }
</style>
