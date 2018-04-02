<template>
  <div id="slide_3">
    <el-row type="flex" justify="center" style="flex-wrap: wrap">
      <el-col :span="20">
        <el-row type="flex" justify="center">
          <el-col :span="9">
            <div id="title_3">
              <p id="title_3_main" align="left">
                <span class="dark_title"> ПРИ ПОКУПКЕ </span>
                <span class="white_title"> 2Х </span> <br>
                <span class="dark_title"> ВТУЛОК </span>
                <span class="white_title"> 3УЮ </span> <br>
                <span class="dark_title"> ЗАБТРАЕТЕ </span> <br>
                <span class="white_title"> В ПОДАРОК! </span>
              </p>
              <p id="title_3_sub" align="left">
                Драм-машина представляет собой тетрахорд. Показательный пример – струна представляет собой
                микрохроматический интервал. Техника полифигурно начинает рефрен. Плотностная компонентная форма,
                как бы это ни казалось парадоксальным, сонорна.
              </p>
              <div align="left">
                <router-link to="/news" exact>
                  <el-button id="all_sales_btn">
                    ВСЕ АКЦИИ
                  </el-button>
                </router-link>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <p></p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Slide3'
}
</script>

<style scoped lang="scss">
  #slide_3 {
    margin-top: 100px;
  }

  #title_3 {
    padding-left: 20px;
  }

  #title_3_main {
    margin-top: 80px;
  }

  #title_3_main:after {
    content: "";
    display: block;
    width: 45%;
    margin-top: 10px;
    border-bottom: 1px solid $color-primary;
  }

  #title_3_sub {
    color: white;
    font-size: 12px;
  }

  @mixin slide_3_title {
    font-family: $secondary-font;
    font-size: 34px;
    font-weight: 500;
  }

  .dark_title {
    @include slide_3_title;
    color: $color-primary;
  }

  .white_title {
    @include slide_3_title;
    color: white;
  }

  #all_sales_btn {
    font-size: 13px;
    font-weight: 500;
    background: $color-primary;
    color: white;
    width: 150px;
    border: none;
    border-radius: 2px;
  }
</style>
