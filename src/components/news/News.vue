<template>
  <div>
    <!-- TODO: pagination, sort by date desc -->
    <app-theme-page-title>
      <p slot="middleTitle">АКЦИИ И НОВОСТИ</p>
      <p slot="bottomTitle">Самые привлекательные предложения и жгучие новости</p>
    </app-theme-page-title>
    <el-row id="filter_block" type="flex">
      <el-col align="right">
        <el-radio-group id="news_types" v-model="type">
          <el-radio label="all">Все</el-radio>
          <el-radio label="sale">Акции</el-radio>
          <el-radio label="article">Новости</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <!--NEWS 1-->
    <div v-if="news" id="news_wrapper">
      <div v-for="(oneNews, id) in news"
           :key="id"
           v-if="type === 'all' ? true : ( oneNews.type === type )"
           class="news_block">
        <el-row class="news_tag_row" type="flex" justify="left">
          <el-col class="news_tag" align="left">
            {{ oneNews.type === 'sale' ? 'А к ц и и' : 'Н о в о с т и' }}
            <div class="red_line"></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col :xs="20" :sm="9" :md="9" :lg="9" :xl="9">
            <v-card class="white elevation-8" height="320px" >
              <v-card-media
                v-if="oneNews.img_0"
                :src="oneNews.img_0.original"
                height="320px">
              </v-card-media>
            </v-card>
          </el-col>
          <el-col class="news_text_block" :xs="20" :sm="9" :md="9" :lg="9" :xl="9" align="left">
            <p class="news_title">
              {{ oneNews.title }}
            </p>
            <div class="news_red_line"></div>
            <p class="news_public_date">
              Опубликовано {{ oneNews.creationDate | newsDate }}
            </p>
            <p v-html="oneNews.description.slice(0, 160) + '...'" class="new_descr_snippet"></p>
            <router-link :to="'/news/' + id">
              <app-theme-btn>
                Узнать больше
              </app-theme-btn>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News',
  data () {
    return {
      type: 'all'
    }
  },
  methods: {
    loadNews () {
      this.$store.dispatch('loadNews')
    }
  },
  computed: {
    news () {
      return this.$store.getters.news
    }
  },
  created () {
    this.loadNews()
  }
}
</script>

<style scoped lang="scss">
  #news_wrapper {
    margin-bottom: 60px;
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

  @media only screen and (max-width: 767px) {
    .news_text_block {
      padding-left: 0;
    }
    #filter_block {
      margin-right: 40px;
    }
  }
</style>
