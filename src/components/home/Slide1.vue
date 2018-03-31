<template>
  <div id="slide_1">
    <div id="title" class="hidden-sm-and-down">
      <p id="main_title_1" align="left">Не зная Вас</p>
      <p id="main_title_2" align="left">
        МЫ ЗНАЕМ ВСЁ<br>
        О ВАШИХ ЖЕЛАНИЯХ
      </p>
      <p id="main_title_3" align="right">
        и даже больше...<br>
        <app-theme-btn
          class="mt-4"
          type="primary"
          width="178px"
          fontSize="12px">
          ВЫБРАТЬ ТОВАР
        </app-theme-btn>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slide1'
}
</script>

<style scoped lang="scss">
  #title {
    position: absolute;
    left: 54%;
    top: 132px;
  }

  #main_title_1 {
    position: relative;
    color: white;
    font-family: $third-font;
    font-weight: bold;
    font-size: 32px;
    margin-bottom: 0;
    padding-left: 10px;
  }

  #main_title_2 {
    position: relative;
    font-family: $secondary-font;
    font-size: 45px;
    margin-bottom: 0;
    padding-right: 30px;

    background: linear-gradient(55deg, $color-secondary 32%, $color-info 55%, $color-secondary 63%);
    color: transparent;
    -webkit-background-clip: text;
  }

  #main_title_3 {
    position: relative;
    color: white;
    font-family: $third-font;
    font-weight: bold;
    font-size: 32px;
    margin-top: -8px;
  }
</style>
