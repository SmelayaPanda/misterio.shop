<template>
  <div>
    <app-theme-page-title>
      <p slot="topTitle">только для Вас</p>
      <p slot="middleTitle">АКЦИИ И НОВОСТИ</p>
      <p slot="bottomTitle">Самые привлекательные предложения и жгучие новости</p>
    </app-theme-page-title>
    <!--NEWS 1-->
    <div v-if="oneNews" id="article_wrapper">
      <div class="news_block">
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col :xs="20" :sm="9" :md="9" :lg="9" :xl="9">
            <v-card id="news_img" class="white" height="320px">
              <v-card-media
                v-if="oneNews.img_0"
                :src="oneNews.img_0.original"
                height="320px">
              </v-card-media>
            </v-card>
          </el-col>
          <el-col id="last_news" :xs="20" :sm="9" :md="9" :lg="9" :xl="9" align="left">
            <router-link to="/news" exact>
              <app-theme-btn
                width="200px">
                Последние {{ oneNews.type === 'sale' ? 'акции' : 'новости' }}
              </app-theme-btn>
            </router-link>
            <div v-for="(oneNews, id) in lastNews" :key="id" class="last_news_list">
              <router-link :to="'/news/' + id" exact class="info--text">
                <span class="last_news_arrow"> > </span>
                <span class="last_news_title">
                  {{ oneNews.title }}
                </span>
              </router-link>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="18">
            <h1 id="news_title" align="left">
              {{ oneNews.title }}
            </h1>
            <p id="news_public_date" align="left">
              Опубликовано {{ oneNews.creationDate | newsDate }}
            </p>
            <p v-if="oneNews.description"
               v-html="oneNews.description"
               id="news_text" align="left"></p>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Article',
  props: ['id'],
  data () {
    return {}
  },
  computed: {
    oneNews () {
      return this.$store.getters.news[this.id]
    },
    lastNews () {
      let news = this.$store.getters.news
      let lastNews = {}
      let i = 1
      for (let id in news) {
        if (news.hasOwnProperty(id) && id !== this.id && i < 4) {
          lastNews[id] = news[id]
          i++
        }
      }
      return lastNews
    }
  },
  created () {
    this.$store.dispatch('loadOneNews', this.id)
  }
}
</script>

<style scoped lang="scss">
  #article_wrapper {
    margin-bottom: 60px;
  }

  #last_news {
    font-family: $primary-font;
    font-size: 12px;
    font-weight: 300;
    color: white;
    padding-top: 16px;
    padding-left: 90px;
  }

  .last_news_list {
    font-family: $primary-font;
    font-size: 14px;
    font-weight: 500;
    color: $color-info;
    padding-top: 20px;
  }

  .last_news_arrow {
    font-size: 22px;
    font-weight: 600;
    color: $color-secondary;
    padding-right: 10px;
  }

  .last_news_title {
    margin-bottom: 20px;
  }

  #news_title {
    font-family: $primary-font;
    font-size: 28px;
    font-weight: 500;
    color: $color-secondary;
    padding-top: 40px;
  }

  #news_title:after {
    content: "";
    display: block;
    width: 42%;
    height: 3px;
    margin-top: 15px;
    border-bottom: 2px solid $color-secondary;
  }

  #news_public_date {
    font-family: $primary-font;
    font-size: 11px;
    font-weight: 600;
    color: $color-info;
    margin-top: 24px;
  }

  #news_text {
    font-family: $primary-font;
    font-size: 12px;
    font-weight: 600;
    color: $color-info;
    margin-top: 24px;
  }

  #news_img {
    border-radius: 0px;
  }
  .card__media{
    box-shadow: 0 3px 12px 0 rgba(19, 19, 19, 0.85), 3px 3px 12px 0 rgba(22, 22, 22, 0.87);
  }

  .news_text_subtitle {
    font-size: 14px;
  }

  @media only screen and (max-width: 767px) {
    #last_news {
      padding-left: 0;
    }
  }
</style>
