<!--
REVIEW STATUSES:
1. new
2. published
3. archived
-->
<template>
<div>
  <el-carousel :interval="5000"
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
        <el-col :span="22">
        </el-col>
        <el-col :span="24">
          <!--300 symbols-->
          <p>{{ item.text }}</p>
          <p class="info--text right">{{ item.date | date }}</p>
        </el-col>
      </el-card>
    </el-carousel-item>
  </el-carousel>
  <!--ADD REVIEW-->
  <el-button type="text" @click="addReviewDialog = true">
    Add review
  </el-button>
  <el-dialog
    title="Add review!"
    :visible.sync="addReviewDialog"
    width="500px"
    center
  >
    <el-input v-model="review.name" placeholder="Name" class="mb-2 mt-2"></el-input>
    <el-input v-model="review.text"
              type="textarea"
              placeholder="Review (max 300 symbols)"
              :autosize="{ minRows: 3, maxRows: 7}"
              :maxlength="300"
    ></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addReview" class="mt-3" type="primary" :disabled="!isValidForm">Add</el-button>
      <el-button @click="addReviewDialog = false" class="mt-3">Cancel</el-button>
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

<style scoped>
  .review_card {
    padding: 10px;
    margin: 5px;
    height: 330px;
  }
</style>
