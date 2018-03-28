<template>
  <div v-if="review">
    <el-button @click="dialogVisible = true"
    >
      <v-icon size="medium">edit</v-icon>
    </el-button>
    <el-dialog
      title="Correct review text"
      :visible.sync="dialogVisible"
      width="500px"
      center>
      <el-input v-model="review.text"
                type="textarea"
                placeholder="(max 400 symbols)"
                :autosize="{ minRows: 3, maxRows: 7}"
                :maxlength="400"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="correctReviewText">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ProcessReview',
  props: ['reviewId'],
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    correctReviewText () {
      this.dialogVisible = false
      this.$store.dispatch('updateReview', {
        reviewId: this.reviewId,
        oldStatus: this.review.status,
        updateData: {
          text: this.review.text,
          corrected: true
        }
      })
    }
  },
  computed: {
    review () {
      return this.$store.getters.reviewById(this.reviewId)
    }
  }
}
</script>

<style scoped>

</style>
