<template>
  <!--
ORDER STATUS CHAIN:
  1. created     - создан
  2. pending     - ожидает отправки ( товар с оплатой при получении попадает сразу в данный статус )
  3. sent        - товар отправлен
  4. delivered   - товар доставлен
  5. refused     - отказ
  -->
  <div v-if="orders">
    <el-row type="flex" justify="start" align="middle" class="mb-4">
      <h2 class="ml-3 mr-2">
        Статус
      </h2>
      <el-select
        filterable
        no-match-text="Status is missing"
        v-model="status"
        placeholder="Brand"
        @change="loadOrdersWithStatus">
        <el-option
          v-for="status in ORDER_STATUSES"
          :key="status.value"
          :label="status.label"
          :value="status.value">
        </el-option>
      </el-select>
    </el-row>
    <purchase-table type="order" :data="orders"/>
    <el-row v-if="totalOrdersCount" type="flex" justify="start" class="mt-2">
      <el-pagination
        @current-change="changeCurPage"
        @size-change="changePageSize"
        background
        layout="sizes, prev, pager, next, total"
        :current-page.sync="curPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 50, 100]"
        :total="totalOrdersCount">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import PurchaseTable from './PurchaseTable.vue'

export default {
  components: {PurchaseTable},
  name: 'AdminOrders',
  data () {
    return {
      status: 'created',
      curPage: 1,
      pageSize: 5
    }
  },
  methods: {
    loadOrdersWithStatus () {
      this.$store.dispatch('fetchOrders', {status: this.status})
    },
    changeCurPage (curPage) {
      this.curPage = curPage
    },
    changePageSize (size) {
      this.pageSize = size
    }
  },
  computed: {
    orders () {
      if (this.$store.getters.orders) {
        return Object.values(this.$store.getters.orders)
          .slice((this.curPage - 1) * this.pageSize, this.curPage * this.pageSize)
      } else {
        return []
      }
    },
    totalOrdersCount () {
      return this.$store.getters.orders ? Object.keys(this.$store.getters.orders).length : 0
    }
  },
  created () {
    this.loadOrdersWithStatus()
  }
}
</script>
