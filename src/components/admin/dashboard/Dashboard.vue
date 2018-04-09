<template>
  <div>
    <el-row type="flex" justify="left" style="flex-wrap: wrap">
      <!--ORDERS-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
        <el-card style="height: 100%">
          <div slot="header" class="clearfix">
            <h3>
              <v-icon>description</v-icon>
              Покупки
            </h3>
          </div>
          <div align="left" style="padding-left: 10%">
            <p><v-chip outline label color="danger_a">{{ orderStatistics.payPending }}</v-chip> ожидают оплаты</p>
            <p><v-chip outline label color="danger_a">{{ orderStatistics.sentPending }}</v-chip> ожидают отправки</p>
            <p><v-chip outline label color="info_a">{{ orderStatistics.sent }}</v-chip> отправлено</p>
            <p><v-chip outline label color="success_a">{{ orderStatistics.delivered }}</v-chip> доставлено</p>
            <p><v-chip outline label color="warning_a">{{ orderStatistics.refused }}</v-chip> отклонено</p>
            <p><v-chip label color="primary_a" text-color="white">{{ orderStatistics.totalOrders }}</v-chip> общее количество</p>
          </div>
        </el-card>
      </el-col>
      <!--ONE CLICK-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
        <el-card style="height: 100%">
          <div slot="header" class="clearfix">
            <h3>
              <v-icon>touch_app</v-icon>
              Один клик
            </h3>
          </div>
          <div align="left" style="padding-left: 10%">
            <p><v-chip outline label color="danger_a">{{ oneClickStatistics.created }}</v-chip> новые</p>
            <p><v-chip outline label color="danger_a">{{ oneClickStatistics.sentPending }}</v-chip> ожидают отправки</p>
            <p><v-chip outline label color="info_a">{{ oneClickStatistics.sent }}</v-chip> отправлено</p>
            <p><v-chip outline label color="success_a">{{ oneClickStatistics.delivered }}</v-chip> доставлено</p>
            <p><v-chip outline label color="warning_a">{{ oneClickStatistics.refused }}</v-chip> отклонено</p>
            <p><v-chip label color="primary_a" text-color="white">{{ oneClickStatistics.totalOneClick }}</v-chip> общее количество</p>
          </div>
        </el-card>
      </el-col>
      <!--PRODUCTS-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
        <el-card style="height: 100%">
          <div slot="header" class="clearfix">
            <h3>
              <v-icon>playlist_add</v-icon>
              Товары
            </h3>
          </div>
          <div align="left" style="padding-left: 10%">
            <p><v-chip>{{ productStatistics.avgPrice }} &#8381;</v-chip> средняя цена</p>
            <p><v-chip>{{ productStatistics.maxPrice }} &#8381;</v-chip> максимальная цена</p>
            <p><v-chip>{{ productStatistics.uniqueProductQty }}</v-chip> уникальных продуктов</p>
            <p><v-chip>{{ productStatistics.totalProductQty }}</v-chip> общее количество</p>
            <p><v-chip label>{{ productStatistics.totalStoreCoast }} &#8381;</v-chip> общая стоимость</p>
          </div>
        </el-card>
      </el-col>
      <!--REVIEW-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
        <el-card style="height: 100%">
          <div slot="header" class="clearfix">
            <h3><v-icon>record_voice_over</v-icon>
              Отзывы
            </h3>
          </div>
          <div align="left" style="padding-left: 10%">
            <p><v-chip  outline label  color="danger_a">{{ reviewStatistics.newReview }}</v-chip> новые</p>
            <p><v-chip  outline label  color="success_a">{{ reviewStatistics.published }}</v-chip> опубликованные</p>
            <p><v-chip outline label color="warning_a">{{ reviewStatistics.archived }}</v-chip> архив</p>
            <p><v-chip label color="primary_a" text-color="white">{{ reviewStatistics.totalReviews }}</v-chip> общее количество</p>
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
