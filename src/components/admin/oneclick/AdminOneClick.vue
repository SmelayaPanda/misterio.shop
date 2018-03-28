<template>
  <!--
ORDER STATUS CHAIN:
  1. created     - создан (необходимо обработать оператором)
  2. sentPending - ожидает отправки ( товар с оплатой при получении попадает сразу в данный статус )
  3. sent        - товар отправлен
  4. delivered   - товар доставлен
  5. refused     - отказ
  -->
  <div v-if="oneClick">
    <el-row type="flex" justify="start" align="middle" class="mb-4">
      <h2 class="ml-3 mr-2">Status</h2>
      <el-select filterable
                 no-match-text="Status is missing"
                 v-model="status"
                 placeholder="Brand"
                 @change="loadStatusOneClick"
      >
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
      style="width: 100vw; text-align: left"
    >
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
                Product info:
              </h3>
              <p>
                Product Id: <el-tag size="mini" type="success">{{ props.row.product.id }}</el-tag><br>
                Title: {{ props.row.product.title }}<br>
                SKU: {{ props.row.product.SKU }}<br>
                Price: {{ props.row.product.price }}<br>
                <span v-if="props.row.product.totalQty">Total Qty: {{ props.row.product.totalQty }}</span>
              </p>
              <span v-if="props.row.comments">
                <h3><i class="el-icon-warning"></i>
                  Comments:
                </h3>
                {{ props.row.comments }}<br>
              </span>
            </el-col>
            <el-col :span="12">
              <span v-if="props.row.shipping">
                <h3><i class="el-icon-location pl-2"></i>
                  Shipping info:
                </h3>
                <p>
                  City: {{ props.row.shipping.city }}<br>
                  Street: {{ props.row.shipping.street }}<br>
                  Build: {{ props.row.shipping.build }}<br>
                  House: {{ props.row.shipping.house }}<br>
                </p>
              </span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <h3 class="mt-3">Status history:</h3>
              <span>
                  <el-tag type="info">Created
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
                    <el-tag type="info">Processed
                      <p>
                        {{ props.row.processDate | date }}<br>
                        {{(Math.abs(props.row.processDate - props.row.creationDate) / 36e5).toFixed(1) }} hours
                      </p>
                    </el-tag>
                </span>
              <!--SENT-->
              <span v-if="props.row.sentDate">
                  <i class="el-icon-caret-right"></i>
                    <el-tag type="info">Sent
                      <p>
                        {{ props.row.sentDate | date }}<br>
                        {{(Math.abs(props.row.sentDate - props.row.processDate) / 36e5).toFixed(1) }} hours
                      </p>
                    </el-tag>
                </span>
              <!--DELIVERED-->
              <span v-if="props.row.deliveryDate">
                  <i class="el-icon-caret-right"></i>
                    <el-tag type="info">Delivered
                      <p>
                        {{ props.row.deliveryDate | date }}<br>
                        {{(Math.abs(props.row.deliveryDate - props.row.sentDate) / 36e5).toFixed(1) }} hours
                      </p>
                    </el-tag>
                </span>
              <!--RETURNED-->
              <span v-if="props.row.returnDate">
                  <i class="el-icon-caret-right"></i>
                    <el-tag type="info">Returned
                      <p>
                        {{ props.row.returnDate | date }}<br>
                        {{(Math.abs(props.row.returnDate - props.row.deliveryDate) / 36e5).toFixed(1) }} hours
                      </p>
                    </el-tag>
                </span>
              <!--REFUSE-->
              <span v-if="props.row.refuseDate">
                  <i class="el-icon-caret-right"></i>
                    <el-tag type="info">Refuse
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
        label="Date"
        width="200">
        <template slot-scope="scope">
          <span><el-tag type="success">{{ scope.row.creationDate | date }}</el-tag></span>
        </template>
      </el-table-column>
      <!--Title-->
      <el-table-column
        label="Title"
        width="260">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>Title: {{ scope.row.product.title }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.product.title | snippet(32) }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <!--NICKNAME-->
      <el-table-column
        label="Nickname"
        width="150">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.nickname }}</p>
            <div slot="reference" class="name-wrapper">
              <p>{{ scope.row.nickname | snippet(14) }}</p>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <!--PHONE/EMAIL-->
      <el-table-column
        label="Phone/Email"
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
        label="Action">
        <template slot-scope="scope">
          <el-row type="flex" justify="start">
            <process-one-click :oneClickId="scope.row.id"
                               v-if="status === 'created'"
            >
            </process-one-click>
            <!--CHANGE STATUS-->
            <change-one-click-status :oneClickId="scope.row.id"></change-one-click-status>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
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
      status: 'created'
    }
  },
  methods: {
    loadStatusOneClick () {
      this.$store.dispatch('fetchOneClick', this.status)
    }
  },
  computed: {
    oneClick () {
      return this.$store.getters.oneClick
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
