<template>
  <div @mouseover="showCloseBtn = true"
       @mouseleave="showCloseBtn = false"
       class="one_news">
    <el-row
      v-if="oneNews"
      type="flex"
      justify="center"
      style="flex-wrap: wrap">
      <el-col :span="9" align="left">
        <div class="news_thumb_wrap">
          <img
            v-if="oneNews.img_0"
            :src="oneNews.img_0.thumbnail"
            class="news_thumb" alt="">
        </div>
      </el-col>
      <el-col :span="13" class="news_description">
        <span class="news_title">
          {{ oneNews.title }}
        </span> <br>
        <span class="news_creation_date">
          {{ oneNews.creationDate | date }}
        </span>
        <el-row type="flex" justify="center" class="actions">
            <edit-news-info-dialog :id="id"/>
            <edit-news-image :id="id"/>
            <delete-news :id="id"/>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import EditNewsInfoDialog from './crud/EditNewsInfo'
import DeleteNews from './crud/DeleteNews'
import EditNewsImage from './crud/EditNewsImage'

export default {
  name: 'AdminArticle',
  props: ['id'],
  components: {
    EditNewsImage,
    DeleteNews,
    EditNewsInfoDialog
  },
  data () {
    return {
      showCloseBtn: false,
      editNewsInfoDialog: false,
      editImageDialog: false,
      previewDialog: false
    }
  },
  methods: {},
  computed: {
    oneNews () {
      return this.$store.getters.newsById(this.id)
    }
  }
}
</script>
<style scoped lang="scss">

  .one_news {
    padding: 20px 10px;
  }

  .one_news:hover {
    border: 1px solid $color-primary;
    cursor: pointer;
  }

  .news_description {
    padding-left: 15px;
    padding-right: 15px;
  }

  .news_thumb_wrap {
    height: 150px;
    background: $color-info;
  }

  .news_thumb {
    height: 150px;
    width: 100%;
    object-fit: cover;
    border-radius: 2px;
  }

  .news_title {
    font-size: 12px;
  }

  .news_creation_date {
    font-size: 12px;
    font-weight: 500;
  }

  .actions {
    position: absolute;
    bottom: 0;
  }

  #news_type {
    position: absolute;
    left: 15px;
    top: 5px;
  }
</style>
