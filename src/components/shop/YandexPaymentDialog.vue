<template>
  <div>
    <el-button @click="dialogVisible = true"
               class="ml-2 secondary white--text">
      Оплатить
    </el-button>
    <el-dialog title="Misterio Shop"
               :visible.sync="dialogVisible"
               fullscreen
               id="yandex_pay_now_dialod"
               center>
      <el-row type="flex" justify="center">
        <el-col align="center">
          <v-icon class="success--text mb-1" style="margin-left: -10px;">vpn_lock</v-icon>
          <span>Оплата картой</span>
          <br>
          <el-tag type="success" class="mt-2 mb-3">Номер ордера: {{ orderId }}</el-tag>
          <credit-card></credit-card>
          <el-button id="success_pay_btn">Оплатить {{ amount }} РУБ</el-button>
          <!--<el-button @click="tokenizeCard">TOKENIZE</el-button>-->
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import CreditCard from './CreditCard'

export default {
  name: 'YandexPayNowDialog',
  props: ['orderId', 'orderItems', 'amount'],
  components: {CreditCard},
  data () {
    return {
      dialogVisible: true
    }
  },
  methods: {
    tokenizeCard () {
      let yandexCheckout = window.YandexCheckout(505369)
      yandexCheckout.tokenize({
        number: '1111111111111026',
        cvc: '000',
        month: '12',
        year: '25'
      }).then(res => {
        if (res.status === 'success') {
          const {paymentToken} = res.data.response
          console.log(paymentToken)
          return paymentToken
        }
        if (res.status === 'error') {
          const {type} = res.error
          console.log(res.error)
          console.log(type)
        }
      })
    }
  },
  computed: {
    totalItems () {
      let orderItems = this.orderItems
      let items = []
      let isAddedOrderId = false
      for (let product of orderItems) {
        let item = {}
        item.name = product.title
        item.price = product.price
        item.quantity = product.qty
        item.currency = product.currency
        // Add once: because IPN transaction_subject are concatenates
        item.description = isAddedOrderId ? '' : this.orderId
        items.push(item)
        isAddedOrderId = true
      }
      return items
    }
  }
}
</script>

<style scoped lang="scss">
  #success_pay_btn {
    color: white;
    background: $color-success;
    margin-top: 10px;
  }
</style>
