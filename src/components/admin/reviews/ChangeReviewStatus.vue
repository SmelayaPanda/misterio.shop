<template>
  <div v-if="review">
    <el-button @click="dialogVisible = true"
    >
      <v-icon size="medium" v-if="this.toStatus === 'published'">remove_red_eye</v-icon>
      <v-icon size="medium" v-if="toStatus === 'archived'">archive</v-icon>
    </el-button>
    <el-dialog
      :title="toStatus === 'published' ? 'Publish review?' : 'Archive review?'"
      :visible.sync="dialogVisible"
      width="500px"
      center>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="changeReviewStatus">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ChangeReviewStatus',
  props: ['reviewId', 'toStatus'],
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    changeReviewStatus () {
      this.dialogVisible = false
      this.$store.dispatch('updateReview', {
        reviewId: this.reviewId,
        oldStatus: this.review.status,
        updateData: {
          status: this.toStatus
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
