<template>
  <div v-if="news" id="admin_news">
    <el-row
      type="flex"
      justify="center"
      id="admin_news_title_wrap">
      <el-col align="left">
        <span id="admin_news_title">
          Новости
        </span>
        <el-radio-group @change="loadNews" v-model="type" id="news_types">
          <el-radio-button :label="NEWS_TYPES.article.value">{{ NEWS_TYPES.article.label }}</el-radio-button>
          <el-radio-button :label="NEWS_TYPES.sale.value">{{ NEWS_TYPES.sale.label }}</el-radio-button>
        </el-radio-group>
        <create-news :type="type"></create-news>
      </el-col>
    </el-row>
    <el-row
      type="flex"
      justify="center"
      style="flex-wrap: wrap">
      <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="20" align="left">
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col
            v-for="oneNews in news"
            :key="oneNews.id"
            :xs="24" :sm="24" :md="12" :lg="8" :xl="8"
            align="left">
            <admin-news-card :id="oneNews.id"/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row v-if="totalNewsCount" type="flex" justify="start" class="mt-2">
      <el-pagination
        @current-change="changeCurPage"
        @size-change="changePageSize"
        background
        layout="sizes, prev, pager, next, total"
        :current-page.sync="curPage"
        :page-size="pageSize"
        :page-sizes="[6, 10, 20, 50, 100]"
        :total="totalNewsCount">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import AdminNewsCard from './AdminNewsCard'
import CreateNews from './crud/CreateNews'

export default {
  name: 'AdminNews',
  components: {
    CreateNews,
    AdminNewsCard
  },
  data () {
    return {
      type: 'sale',
      addNewsDialog: false,
      curPage: 1,
      pageSize: 5
    }
  },
  methods: {
    loadNews () {
      this.$store.dispatch('loadNews', {type: this.type})
    },
    changeCurPage (curPage) {
      this.curPage = curPage
    },
    changePageSize (size) {
      this.pageSize = size
    }
  },
  computed: {
    news () {
      if (this.$store.getters.news) {
        return Object.values(this.$store.getters.news)
          .slice((this.curPage - 1) * this.pageSize, this.curPage * this.pageSize)
      } else {
        return []
      }
    },
    totalNewsCount () {
      return this.$store.getters.news ? Object.keys(this.$store.getters.news).length : 0
    }
  },
  created () {
    this.type = this.$store.getters.loadedNewsType
    this.loadNews()
  }
}
</script>

<style scoped lang="scss">
  #admin_news_title_wrap {
    margin: 10px 0 30px 20px;
    align-items: center;
  }

  #admin_news_title {
    font-size: 20px;
    font-weight: 500;
    margin-right: 10px;
  }

  #news_types {
  }
</style>
