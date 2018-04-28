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
    <el-table
      ref="categoryTable"
      :data="orders"
      :highlight-current-row="true"
      empty-text="No data"
      style="width: 100vw; text-align: left;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row>
            <el-col :span="12" class="pl-1">
              <p>Order id:<el-tag size="mini" type="success">{{ props.row.id }}</el-tag></p>
              <p>User id:<el-tag size="mini" type="success">{{ props.row.buyer.userId }}</el-tag></p>
              <h3><i class="el-icon-info"></i>
                Информация о продуктах:
              </h3>
              <p v-for="p in props.row.products" :key="p.id">
                ИД:
                <el-tag size="mini" type="success">{{ p.id }}</el-tag>
                <br>
                Название: {{ p.title }}<br>
                Артикул: {{ p.SKU }}<br>
                Цена: {{ p.price }}<br>
                Количество: {{ p.qty }}
              </p>
              <p v-if="props.row.comments">
                <span class="info_title"><i class="el-icon-warning"></i>
                  Коментарии:
                </span><br>
                Пользователя: {{ props.row.comments.user }}<br>
                Администратора: {{ props.row.comments.admin }}
              </p>
            </el-col>
            <el-col :span="12" class="pl-2">
              <p v-if="props.row.delivery.address">
                <span class="info_title"><i class="el-icon-location"></i>
                  Доставка:
                </span><br>
                Страна: {{ props.row.delivery.address.country }}<br>
                Город: {{ props.row.delivery.address.city }}<br>
                Улица: {{ props.row.delivery.address.street }}<br>
                Здание: {{ props.row.delivery.address.build }}<br>
                Дом: {{ props.row.delivery.address.house }}<br>
                Почтовый индекс: {{ props.row.delivery.address.postCode }}<br>
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <h3 class="mt-3"><i class="el-icon-date"></i>
                История:
              </h3>
              <!--CREATED-->
              <el-tag>
                Оформлено
                <p>
                  {{ props.row.history.created | date }}<br>
                  <span v-if="props.row.history.pending">
                    ------------------------------
                  </span>
                </p>
              </el-tag>
              <!--PENDING-->
              <span v-if="props.row.history.pending">
                <i class="el-icon-caret-right"></i>
                <el-tag>
                  Ожидает отправки
                  <p>
                    {{ props.row.history.pending | date }}<br>
                    {{(Math.abs(props.row.history.pending - props.row.history.created) / 36e5).toFixed(1) }} ч.
                  </p>
                </el-tag>
              </span>
              <!--SENT-->
              <span v-if="props.row.history.sent">
                  <i class="el-icon-caret-right"></i>
                  <el-tag>
                    Отправлено
                    <p>
                      {{ props.row.history.sent | date }}<br>
                      {{(Math.abs(props.row.history.sent - props.row.history.pending) / 36e5).toFixed(1) }} ч.
                    </p>
                  </el-tag>
                </span>
              <!--DELIVERED-->
              <span v-if="props.row.history.delivered">
                <i class="el-icon-caret-right"></i>
                <el-tag>
                  Доставлено
                  <p>
                    {{ props.row.history.delivered | date }}<br>
                    {{(Math.abs(props.row.history.delivered - props.row.history.sent) / 36e5).toFixed(1) }} ч.
                  </p>
                </el-tag>
              </span>
              <!--REFUSE-->
              <span v-if="props.row.history.refused">
                <i class="el-icon-caret-right"></i>
                <el-tag>
                  Отклонено
                  <p>
                    {{ props.row.history.refused | date }}<br>
                    {{(Math.abs(props.row.history.refused - props.row.history.created) / 36e5).toFixed(1) }} ч. (от начала)
                  </p>
                </el-tag>
              </span>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!--CREATION DATE-->
      <el-table-column
        label="Дата"
        width="200">
        <template slot-scope="scope">
          <span><el-tag type="success">{{ scope.row.history.created | date }}</el-tag></span>
        </template>
      </el-table-column>
      <!--Title-->
      <el-table-column
        label="Сумма (РУБ)"
        width="130">
        <template slot-scope="scope">
          <p>{{ scope.row.totalPrice }} </p>
        </template>
      </el-table-column>
      <!--NAME-->
      <el-table-column
        label="Имя Фамилия"
        width="140">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.buyer.firstname.concat(' ',scope.row.buyer.lastname ) }}</p>
            <div slot="reference" class="name-wrapper">
              <p>{{ scope.row.buyer.firstname.concat(' ',scope.row.buyer.lastname ) | snippet(14) }}</p>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <!--PHONE/EMAIL-->
      <el-table-column
        label="Контакты"
        width="200">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>Тел: {{ scope.row.buyer.phone }}</p>
            <p>Email: {{ scope.row.buyer.email }}</p>
            <div slot="reference" class="name-wrapper">
              <p>
                {{ scope.row.buyer.phone }}<br>
                {{ scope.row.buyer.email | snippet(20) }}
              </p>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <!--Process-->
      <el-table-column
        width="150"
        label="Действия">
        <template slot-scope="scope">
          <!--CHANGE STATUS-->
          <change-order-status :orderId="scope.row.id"></change-order-status>
        </template>
      </el-table-column>
    </el-table>
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
import ChangeOrderStatus from './ChangeOrderStatus'

export default {
  components: {ChangeOrderStatus},
  name: 'AdminOrders',
  data () {
    return {
      status: 'created',
      showPayPalIPN: false,
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

<style scoped lang="scss">
  .info_title {
    font-size: 16px;
    font-weight: 600;
  }
</style>
