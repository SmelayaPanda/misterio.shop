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
          <el-button @click="payOrder" id="success_pay_btn">Оплатить {{ order.totalPrice }} РУБ</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import CreditCard from './CreditCard'
import axios from 'axios'

export default {
  name: 'YandexPayNowDialog',
  props: ['orderId'],
  components: {CreditCard},
  data () {
    return {
      dialogVisible: true
    }
  },
  methods: {
    payOrder () {
      let yandexCheckout = window.YandexCheckout(505369)
      yandexCheckout.tokenize({
        number: '1111111111111026',
        cvc: '000',
        month: '12',
        year: '25'
      })
        .then(res => {
          if (res.status === 'success') {
            const {paymentToken} = res.data.response
            console.log(paymentToken)
            let url = ''
            if (process.env.NODE_ENV === 'production') { // TODO: for prod
              url = 'https://us-central1-e-store-dev.cloudfunctions.net/createYandexPayment'
            } else if (process.env.NODE_ENV === 'development') {
              url = 'https://us-central1-e-store-dev.cloudfunctions.net/createYandexPayment'
            }
            // this.dialogVisible = false
            return axios.post(url, {
              paymentToken: paymentToken,
              idempotenceKey: this.orderId + '4',
              order: this.order
            })
              .then(function (response) {
                console.log(response)
              })
              .catch(function (error) {
                console.log(error)
              })
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
    order () {
      return this.$store.getters.orderById(this.orderId)
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
