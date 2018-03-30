<template>
  <div id="news_header">
    <p id="for_you">только для Вас</p>
    <p id="sales_title">АКЦИИ И НОВОСТИ</p>
    <p id="sales_sub_title">Самые привлекательные предложения и жгучие новости</p>
  </div>
</template>

<script>
export default {
  name: 'News'
}
</script>

<style scoped lang="scss">
  #news_header {
    padding-bottom: 130px;
  }

  #for_you {
    font-family: $third-font;
    font-size: 24px;
    color: white;
    padding-top: 130px;
    margin-bottom: 0;
  }

  #sales_title {
    font-family: $secondary-font;
    font-size: 39px;
    margin-top: -8px;

    background: linear-gradient(to right, white 43%, $color-secondary 51%);
    color: transparent;
    -webkit-background-clip: text;
  }

  #sales_title:after {
    content: "";
    display: block;
    width: 238px;
    height: 3px;
    margin: -5px auto;
    border-bottom: 2px solid white;
  }

  #sales_sub_title {
    font-family: $primary-font;
    font-size: 12px;
    color: white;
  }
</style>
