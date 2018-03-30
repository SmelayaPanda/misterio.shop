<!--
REVIEW STATUSES:
1. new
2. published
3. archived
-->
<template>
  <div class="mb-5">
    <h2 id="reviews_title">
      Отзывы о нас
    </h2>
    <el-carousel
      :autoplay="false"
      trigger="click"
      :type="this.$vuetify.breakpoint.name === 'xs' ? '' : 'card'"
      height="350px">
      <el-carousel-item v-for="(item, idx) in reviews" :key="idx">
        <el-card class="review_card">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="24">
                <img src="@/assets/icons/anonymous-logo.png" height="40px">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span>{{ item.name }}</span>
              </el-col>
            </el-row>
          </div>
          <el-col :span="24">
            <p>{{ item.text | snippet(300) }}</p>
            <p class="info--text right">{{ item.date | date }}</p>
          </el-col>
        </el-card>
      </el-carousel-item>
    </el-carousel>
    <!--ADD REVIEW-->
    <div class="main_btn" @click="addReviewDialog = true">
      Добавить отзыв
    </div>
    <el-dialog
      title="Ваш отзыв!"
      :visible.sync="addReviewDialog"
      width="500px"
      center>
      <el-input
        v-model="review.name"
        placeholder="Имя"
        class="mb-2 mt-2"></el-input>
      <el-input
        v-model="review.text"
        type="textarea"
        placeholder="Отзыв ( максимум 300 символов )"
        :autosize="{ minRows: 5, maxRows: 7}"
        :maxlength="300">
      </el-input>
      <span slot="footer" class="dialog-footer">
      <el-button @click="addReview" class="mt-3" type="danger" :disabled="!isValidForm">Отправить!</el-button>
      <el-button @click="addReviewDialog = false" class="mt-3">Отмена</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Reviews',
  data () {
    return {
      addReviewDialog: false,
      review: {
        name: '',
        text: '',
        status: 'new',
        date: new Date(),
        image: null
      }
    }
  },
  methods: {
    addReview () {
      this.addReviewDialog = false
      this.$store.dispatch('addReview', this.review)
    }
  },
  computed: {
    reviews () {
      return this.$store.getters.reviews
    },
    isValidForm () {
      return this.review.name && this.review.text
    }
  }
}
</script>

<style scoped lang="scss">
  .review_card {
    padding: 0;
    margin: 0;
    height: 330px;
  }

  #reviews_title {
    font-family: $secondary-font;
    font-size: 24px;
    font-weight: 400;
    color: $color-secondary;
    padding: 40px 40px 20px 55px;
  }

  .el-card {
    border-radius: 20px;
    background: $color-info;
  }
</style>
