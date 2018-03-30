<template>
<div>
  <page-title>
    <p slot="topTitle">только для Вас</p>
    <p slot="middleTitle">КОНТАКТЫ</p>
    <p slot="bottomTitle">Мы всегда на связи, чтобы подобрать для Вас самое подходящее</p>
  </page-title>
  <el-row type="flex" justify="center">
    <el-col :xs="22" :sm="22" :md="22" :lg="21" :xl="20" type="flex" align="middle">
      <el-row type="flex" justify="start" style="flex-wrap: wrap">
        <el-col :xs="24" :sm="22" :md="4" :lg="4" :xl="4" align="left">
          <p class="header">УСЛУГИ</p>
        </el-col>
        <el-col :xs="24" :sm="22" :md="4" :lg="4" :xl="4" align="left">
          <p class="header">ВАЖНО ЗНАТЬ О...</p>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'Contacts'
}
</script>

<style scoped lang="scss">
  .header {
    font-family: $secondary-font;
    color: white;
  }

  .header:after {
    content: "";
    display: block;
    width: 60%;
    height: 1px;
    margin: 0px 6px;
    border-bottom: 1px solid $color-secondary;
  }
</style>
