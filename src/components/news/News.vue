<template>
<div id="news">
  <p id="for_you">только для Вас</p>
  <p id="sales_title">АКЦИИ И НОВОСТИ</p>
  <p id="sales_sub_title">Самые привлекательные предложения и жгучие новости</p>
  <el-row id="filter_block" type="flex">
    <el-col align="right">
      <el-checkbox>Все</el-checkbox>
      <el-checkbox>Акции</el-checkbox>
      <el-checkbox>Новости</el-checkbox>
    </el-col>
  </el-row>
  <el-row id="news_block" type="flex" justify="left">
    <el-col class="news_tag" align="left">
      А к ц и и
      <div id="red_line"></div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">
      <v-card class="white"></v-card>
    </el-col>
    <el-col :span="12">
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'News'
}
</script>

<style scoped lang="scss">
  #news {
    background: url("../../../static/bg/news/news_draft.png") no-repeat;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    margin-top: -108px;
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

  #filter_block {
    margin-top: 184px;
    color: white;
    font-size: 10px;
    font-weight: 600;
    margin-right: 80px;
  }

  #news_block {
    margin-top: 14px;
  }

  .news_tag {
    color: white;
    font-size: 17px;
    font-weight: 600;
    margin-left: 22px;
  }

  #red_line {
    position: absolute;
    bottom: 10px;
    left: 108px;
    width: 56px;
    height: 2px;
    border-bottom: 2px solid $color-secondary;
  }
</style>
