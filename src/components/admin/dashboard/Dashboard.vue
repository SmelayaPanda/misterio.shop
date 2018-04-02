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
          <div align="right" style="padding-right: 40%">
            <p>Pay Pending:
              <v-chip outline label color="danger_a">{{ orderStatistics.payPending }}</v-chip>
            </p>
            <p>Sent Pending:
              <v-chip outline label color="danger_a">{{ orderStatistics.sentPending }}</v-chip>
            </p>
            <p>Sent:
              <v-chip outline label color="info_a">{{ orderStatistics.sent }}</v-chip>
            </p>
            <p>Delivered:
              <v-chip outline label color="success_a">{{ orderStatistics.delivered }}</v-chip>
            </p>
            <p>Refused:
              <v-chip outline label color="warning_a">{{ orderStatistics.refused }}</v-chip>
            </p>
            <p>Total orders count:
              <v-chip label color="primary_a" text-color="white">{{ orderStatistics.totalOrders }}</v-chip>
            </p>
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
          <div align="right" style="padding-right: 40%">
            <p>Created:
              <v-chip outline label color="danger_a">{{ oneClickStatistics.created }}</v-chip>
            </p>
            <p>Sent Pending:
              <v-chip outline label color="danger_a">{{ oneClickStatistics.sentPending }}</v-chip>
            </p>
            <p>Sent:
              <v-chip outline label color="info_a">{{ oneClickStatistics.sent }}</v-chip>
            </p>
            <p>Delivered:
              <v-chip outline label color="success_a">{{ oneClickStatistics.delivered }}</v-chip>
            </p>
            <p>Refused:
              <v-chip outline label color="warning_a">{{ oneClickStatistics.refused }}</v-chip>
            </p>
            <p>Total One Click count:
              <v-chip label color="primary_a" text-color="white">{{ oneClickStatistics.totalOneClick }}</v-chip>
            </p>
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
          <div align="left" style="padding-left: 10%">
            <p>Average price:
              <v-chip>{{ productStatistics.avgPrice }} &#8381;</v-chip>
            </p>
            <p>Max price:
              <v-chip>{{ productStatistics.maxPrice }} &#8381;</v-chip>
            </p>
            <p>Unique Products Qty:
              <v-chip>{{ productStatistics.uniqueProductQty }}</v-chip>
            </p>
            <p>Total Products Qty:
              <v-chip>{{ productStatistics.totalProductQty }}</v-chip>
            </p>
            <p>Total Store coast:
              <v-chip label>{{ productStatistics.totalStoreCoast }} &#8381;</v-chip>
            </p>
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
          <div align="right" style="padding-right: 40%">
            <p>New:
              <v-chip  outline label  color="danger_a">{{ reviewStatistics.newReview }}</v-chip>
            </p>
            <p>Published:
              <v-chip  outline label  color="success_a">{{ reviewStatistics.published }}</v-chip>
            </p>
            <p>Archived:
              <v-chip outline label color="warning_a">{{ reviewStatistics.archived }}</v-chip>
            </p>
            <p>Total:
              <v-chip label color="primary_a" text-color="white">{{ reviewStatistics.totalReviews }}</v-chip>
            </p>
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
