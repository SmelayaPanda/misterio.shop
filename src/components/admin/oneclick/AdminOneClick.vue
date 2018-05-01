<template>
  <!--
ORDER STATUS CHAIN:
  1. created     - создан (необходимо обработать оператором)
  2. pending     - ожидает отправки ( товар с оплатой при получении попадает сразу в данный статус )
  3. sent        - товар отправлен
  4. delivered   - товар доставлен
  5. refused     - отказ
  -->
  <div v-if="oneclick">
    <el-row type="flex" justify="start" align="middle" class="mb-4">
      <h2 class="ml-3 mr-2">
        Статус
      </h2>
      <el-select
        filterable
        no-match-text="Статус отсутствует"
        v-model="status"
        placeholder="Статус"
        @change="loadStatusOneClick">
        <el-option
          v-for="status in ORDER_STATUSES"
          :key="status.value"
          :label="status.label"
          :value="status.value">
        </el-option>
      </el-select>
    </el-row>
    <purchase-table type="oneclick" :data="oneclick" :status="this.status"/>
    <el-row v-if="totalOneClickCount" type="flex" justify="start" class="mt-2">
      <el-pagination
        @current-change="changeCurPage"
        @size-change="changePageSize"
        background
        layout="sizes, prev, pager, next, total"
        :current-page.sync="curPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 50, 100]"
        :total="totalOneClickCount">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import ProcessOneClick from './ProcessOneClick'
import ChangeOneClickStatus from './ChangeOneClickStatus'
import PurchaseTable from '../orders/PurchaseTable'

export default {
  components: {
    PurchaseTable,
    ProcessOneClick,
    ChangeOneClickStatus
  },
  name: 'AdminOneClick',
  data () {
    return {
      status: 'created',
      curPage: 1,
      pageSize: 5
    }
  },
  methods: {
    loadStatusOneClick () {
      this.$store.dispatch('fetchOneClick', this.status)
    },
    changeCurPage (curPage) {
      this.curPage = curPage
    },
    changePageSize (size) {
      this.pageSize = size
    }
  },
  computed: {
    oneclick () {
      if (this.$store.getters.oneclick) {
        return Object.values(this.$store.getters.oneclick)
          .slice((this.curPage - 1) * this.pageSize, this.curPage * this.pageSize)
      } else {
        return []
      }
    },
    totalOneClickCount () {
      return this.$store.getters.oneclick ? Object.keys(this.$store.getters.oneclick).length : 0
    }
  },
  created () {
    this.loadStatusOneClick()
  }
}
</script>

<style scoped>
</style>
