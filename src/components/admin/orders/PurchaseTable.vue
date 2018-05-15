<!--
Common table for one click and orders
-->
<template>
  <el-table
    ref="purchaseTable"
    :data="data"
    :highlight-current-row="true"
    empty-text="No data"
    style="width: 100vw; text-align: left;">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-row>
          <el-col :span="12" class="pl-1">
            <p>Order id:
              <el-tag size="mini" type="success">{{ props.row.id }}</el-tag>
            </p>
            <p>User id:
              <el-tag size="mini" type="success">{{ props.row.buyer.userId }}</el-tag>
            </p>
            <p>
              <v-icon class="mb-1">monetization_on</v-icon>
              <span class="info_title">
                  Оплата:
                </span><br>
              <span v-if="props.row.payment.type && props.row.payment.method">
                {{ PAYMENT_TYPES[props.row.payment.type].label }}:
                {{ PAYMENT_METHODS[props.row.payment.method].label }} <br>
              </span>
              <span v-if="props.row.payment.status">
                Статус:
                <span :class="props.row.payment.status === PAYMENT_STATUSES.none.value ||
                              props.row.payment.status === PAYMENT_STATUSES.canceled.value ?
                              'error--text' : 'success--text'">
                  {{ PAYMENT_STATUSES[props.row.payment.status].label }}
                </span> <br>
              </span>
              Стоимость товаров: {{ props.row.amount.products.value }} <span v-html="RUB"></span><br>
              Стоимость доставки: {{ props.row.amount.delivery.value }} <span v-html="RUB"></span><br>
              Размер скидки: {{ props.row.amount.discount.value }} <span v-html="RUB"></span> <br>
              Конечная цена: {{ props.row.amount.final.value }} <span v-html="RUB"></span> <br>
            </p>
            <h3>
              <v-icon class="mb-1">info</v-icon>
              Информация о продуктах:
            </h3>
            <p v-for="p in props.row.products" :key="p.id">
              ИД:
              <el-tag size="mini" type="success">{{ p.id }}</el-tag>
              <br>
              Название: {{ p.title }}<br>
              Артикул: {{ p.SKU }}<br>
              Цена: {{ p.price | price }}<br>
              Количество: {{ p.qty }}
            </p>
          </el-col>
          <el-col v-if="props.row.delivery && props.row.delivery.address" :span="12" class="pl-2">
            <p>
              <span class="info_title"><v-icon class="mb-1">location_on</v-icon>
                Доставка:
              </span><br>
              Страна: {{ props.row.delivery.address.country }}<br>
              Город: {{ props.row.delivery.address.city }}<br>
              Улица: {{ props.row.delivery.address.street }}<br>
              Здание: {{ props.row.delivery.address.build }}<br>
              Дом: {{ props.row.delivery.address.house }}<br>
              Почтовый индекс: {{ props.row.delivery.address.postCode }}<br>
            </p>
            <p v-if="props.row.delivery.method">
              <v-icon class="mb-1">airplanemode_active</v-icon>
              <span class="info_title">Способ доставки:</span><br>
              {{ DELIVERY_METHODS[props.row.delivery.method].label }}
            </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p v-if="props.row.comments">
                <span class="info_title"><v-icon class="mb-1">report</v-icon>
                  Коментарии:
                </span><br>
              Пользователя: {{ props.row.comments.user }}<br>
              Администратора: {{ props.row.comments.admin }}
            </p>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="props.row.payment && props.row.payment.notification &&
                        props.row.payment.notification.succeeded" :span="24">
            Чековая информация по оплате:
            <v-switch v-model="props.row.showDetails"></v-switch>
            <p v-if="props.row.showDetails">{{ props.row.payment.notification.succeeded }}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="props.row.history" :span="24">
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
      label="Сумма"
      width="130">
      <template slot-scope="scope">
        <p>{{ scope.row.amount.final.value }} <span v-html="RUB"></span></p>
      </template>
    </el-table-column>
    <!--NAME-->
    <el-table-column
      label="Имя Фамилия"
      width="150">
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
      v-if="type === 'order'"
      width="186"
      label="Действия">
      <template slot-scope="scope">
        <!--CHANGE STATUS-->
        <change-order-status :orderId="scope.row.id"/>
        <change-order-payment-status
          v-if="scope.row.payment.status !== PAYMENT_STATUSES.succeeded.value"
          :orderId="scope.row.id"/>
      </template>
    </el-table-column>
    <el-table-column
      v-if="type === 'oneclick'"
      width="186"
      label="Действия">
      <template slot-scope="scope">
        <el-row type="flex" justify="start">
          <process-one-click v-if="status === 'created'" :oneClickId="scope.row.id"/>
          <change-one-click-status :oneClickId="scope.row.id"/>
          <change-one-click-payment-status
            v-if="scope.row.payment.status !== PAYMENT_STATUSES.succeeded.value"
            :oneClickId="scope.row.id"/>
        </el-row>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import ChangeOrderStatus from './ChangeOrderStatus'
import ProcessOneClick from '../oneclick/ProcessOneClick'
import ChangeOneClickStatus from '../oneclick/ChangeOneClickStatus'
import ChangeOneClickPaymentStatus from '../oneclick/ChangeOneClickPaymentStatus'
import ChangeOrderPaymentStatus from './ChangeOrderPaymentStatus'

export default {
  name: 'purchase-table',
  components: {
    ChangeOrderPaymentStatus,
    ChangeOneClickPaymentStatus,
    ChangeOrderStatus,
    ProcessOneClick,
    ChangeOneClickStatus
  },
  props: {
    type: {type: String, required: true},
    data: {type: Array, required: true},
    status: {type: String, required: false}
  }
}
</script>
<style scoped lang="scss">
  .info_title {
    font-size: 16px;
    font-weight: 600;
  }
</style>
