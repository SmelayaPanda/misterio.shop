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
          <el-tag type="success" class="mt-2 mb-3">
            Номер ордера: {{ orderId }}
          </el-tag>
          <br>
          <el-tag v-if="tokenizeError"
                  type="danger"
                  class="mt-2 mb-3">
            {{ tokenizeError }}
          </el-tag>
          <div id="credit_card_form" class="card">
            <form action="">
              <v-text-field
                v-model="card.number"
                id="card_number"
                label="Номер карты"
                mask="credit-card"
                color="white"
                light
                required
                append-icon="credit_card">
              </v-text-field>
              <el-row type="flex">
                <el-col :span="7" id="month_wrap">
                  <v-text-field
                    v-model="card.month"
                    label="Месяц"
                    mask="##"
                    required color="white">
                  </v-text-field>
                </el-col>
                <el-col :span="2" id="date_divider">/</el-col>
                <el-col :span="7" id="year_wrap">
                  <v-text-field
                    label="Год"
                    mask="##"
                    v-model="card.year"
                    required
                    color="white"></v-text-field>
                </el-col>
                <el-col :span="8" id="cvc_wrap" align="right">
                  <v-text-field
                    label="CVC"
                    mask="####"
                    v-model="card.cvc"
                    required
                    color="white">
                  </v-text-field>
                </el-col>
              </el-row>
              <el-tooltip placement="bottom" class="item">
                <v-icon id="card_help" class="white--text">live_help</v-icon>
                <div slot="content">
                  * - поля обязательные для заполнения<br/> <br>
                  CVC - Код проверки подлинности карты (или код CVC*) <br>
                  - это дополнительный код, нанесенный на вашу дебетовую или кредитную карту. <br>
                  Для большинства карт (Visa, MasterCard, банковские карты и т. д.) <br>
                  это последние три цифры числа, напечатанного в поле подписи на обратной стороне карты.
                </div>
              </el-tooltip>
            </form>
          </div>
          <el-button @click="tokenizeCard" id="success_pay_btn">Оплатить {{ order.totalPrice }} РУБ</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'YandexPayNowDialog',
  props: ['orderId'],
  data () {
    return {
      dialogVisible: true,
      tokenizeError: '',
      card: {
        number: '1111111111111026',
        cvc: '000',
        month: '12',
        year: '25'
      }
    }
  },
  methods: {
    tokenizeCard: function () {
      let yandexCheckout = window.YandexCheckout(505369)
      yandexCheckout.tokenize(this.card)
        .then(res => {
          if (res.status === 'success') { // OK - tokenize
            const {paymentToken} = res.data.response
            this.createPayment(paymentToken)
          }
          if (res.status === 'error') { // FAIL - tokenize
            const {params} = res.error
            let msg = 'Ошибка: '
            for (let p of params) {
              msg += p.message + '. '
            }
            this.tokenizeError = msg
          }
        })
        .catch((err) => this.$store.dispatch('LOG', err))
    },
    // Cloud functions create payment
    async createPayment (paymentToken) {
      this.dialogVisible = false
      console.log(paymentToken)
      let url = ''
      if (process.env.NODE_ENV === 'production') { // TODO: for prod
        url = 'https://us-central1-e-store-dev.cloudfunctions.net/createYandexPayment'
      } else if (process.env.NODE_ENV === 'development') {
        url = 'https://us-central1-e-store-dev.cloudfunctions.net/createYandexPayment'
      }
      await axios.post(url, {
        paymentToken: paymentToken,
        idempotenceKey: this.orderId + '19',
        order: this.order
      })
        .then((response) => {
          if (response.data.status === 'pending') {
            // console.log(response.data.obj)
            this.$notify.success({
              title: 'Инфо',
              message: 'Ваш платеж поступил в обработку и ожидает подтверждения',
              offset: 100,
              duration: 60000
            })
          }
          if (response.data.status === 'succeeded') {
            // console.log(response.data.obj)
            this.$notify.success({
              title: 'Поздравляем!',
              message: 'Ваш платеж успешно совершен! Мы свяжемся с Вами в ближайшее время',
              offset: 100,
              duration: 60000
            })
          }
          if (response.data.status === 'error') {
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

  /* CARD CSS */
  #credit_card_form {
    border: 1px solid $color-primary;
    border-radius: 20px;
    padding: 25px 30px;
  }

  #month_wrap,
  #year_wrap {
    padding-right: 10px;
  }

  #date_divider {
    margin-top: 22px;
    margin-left: -5px;
    margin-right: 5px;
  }

  #cvc_wrap {
    padding-left: 20px;
  }

  #card_help {
    position: absolute;
    right: 30px;
    bottom: 20px;
  }

  .card {
    width: 400px;
    height: 240px;
    border: 2px solid #000000;
    border-radius: 31px;
    /*background: #1133dd linear-gradient(17deg, #1e5799 0%, #1e5799 12%, #207cca 37%, #2989d8 51%, #2989d8 64%, #2989d8 83%, #7db9e8 100%);*/
    background: $color-primary linear-gradient(17deg, $color-primary 0%, $color-primary 12%, $color-primary 37%, $color-primary 51%, $color-primary 64%, $color-primary 83%, $color-primary 100%);
    position: relative;
    overflow: hidden;
  }

  .card::before, .card::after {
    content: "";
    position: absolute;
    display: block;
    border-radius: 70%;
  }

  .card::after {
    top: 50%;
    right: 40%;
    width: 370%;
    height: 140%;
    /*background-image: radial-gradient(ellipse at bottom left, #b2e1ff 0%, #66b6fc 30%, transparent 100%);*/
    background-image: radial-gradient(ellipse at bottom left, $color-primary 0%, $color-primary 30%, transparent 100%);
    opacity: 0.19;
    /*box-shadow: 4px 2px 6px #b2e1ff, 4px 2px 3px #ffffff, 1000px 7px 6px #66b6fc, 1000px 6px 4px #223355;*/
    box-shadow: 4px 2px 6px $color-primary, 4px 2px 3px $color-primary, 1000px 7px 6px $color-primary, 1000px 6px 4px $color-primary;
  }

  .card::before {
    top: 37%;
    left: 25%;
    width: 270%;
    height: 140%;
    background-image: radial-gradient(ellipse at bottom left, $color-secondary 0%, $color-secondary 30%, transparent 100%);
    opacity: 0.67;
    /*box-shadow: -4px -2px 6px #b2e1ff, -4px -2px 3px #ffffff, -180px -2px 6px #66b6fc, -180px -2px 4px #223355;*/
    box-shadow: -4px -2px 6px $color-primary, -4px -2px 3px $color-secondary, -180px -2px 6px $color-secondary, -180px -2px 4px $color-secondary;
  }

  @media only screen and (max-width: $xs-screen) {
    .card {
      width: 320px;
      height: 220px;
    }
  }
</style>
