<template>
  <div>
    <p id="header_1">УСЛУГИ</p>
    <p class="sub_header">Каталог</p>
    <p class="sub_header">Оплата и доставка</p>
    <p class="sub_header">Акции и новости</p>
    <p class="sub_header">Отзывы о нас</p>
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
    line-height: 22px;
  }

  @media only screen and (max-width: $sm-screen) {
  }

  @media only screen and (max-width: $xs-screen) {
  }
</style>
