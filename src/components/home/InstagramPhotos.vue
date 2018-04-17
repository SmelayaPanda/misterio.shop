<template>
  <el-col id="slide_4_instagram"
          :xs="20" :sm="13" :md="12" :lg="13" :xl="9"
          type="flex" align="middle">
    <p id="header_4" class="header">
      ИНСТАГРАМ
    </p>
    <el-row v-if="instPhotos"
            type="flex" justify="center" style="flex-wrap: wrap">
      <el-col v-for="(photo, idx) in instPhotos" :key="idx"
              :span="8" align="center"
              class="inst_card_wrap">
        <img :src="photo" class="inst_photo" alt="">
      </el-col>
    </el-row>
    <el-row id="watch_news_wrap" type="flex" justify="start" style="flex-wrap: wrap">
      <el-col :span="10" align="left">
        <p id="watch_news" align="left">
          СЛЕДИ ЗА НОВОСТЯМИ
        </p>
      </el-col>
      <el-col id="soc_icons_wrap" :span="14" align="right">
        <contacts-social></contacts-social>
      </el-col>
    </el-row>
  </el-col>
</template>
<script>
import ContactsSocial from '../contacts/ContactsSocial'

export default {
  name: 'instagram-photos',
  components: {ContactsSocial},
  computed: {
    instPhotos () {
      return this.$store.getters.companyInfo.photos
    }
  }
}
</script>
<style scoped lang="scss">
  .header {
    font-family: $secondary-font;
    letter-spacing: 1px;
    color: white;
  }

  .header:after {
    content: "";
    display: block;
    height: 1px;
    border-bottom: 1px solid $color-secondary;
  }

  #header_4 {
    margin-top: -30px;
    margin-bottom: 0;
    font-size: 16px;
    letter-spacing: 2px;
  }

  #header_4:after {
    width: 100px;
  }

  .inst_photo {
    height: 170px;
    width: 100%;
    object-fit: cover;
  }

  .inst_card_wrap {
    padding: 10px;
  }

  #watch_news_wrap {
    margin-top: 10px;
  }

  #watch_news {
    font-family: $primary-font;
    font-weight: 600;
    font-size: 14px;
    color: $color-info;
    padding-left: 10px;
  }

  @media only screen and (max-width: $xs-screen) {
    #slide_4_instagram {
      display: none;
    }
  }
</style>
