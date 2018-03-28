<template>
  <div id="slide_1">
    <p id="main_title_1">Не зная Вас</p>
    <p id="main_title_2" align="left">
      МЫ ЗНАЕМ ВСЁ<br>
      О ВАШИХ ЖЕЛАНИЯХ
    </p>
    <p id="main_title_3">и даже больше...</p>
  </div>
</template>

<script>
export default {
  name: 'Slide1'
}
</script>

<style scoped lang="scss">
  #main_title_1 {
    position: absolute;
    left: 55%;
    top: 132px;
    color: white;
    font-family: $third-font;
    font-weight: bold;
    font-size: 32px;
  }
  #main_title_2 {
    position: absolute;
    left: 54%;
    top: 179px;
    color: white;
    font-family: $secondary-font;
    font-size: 46px;
  }
  #main_title_3 {
    position: absolute;
    left: 75%;
    top: 308px;
    color: white;
    font-family: $third-font;
    font-weight: bold;
    font-size: 32px;
  }
</style>
