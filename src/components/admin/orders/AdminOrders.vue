<template>
  <!--
ORDER STATUS CHAIN:
  1. payPending  - ожидает оплаты
  2. sentPending - ожидает отправки ( товар с оплатой при получении попадает сразу в данный статус )
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
          v-for="val in statuses"
          :key="val"
          :label="val"
          :value="val">
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
              <p><span>Order id:</span>
                <el-tag size="mini" type="success">{{ props.row.id }}</el-tag>
              </p>
              <p><span>User id:</span>
                <el-tag size="mini" type="success">{{ props.row.userId }}</el-tag>
              </p>
              <h3><i class="el-icon-info"></i>
                Информация о продуктах:
              </h3>
              <p v-for="p in props.row.products" :key="p.productId">
                ИД:
                <el-tag size="mini" type="success">{{ p.productId }}</el-tag>
                <br>
                Название: {{ p.title }}<br>
                Артикул: {{ p.SKU }}<br>
                Цена: {{ p.price }}<br>
                <span v-if="p.qty">Total Qty: {{ p.qty }}</span>
              </p>
              <span v-if="props.row.comments">
                <h3><i class="el-icon-warning"></i>
                  Коментарий:
                </h3>
                {{ props.row.comments }}<br>
              </span>
            </el-col>
            <el-col :span="12" class="pl-2">
              <span v-if="props.row.shipping">
                <h3><i class="el-icon-location"></i>
                  Доставка:
                </h3>
                <p>
                  Страна: {{ props.row.shipping.country }}<br>
                  Город: {{ props.row.shipping.city }}<br>
                  Улица: {{ props.row.shipping.street }}<br>
                  Здание: {{ props.row.shipping.build }}<br>
                  Дом: {{ props.row.shipping.house }}<br>
                  Почтовый код: {{ props.row.shipping.postCode }}<br>
                </p>
              </span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <h3 class="mt-3">
                <i class="el-icon-date"></i>
                История:
              </h3>
              <span>
                  <el-tag>Покупка
                    <p>
                      {{ props.row.checkoutDate | date }}<br>
                      <span v-if="props.row.checkoutDate">
                        ------------------------------
                      </span>
                    </p>
                  </el-tag>
                </span>
              <!--SENT-->
              <span v-if="props.row.sentDate">
                  <i class="el-icon-caret-right"></i>
                    <el-tag>Отправлено
                      <p>
                        {{ props.row.sentDate | date }}<br>
                        {{(Math.abs(props.row.sentDate - props.row.checkoutDate) / 36e5).toFixed(1) }} hours
                      </p>
                    </el-tag>
                </span>
              <!--DELIVERED-->
              <span v-if="props.row.deliveryDate">
                  <i class="el-icon-caret-right"></i>
                    <el-tag>Доставлено
                      <p>
                        {{ props.row.deliveryDate | date }}<br>
                        {{(Math.abs(props.row.deliveryDate - props.row.sentDate) / 36e5).toFixed(1) }} hours
                      </p>
                    </el-tag>
                </span>
              <!--REFUSE-->
              <span v-if="props.row.refuseDate">
                  <i class="el-icon-caret-right"></i>
                    <el-tag>Отклонено
                      <p>
                        {{ props.row.refuseDate | date }}<br>
                        {{(Math.abs(props.row.refuseDate - props.row.checkoutDate) / 36e5).toFixed(1) }} hours (from checkout)
                      </p>
                    </el-tag>
                </span>
            </el-col>
          </el-row>
          <el-row v-if="props.row.payPalIPN">
            <el-col :span="20" class="ml-1 mt-2">
              <h3><i class="el-icon-success"></i>
                PayPal IPN (Instant Payment Notification):
              </h3>
              <el-switch v-model="showPayPalIPN"></el-switch>
              <span v-for="(prop, key) in props.row.payPalIPN"
                    :key="prop.txn_id"
                    v-if="showPayPalIPN">
                <span class="primary--text">{{key}}:</span>
                {{ prop }} /
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
          <span><el-tag type="success">{{ scope.row.checkoutDate | date }}</el-tag></span>
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
      status: 'payPending',
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
    },
    statuses () {
      return [
        this.PAY_PEND,
        this.SENT_PEND,
        this.SENT,
        this.DELIVERED,
        this.REFUSED
      ]
    }
  },
  created () {
    this.loadOrdersWithStatus()
  }
}
</script>

<style scoped>
</style>
