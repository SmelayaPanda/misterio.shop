<template>
  <div id="admin_news">
    <el-row
      type="flex"
      justify="center"
      id="admin_news_title_wrap">
      <el-col align="left">
        <span id="admin_news_title">
          Новости
        </span>
        <el-radio-group v-model="type" id="news_types">
          <el-radio-button label="article"></el-radio-button>
          <el-radio-button label="sale"></el-radio-button>
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
            v-for="(oneNews, id) in news"
            :key="id"
            :xs="24" :sm="24" :md="12" :lg="8" :xl="8"
            align="left">
            <admin-news-card v-if="oneNews.type === type" :id="id"/>
          </el-col>
        </el-row>
      </el-col>
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
      addNewsDialog: false
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
