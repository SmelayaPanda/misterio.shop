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
          <el-button @click="tokenizeCard" id="success_pay_btn">Оплатить {{ order.totalPrice }} РУБ</el-button>
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
    tokenizeCard: function () {
      let yandexCheckout = window.YandexCheckout(505369)
      yandexCheckout.tokenize({
        number: '1111111111111026',
        cvc: '000',
        month: '12',
        year: '25'
      })
        .then(res => {
          if (res.status === 'success') { // OK - tokenize
            const {paymentToken} = res.data.response
            this.createPayment(paymentToken)
          }
          if (res.status === 'error') { // FAIL - tokenize
            const {type} = res.error
            console.log(res.error)
            console.log(type)
          }
        })
        .catch((err) => this.$store.dispatch('LOG', err))
    },
    // Cloud functions create payment
    async createPayment (paymentToken) {
      console.log(paymentToken)
      let url = ''
      if (process.env.NODE_ENV === 'production') { // TODO: for prod
        url = 'https://us-central1-e-store-dev.cloudfunctions.net/createYandexPayment'
      } else if (process.env.NODE_ENV === 'development') {
        url = 'https://us-central1-e-store-dev.cloudfunctions.net/createYandexPayment'
      }
      this.dialogVisible = false
      await axios.post(url, {
        paymentToken: paymentToken,
        idempotenceKey: this.orderId + '13',
        order: this.order
      })
        .then((response) => {
          if (response.data.type === 'success') {
            // console.log(response.data.obj)
            this.$notify.success({
              title: 'Поздравляем!',
              message: 'Ваш платеж успешно совершен! Мы свяжемся с Вами в ближайшее время',
              offset: 100,
              duration: 60000
            })
          }
          if (response.data.type === 'error') {
            this.$notify.error({
              title: 'Что-то пошло не так.',
              message: 'Попробуйте повторить попытку позже или свяжитесь с администратором.',
              offset: 100,
              duration: 60000
            })
            throw response.data.obj
          }
        })
        .catch((err) => this.$store.dispatch('LOG', err))
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
