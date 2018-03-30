<template>
  <div>
    <news-header></news-header>
    <el-row id="filter_block" type="flex">
      <el-col align="right">
        <el-checkbox class="white--text">Все</el-checkbox>
        <el-checkbox>Акции</el-checkbox>
        <el-checkbox>Новости</el-checkbox>
      </el-col>
    </el-row>
    <!--NEWS 1-->
    <div id="news_wrapper">
      <div class="news_block">
        <el-row class="news_tag_row" type="flex" justify="left">
          <el-col class="news_tag" align="left">
            А к ц и и
            <div class="red_line"></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col :xs="20" :sm="9" :md="9" :lg="9" :xl="9">
            <v-card class="white" height="340px">
              <!--<v-card-media :src="p.img_0.card" height="300px"></v-card-media>-->
              <v-card-title style="height: 30px">
                <p class="grey--text mt-4">image</p>
              </v-card-title>
              <p class="pl-3 pr-3 pt-1 white--text">{{ 'hey' | snippet(60) }}</p>
            </v-card>
          </el-col>
          <el-col class="news_text_block" :xs="20" :sm="9" :md="9" :lg="9" :xl="9" align="left">
            <p class="news_title">
              При покупке вибратора <br>
              Sweet Night 3, лубрикант <br> в подарок!!!
            </p>
            <div class="news_red_line"></div>
            <p class="news_public_date">Опубликовано 12 марта 2018 года</p>
            <p class="new_descr_snippet">
              Один из самых привлекательных товаров мы решили сделать еще привлекательнее. СПЕШИТЕ ПОКА ВСЕ НЕ
              РАСКУПИЛИ!!!
              Готовы проконсультировать по всем предложениям и не только.
            </p>
            <router-link :to="'/news/' + 1">
              <div class="more_btn">Узнать больше</div>
            </router-link>
          </el-col>
        </el-row>
      </div>
      <!--NEWS 2-->
      <div class="news_block">
        <el-row class="news_tag_row" type="flex" justify="left">
          <el-col class="news_tag" align="left">
            Н о в о с т и
            <div class="red_line"></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col :xs="20" :sm="9" :md="9" :lg="9" :xl="9">
            <v-card class="white" height="340px">
              <!--<v-card-media :src="p.img_0.card" height="300px"></v-card-media>-->
              <v-card-title style="height: 30px">
                <p class="grey--text mt-4">image</p>
              </v-card-title>
              <p class="pl-3 pr-3 pt-1 white--text">{{ 'hey' | snippet(60) }}</p>
            </v-card>
          </el-col>
          <el-col class="news_text_block" :xs="20" :sm="9" :md="9" :lg="9" :xl="9" align="left">
            <p class="news_title">
              Женская услада<br>
              История вибратора. 18+
            </p>
            <div class="news_red_line"></div>
            <p class="news_public_date">Опубликовано 12 марта 2018 года</p>
            <p class="new_descr_snippet">
              Среди всех приспособлений, используемых для любовных утех, самой большой популярностью пользуются,
              пожалуй,
              наручники и, конечно, вибратор. Но применяли это чудо-изобретение поначалу немного не так, как мы
              привыкли,
              пользовались им в том числе и мужчины.
            </p>
            <router-link :to="'/news/' + 2">
              <div class="more_btn">Узнать больше</div>
            </router-link>
          </el-col>
        </el-row>
      </div>
      <!--NEWS 3-->
      <div class="news_block">
        <el-row class="news_tag_row" type="flex" justify="left">
          <el-col class="news_tag" align="left">
            Н о в о с т и
            <div class="red_line"></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col :xs="20" :sm="9" :md="9" :lg="9" :xl="9">
            <v-card class="white" height="340px">
              <!--<v-card-media :src="p.img_0.card" height="300px"></v-card-media>-->
              <v-card-title style="height: 30px">
                <p class="grey--text mt-4">image</p>
              </v-card-title>
              <p class="pl-3 pr-3 pt-1 white--text">{{ 'hey' | snippet(60) }}</p>
            </v-card>
          </el-col>
          <el-col class="news_text_block" :xs="20" :sm="9" :md="9" :lg="9" :xl="9" align="left">
            <p class="news_title">
              Бразильские женщины <br>остались без золотого <br>фаллоиметатора
            </p>
            <div class="news_red_line"></div>
            <p class="news_public_date">Опубликовано 12 марта 2018 года</p>
            <p class="new_descr_snippet">
              Из бразильского секс-шопа похитили золотой декорированный
              18-каратным золотом фаллоиметатор стоимостью в $4 000.
            </p>
            <router-link :to="'/news/' + 3">
              <div class="more_btn">Узнать больше</div>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import NewsHeader from './NewsHeader'

export default {
  name: 'AllArticles',
  components: {NewsHeader}
}
</script>

<style scoped lang="scss">
  #news_wrapper {
    margin-bottom: 30px;
  }

  #filter_block {
    color: white;
    font-size: 10px;
    font-weight: 600;
    margin-right: 80px;
  }

  .news_tag_row {
    margin-top: 14px;
    margin-bottom: 5px;
  }

  .news_tag {
    color: white;
    font-size: 17px;
    font-weight: 600;
    margin-left: 22px;
  }

  .red_line {
    position: absolute;
    bottom: 10px;
    left: 134px;
    width: 36px;
    height: 2px;
    border-bottom: 2px solid $color-secondary;
  }

  .news_block {
  }

  .news_text_block {
    padding-top: 16px;
    padding-left: 90px;
  }

  .news_title {
    font-family: $secondary-font;
    font-size: 28px;
    font-weight: 600;
    line-height: 36px;
    color: $color-secondary;
  }

  .news_red_line {
  }

  .news_red_line:after {
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    margin: -5px auto;
    border-bottom: 2px solid $color-secondary;
  }

  .news_public_date {
    font-family: $primary-font;
    font-size: 11px;
    font-weight: 600;
    color: $color-info;
    margin-top: 24px;
  }

  .new_descr_snippet {
    font-family: $primary-font;
    font-size: 12px;
    font-weight: 600;
    color: white;
    margin-top: 14px;
  }

  .more_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $color-secondary;
    color: white;
    width: 170px;
    height: 44px;
  }

  .more_btn:hover {
    cursor: pointer;
    text-shadow: $primary-text-shadow;
  }

  @media only screen and (max-width: 767px) {
    .news_text_block {
      padding-left: 0;
    }
    #filter_block {
      margin-right: 40px;
    }
  }
</style>
