<template>
  <div>
    <p id="header_2">ВАЖНО ЗНАТЬ О...</p>
    <p class="sub_header">Подарочные карты</p>
    <p class="sub_header">Гид размеров</p>
    <p class="sub_header">Вакансии</p>
    <p class="sub_header">Подарки для Вас</p>
  </div>
</template>
<script>
export default {
  name: 'contacts-important'
}
</script>
<style scoped lang="scss">

  #header_2 {
    font-size: 13px;
    font-family: $secondary-font;
    letter-spacing: 1px;
    color: white;
  }

  #header_2:after {
    content: "";
    display: block;
    height: 1px;
    border-bottom: 1px solid $color-secondary;
    width: 120px;
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
