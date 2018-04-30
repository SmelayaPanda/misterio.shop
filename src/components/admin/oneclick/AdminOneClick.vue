<template>
  <!--
ORDER STATUS CHAIN:
  1. created     - создан (необходимо обработать оператором)
  2. pending     - ожидает отправки ( товар с оплатой при получении попадает сразу в данный статус )
  3. sent        - товар отправлен
  4. delivered   - товар доставлен
  5. refused     - отказ
  -->
  <div v-if="oneClick">
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
          v-for="val in statuses"
          :key="val"
          :label="val"
          :value="val">
        </el-option>
      </el-select>
    </el-row>
    <el-table
      ref="oneClickTable"
      :data="oneClick"
      :highlight-current-row="true"
      empty-text="No data"
      style="width: 100vw; text-align: left">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row>
            <el-col :span="12" class="pl-1">
              <p>
                One click id:
                <el-tag size="mini" type="success">{{ props.row.id }}</el-tag>
              </p>
              <p>
                User id:
                <el-tag size="mini" type="success">{{ props.row.userId }}</el-tag>
              </p>
              <h3><i class="el-icon-info"></i>
                Информация о товаре:
              </h3>
              <p>
                ИД:
                <el-tag size="mini" type="success">{{ props.row.productId }}</el-tag>
                <br>
                Название: {{ props.row.title }}<br>
                Артикул: {{ props.row.SKU }}<br>
                Цена: {{ props.row.price }}<br>
                <span v-if="props.row.qty">Количество: {{ props.row.qty }}</span>
              </p>
              <span v-if="props.row.comments">
                <h3><i class="el-icon-warning"></i>
                  Коментарий:
                </h3>
                {{ props.row.comments }}<br>
              </span>
            </el-col>
            <el-col :span="12">
              <span v-if="props.row.shipping">
                <h3><i class="el-icon-location pl-2"></i>
                  Доставка:
                </h3>
                <p>
                  Город: {{ props.row.shipping.country }}<br>
                  Город: {{ props.row.shipping.city }}<br>
                  Улица: {{ props.row.shipping.street }}<br>
                  Здание: {{ props.row.shipping.build }}<br>
                  Дом: {{ props.row.shipping.house }}<br>
                  Почтовый индекс: {{ props.row.shipping.postCode }}<br>
                </p>
              </span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <h3 class="mt-3">
                <i class="el-icon-date"></i>
                История
              </h3>
              <span>
                  <el-tag>Создано
                    <p>
                      {{ props.row.creationDate | date }}<br>
                      <span v-if="props.row.processDate || props.row.refuseDate">
                        ------------------------------
                      </span>
                    </p>
                  </el-tag>
                </span>
              <!--PROCESS-->
              <span v-if="props.row.processDate">
                  <i class="el-icon-caret-right"></i>
                    <el-tag>Обработано
                      <p>
                        {{ props.row.processDate | date }}<br>
                        {{(Math.abs(props.row.processDate - props.row.creationDate) / 36e5).toFixed(1) }} hours
                      </p>
                    </el-tag>
                </span>
              <!--SENT-->
              <span v-if="props.row.sentDate">
                  <i class="el-icon-caret-right"></i>
                    <el-tag>Отправлено
                      <p>
                        {{ props.row.sentDate | date }}<br>
                        {{(Math.abs(props.row.sentDate - props.row.processDate) / 36e5).toFixed(1) }} hours
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
              <!--RETURNED-->
              <span v-if="props.row.returnDate">
                  <i class="el-icon-caret-right"></i>
                    <el-tag>Возвращено
                      <p>
                        {{ props.row.returnDate | date }}<br>
                        {{(Math.abs(props.row.returnDate - props.row.deliveryDate) / 36e5).toFixed(1) }} hours
                      </p>
                    </el-tag>
                </span>
              <!--REFUSE-->
              <span v-if="props.row.refuseDate">
                  <i class="el-icon-caret-right"></i>
                    <el-tag>Отклонено
                      <p>
                        {{ props.row.refuseDate | date }}<br>
                        {{(Math.abs(props.row.refuseDate - props.row.creationDate) / 36e5).toFixed(1) }} hours (from creation)
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
          <span><el-tag type="success">{{ scope.row.creationDate | date }}</el-tag></span>
        </template>
      </el-table-column>
      <!--Title-->
      <el-table-column
        label="Товар"
        width="300">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>Title: {{ scope.row.title }}</p>
            <div slot="reference" class="name-wrapper">
              <v-chip outline label color="info_a">
                {{ scope.row.title | snippet(25) }}
              </v-chip>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <!--firstname-->
      <el-table-column
        label="Имя Фамилия"
        width="150">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>
              {{ scope.row.firstname }}
              <span v-if="scope.row.lastname"></span>
            </p>
            <div slot="reference" class="name-wrapper">
              <span v-if="scope.row.firstname">{{ scope.row.firstname }}</span>
              <span v-if="scope.row.lastname">{{ scope.row.lastname }}</span>
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
            <p>Phone: {{ scope.row.phone }}</p>
            <p>Email: {{ scope.row.email }}</p>
            <div slot="reference" class="name-wrapper">
              <p>
                {{ scope.row.phone }}<br>
                {{ scope.row.email | snippet(20) }}
              </p>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <!--ACTIONS-->
      <el-table-column
        width="150"
        label="Действия">
        <template slot-scope="scope">
          <el-row type="flex" justify="start">
            <process-one-click :oneClickId="scope.row.id"
                               v-if="status === 'created'">
            </process-one-click>
            <!--CHANGE STATUS-->
            <change-one-click-status :oneClickId="scope.row.id"></change-one-click-status>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
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

export default {
  components: {
    ProcessOneClick,
    ChangeOneClickStatus
  },
  name: 'AdminOneClick',
  data () {
    return {
      status: 'created',
      curPage: 1,
      pageSize: 6
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
    oneClick () {
      if (this.$store.getters.oneClick) {
        return Object.values(this.$store.getters.oneClick)
          .slice((this.curPage - 1) * this.pageSize, this.curPage * this.pageSize)
      } else {
        return []
      }
    },
    totalOneClickCount () {
      return this.$store.getters.oneClick ? Object.keys(this.$store.getters.oneClick).length : 0
    },
    statuses () {
      return [
        this.CREATED,
        this.SENT_PEND,
        this.SENT,
        this.DELIVERED,
        this.REFUSED
      ]
    }
  },
  created () {
    this.loadStatusOneClick()
  }
}
</script>

<style scoped>
</style>
