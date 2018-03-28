<template>
  <div>
    <el-row type="flex" justify="left" style="flex-wrap: wrap">
      <!--ORDERS-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
        <el-card style="height: 100%">
          <div slot="header" class="clearfix">
            <h3>
              <v-icon>description</v-icon>
              Orders
            </h3>
          </div>
          <div>
            <p>Pay Pending: <el-tag type="danger">{{ orderStatistics.payPending }}</el-tag></p>
            <p>Sent Pending: <el-tag type="danger">{{ orderStatistics.sentPending }}</el-tag></p>
            <p>Sent: <el-tag>{{ orderStatistics.sent }}</el-tag></p>
            <p>Delivered: <el-tag type="success">{{ orderStatistics.delivered }}</el-tag></p>
            <p>Refused: <el-tag type="warning">{{ orderStatistics.refused }}</el-tag></p>
            <p>Total orders count: <el-tag type="info">{{ orderStatistics.totalOrders }}</el-tag></p>
          </div>
        </el-card>
      </el-col>
      <!--ONE CLICK-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
        <el-card style="height: 100%">
          <div slot="header" class="clearfix">
            <h3>
              <v-icon>touch_app</v-icon>
              One clicks
            </h3>
          </div>
          <div>
            <p>Created: <el-tag type="danger">{{ oneClickStatistics.created }}</el-tag></p>
            <p>Sent Pending: <el-tag type="danger">{{ oneClickStatistics.sentPending }}</el-tag></p>
            <p>Sent: <el-tag>{{ oneClickStatistics.sent }}</el-tag></p>
            <p>Delivered: <el-tag type="success">{{ oneClickStatistics.delivered }}</el-tag></p>
            <p>Refused: <el-tag type="warning">{{ oneClickStatistics.refused }}</el-tag></p>
            <p>Total One Click count: <el-tag type="info">{{ oneClickStatistics.totalOneClick }}</el-tag></p>
          </div>
        </el-card>
      </el-col>
      <!--PRODUCTS-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
        <el-card style="height: 100%">
          <div slot="header" class="clearfix">
            <h3>
              <v-icon>playlist_add</v-icon>
              Products
            </h3>
          </div>
          <div>
            <p>Average price: <el-tag type="info">{{ productStatistics.avgPrice }} RUB</el-tag></p>
            <p>Max price: <el-tag type="info">{{ productStatistics.maxPrice }} RUB</el-tag></p>
            <p>Unique Products Qty: <el-tag type="info">{{ productStatistics.uniqueProductQty }}</el-tag></p>
            <p>Total Products Qty: <el-tag type="info">{{ productStatistics.totalProductQty }}</el-tag></p>
            <p>Total Store coast: <el-tag type="info">{{ productStatistics.totalStoreCoast }} RUB</el-tag></p>
          </div>
        </el-card>
      </el-col>
      <!--REVIEW-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
        <el-card style="height: 100%">
          <div slot="header" class="clearfix">
            <h3>
              <v-icon>record_voice_over</v-icon>
              Reviews
            </h3>
          </div>
          <div>
            <p>New: <el-tag type="danger">{{ reviewStatistics.newReview }}</el-tag></p>
            <p>Published: <el-tag type="success">{{ reviewStatistics.published }}</el-tag></p>
            <p>Archived: <el-tag type="info">{{ reviewStatistics.archived }}</el-tag></p>
            <p>Total: <el-tag type="info">{{ reviewStatistics.totalReviews }}</el-tag></p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  methods: {
    fetchDashboardStatistics () {
      // this.$store.dispatch('fetchProductStatistics') always fetched for max price
      this.$store.dispatch('fetchOrderStatistics')
      this.$store.dispatch('fetchOneClickStatistics')
      this.$store.dispatch('fetchReviewStatistics')
    }
  },
  computed: {
    productStatistics () {
      return this.$store.getters.productStatistics
    },
    orderStatistics () {
      return this.$store.getters.orderStatistics
    },
    oneClickStatistics () {
      return this.$store.getters.oneClickStatistics
    },
    reviewStatistics () {
      return this.$store.getters.reviewStatistics
    }
  },
  created () {
    this.fetchDashboardStatistics()
  }
}
</script>

<style scoped>

</style>
