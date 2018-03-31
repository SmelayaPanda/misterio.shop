<template>
  <div>
    <app-heart-loader v-if="this.isLoading"></app-heart-loader>
    <div v-else>
      <app-theme-page-title>
        <p slot="topTitle">только для Вас</p>
        <p slot="middleTitle">О НАС И НАШИХ ПАРТНЕРАХ</p>
        <p slot="bottomTitle">Мы предлагаем не просто товары, а море удовольствия и наслаждения</p>
      </app-theme-page-title>
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="20" :md="20" :lg="20" :xl="20" type="flex" align="left">
          <h2 class="about_corner">О нас</h2>
          <span id="hor_line_1"></span>
          <span id="ver_line_1"></span>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" type="flex" align="middle">
          <el-row type="flex" justify="center" style="flex-wrap: wrap">
            <el-col :xs="24" :sm="22" :md="11" :lg="11" :xl="11" align="left">
              <p class="about_text">
                Разнообразный и богатый опыт укрепление и развитие структуры позволяет выполнять важные задания по
                разработке системы обучения кадров, соответствует насущным потребностям. Разнообразный и богатый опыт
                укрепление и развитие структуры способствует подготовки и реализации модели развития.
              </p>
            </el-col>
            <el-col :xs="24" :sm="22" :md="11" :lg="11" :xl="11" align="left">
              <p class="about_text">
                Не следует, однако забывать, что постоянное информационно-пропагандистское обеспечение нашей
                деятельности представляет собой интересный эксперимент проверки модели развития. Идейные соображения
                высшего порядка, а также консультация с широким активом обеспечивает широкому кругу (специалистов)
                участие в формировании направлений прогрессивного развития.
              </p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="20" :md="20" :lg="20" :xl="20" type="flex" align="right">
          <h2 class="about_corner">О продукции</h2>
          <span id="hor_line_2"></span>
          <span id="ver_line_2"></span>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="20" :md="20" :lg="20" :xl="20" type="flex">
          <h2 id="partners_title">Наши партнеры</h2>
          <div id="partners">
            <img class="partner_logo" src="@/assets/img/about/company_logo1.png" alt="">
            <img class="partner_logo" src="@/assets/img/about/company_logo2.png" alt="">
            <img class="partner_logo" src="@/assets/img/about/company_logo1.png" alt="">
            <img class="partner_logo" src="@/assets/img/about/company_logo2.png" alt="">
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="23" :sm="22" :md="19" :lg="17" :xl="15" type="flex" align="middle">
          <reviews></reviews>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Reviews from '@/components/about/Reviews'

export default {
  name: 'info',
  components: {Reviews},
  methods: {
    fetchAboutData () {
      this.$store.dispatch('fetchReviews', {status: 'published'})
      this.$store.dispatch('fetchCompanyInfo')
    }
  },
  created () {
    this.fetchAboutData()
  }
}
</script>

<style scoped lang="scss">
  .about_corner {
    font-family: $secondary-font;
    font-weight: 400;
    color: $color-info;
  }

  .about_text {
    color: $color-info;
    padding: 40px 40px 40px 55px;
    font-size: 13px;
  }

  #hor_line_1:after {
    content: "";
    display: block;
    width: 40%;
    height: 2px;
    margin: -15px 70px;
    border-bottom: 1px solid;
    background-image: linear-gradient(to right, white 0%, $color-secondary 100%);
  }

  #ver_line_1:after {
    content: "";
    position: absolute;
    display: block;
    width: 2px;
    height: 140px;
    margin: 30px 6px;
    border-left: 1px solid;
    background-image: linear-gradient(to bottom, white 0%, $color-secondary 100%);
  }

  #hor_line_2:after {
    content: "";
    display: block;
    width: 30%;
    height: 2px;
    margin: -15px 155px;
    padding-right: -10px;
    border-bottom: 1px solid;
    background-image: linear-gradient(to right, $color-secondary 0%, white 100%);
  }

  #ver_line_2:after {
    content: "";
    display: block;
    width: 2px;
    height: 140px;
    margin: -160px 6px;
    border-left: 1px solid;
    background-image: linear-gradient(to bottom, $color-secondary 0%, white 100%);
  }

  #partners_title {
    font-family: $secondary-font;
    font-size: 24px;
    font-weight: 400;
    color: $color-secondary;
    padding: 40px 40px 20px 55px;
    margin-top: 50px;
  }

  #partners {
    border-bottom: 1px solid $color-info;
    border-top: 1px solid $color-info;
    padding: 10px;
    margin-bottom: 40px;
  }

  .partner_logo {
    padding: 10px;
    transform: scale(0.8);
  }
</style>
