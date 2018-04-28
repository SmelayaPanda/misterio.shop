<!--
  order: {
    amount: {
      final: {
        value: Number,
        currency: "RUB",
      },
      products: {
        value: Number
        currency: "RUB"
      },
      delivery: {
        value: "",
        currency: "RUB"
      },
      discount: {
        value: Number,
        currency: '' | 'RUB',
        type: '' | 'online' | 'instagram' | 'friends',
        dim: 'percent' | 'money'
      }
    },
    status: "created" | "pending" | "sent" | "delivered’ | "refused’,
    history: {
      created: Date,
      pending: Date,
      sent: Date,
      delivered: Date,
      refused: Date
    },
    payment: {
      status: "" | "pending" | "waiting_for_capture" | "succeeded" | "canceled"
      full: Boolean(true = full, false = part)
      type: "cash" | "online" | "terminal"
      method: "cash" | "bank_card" | "sberbank" | "yandex_money" | "qiwi" | "alfabank" | "webmoney" | "apple_pay" | "mobile_balance" | "installments"
      check: { "YandexPaymentResponse" }
    },
    delivery: {
      method: "courier" | "cdek" | "pickpoint" | "postrf"
      address: {
        country: "",
        city: "",
        street: "",
        build: "",
        house: "",
        postCode: ""
      }
    },
    products: [{
        title: "",
        SKU: "",
        price: "",
        currency: "",
        qty: "",
        productId: ""
      }
    ],
    buyer: {
      userId: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: ""
    }
    comments: ""
}
-->
<template>
  <span style="text-align: center">
    <span v-if="type === 'single'" @click="clickBuy">
      <app-theme-btn font-size="12px" width="110px">
          КУПИТЬ
      </app-theme-btn>
    </span>
    <span v-else @click="clickBuy">
      <app-theme-btn type="primary" font-size="12px" width="220px">
          КУПИТЬ ВСЕ
      </app-theme-btn>
    </span>
    <el-dialog
      id="checkout_dialog"
      v-if="orderProducts"
      width="100%"
      close-on-press-escape
      :visible.sync="dialogFormVisible"
      :fullscreen="true">
      <p id="checkout">
        КАССА
      </p>
      <el-row type="flex" justify="center" style="flex-wrap: wrap">
        <!--ITEMS INFO-->
        <el-col :xs="24" :sm="24" :md="9" :lg="8" :xl="7" id="my_order_wrap">
          <div id="my_order">
            <p id="my_order_title">
              Мой заказ
            </p>
            <div
              class="order_info"
              v-for="product in orderProducts"
              :key="product.productId">
              <span class="product_title">
                {{ product.title }}:
              </span><br>
              <span class="price_tag">
                {{ product.price }}
              </span>
              x
              <span class="price_tag">
                {{ product.qty }}
              </span>
              =
              <span class="price_tag">
                {{ parseFloat(product.price * product.qty).toFixed(2) }}<span v-html="RUBLE"></span>
              </span>
            </div>
          <p id="total">ИТОГО: {{ this.totalPrice }}<span v-html="RUBLE"></span></p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="16" :md="14" :lg="12" :xl="10">
          <!--Stepper-->
          <el-row class="mt-4">
          <el-steps
            :active="activeStep"
            align-center
            finish-status="success">
            <el-step title="Personal Details" icon="el-icon-info"></el-step>
            <el-step title="Shipping" icon="el-icon-location"></el-step>
            <el-step title="Delivery / Payment" icon="el-icon-document"></el-step>
            <el-step title="Ordering" icon="el-icon-circle-check-outline"></el-step>
          </el-steps>
          </el-row>
          <!---------->
          <!--Form 1-->
          <el-row type="flex" justify="center" class="mt-5">
            <el-col :xs="22" :sm="18" :md="18" :lg="18" :xl="18">
            <div v-if="activeStep === 1">
              <el-form
                label-position="top"
                label-width="100px"
                status-icon
                ref="buyer"
                :rules="buyerFormRules"
                :model="buyer">
                <!--EMAIL-->
              <el-form-item label="Email" prop="email">
                <el-input type="email" v-model="buyer.email" auto-complete="on"></el-input>
              </el-form-item>
                <!--NAME-->
                <el-row>
                  <el-col :span="12" class="pr-1">
                    <el-form-item label="Имя" prop="firstname">
                      <el-input type="text" v-model="buyer.firstname" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="pl-1">
                    <el-form-item label="Фамилия" prop="lastname">
                      <el-input v-model="buyer.lastname"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--PHONE-->
                <el-form-item label="Телефон" prop="phone">
                <masked-input
                  v-model="buyer.phone"
                  class="el-input__inner"
                  required
                  mask="\+\7 (111) 111-11-11"
                  placeholder="Номер телефона"/>
                </el-form-item>
              </el-form>
            </div>
            </el-col>
          </el-row>
          <!---------->
          <!--Step 2-->
          <el-row type="flex" justify="center">
            <el-col :xs="22" :sm="18" :md="18" :lg="18" :xl="18">
            <div v-if="activeStep === 2">
              <el-form
                v-if="activeStep === 2"
                label-position="top"
                label-width="100px"
                status-icon
                ref="address"
                :rules="addressFormRules"
                :model="address">
                <!--COUNTRY-->
                <el-row type="flex">
                  <el-col :span="12" class="pr-1">
                    <el-form-item label="Страна" prop="country">
                      <el-input v-model="address.country"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--CITY-->
                  <el-col :span="12" class="pl-1">
                    <el-form-item label="Город" prop="city">
                      <el-input v-model="address.city"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--STREET-->
                <el-row>
                  <el-col :xs="16" :sm="18" :md="18" :lg="18" :xl="18" class="pr-1">
                    <el-form-item label="Улица" prop="street">
                      <el-input v-model="address.street"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--BUILD-->
                  <el-col :xs="8" :sm="6" :md="6" :lg="6" :xl="6" class="pl-1">
                    <el-form-item label="Дом" prop="build">
                      <el-input v-model="address.build"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex">
                <!--HOUSE/Apartment-->
                  <el-col :span="12" class="pr-1">
                    <el-form-item label="Квартира" prop="house">
                      <el-input v-model="address.house"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--POST CODE-->
                  <el-col :span="12" class="pl-1">
                    <el-form-item label="Почтовый индекс" prop="postCode">
                      <el-input v-model="address.postCode"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            </el-col>
          </el-row>
          <!---------->
          <!--Step 3-->
          <el-row type="flex" justify="center">
            <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
              <div v-if="activeStep === 3" id="checkout_form_3" class="selected_region">
                <h3 class="mb-1">
                  СПОСОБ ДОСТАВКИ
                  <el-tooltip placement="bottom" class="item">
                    <v-icon id="card_help" class="info--text mb-1 ml-1">live_help</v-icon>
                    <span slot="content">
                      На данный момент постоянная доставка осущестявляется только по России. <br>
                      Если вы находитесь в другой стране, то мы готовы рассмотреть Вашу заявку в индивидуальном плане, <br>
                      для этого свяжитесь с нами по телефону горячей линии
                      {{ this.$store.getters.companyInfo.contacts.phone }}
                    </span>
                  </el-tooltip>
                </h3>
                  <el-select
                    v-model="region"
                    @change="findDeliveryRegion"
                    no-data-text="Отсутвует"
                    no-match-text="Отсутвует"
                    filterable
                    size="large"
                    placeholder="Выберите регион">
                    <el-option
                      v-for="(regionCode, name) in RUS_REGIONS"
                      :key="regionCode"
                      :label="regionCode"
                      :value="name">
                    </el-option>
                  </el-select>
                  <el-radio-group v-model="delivery.method">
                    <el-radio
                      v-if="courier"
                      :label="DELIVERY_METHODS.courier.value"
                      border class="mt-2">{{ DELIVERY_METHODS.courier.label }}</el-radio>
                    <el-radio
                      v-if="delivery.prices.cdek"
                      :label="DELIVERY_METHODS.cdek.value"
                      border class="mt-2">
                      {{ DELIVERY_METHODS.cdek.label }} -<b>{{ delivery.prices.cdek }}</b>
                      <span v-html="RUBLE"></span>
                    </el-radio>
                    <el-radio
                      v-if="delivery.prices.pickpoint"
                      :label="DELIVERY_METHODS.pickpoint.value"
                      border class="mt-2">
                      {{ DELIVERY_METHODS.pickpoint.label }} - <b>{{ delivery.prices.pickpoint }}</b>
                      <span v-html="RUBLE"></span>
                    </el-radio>
                    <el-radio
                      v-if="delivery.prices.postrf"
                      :label="DELIVERY_METHODS.postrf.value"
                      border class="mt-2">
                      {{ DELIVERY_METHODS.postrf.label }} - <b>{{ delivery.prices.postrf }}</b>
                      <span v-html="RUBLE"></span>
                    </el-radio>
                  </el-radio-group>
                <div class="mb-4">
                  <h4 v-if="delivery.method === this.DELIVERY_METHODS.courier.value" class="mt-4">
                    Бесплатная доставка по Новосибирску!*
                    <v-icon class="ml-2 info--text">directions_bike</v-icon><br>
                    <span class="additional_info">
                      * Курьерская доставка доступна только по г. Новосибирск<br>
                      ** Академгородок, Шлюз, Первомайский р-н - 200р
                    </span>
                  </h4>
                  <h4 v-if="delivery.method === DELIVERY_METHODS.cdek.value" class="mt-4">
                  </h4>
                  <h4 v-if="delivery.method === DELIVERY_METHODS.postrf.value" class="mt-4">
                    Оплата за доставку <v-icon class="info--text">train</v-icon> при получении!
                  </h4>
                  <h4 v-if="delivery.method === DELIVERY_METHODS.pickpoint.value" class="mt-4">
                    Оплата за доставку <v-icon class="info--text">touch_app</v-icon> при получении!
                  </h4>
                  <v-divider></v-divider>
                  <h3 class="mb-1 mt-4">
                    СПОСОБ ОПЛАТЫ
                  </h3>
                  <!--<div>-->
                  <!--<el-radio v-model="payment.method" :label="payment.online" border class="mt-1"></el-radio>-->
                  <!--<el-radio v-model="payment.method" :label="payment.onReceipt" border class="mt-1"></el-radio>-->
                  <!--</div>-->
                  <!--<h4 v-if="payment.method === payment.online" class="mt-4">-->
                  <!--<v-icon class="info&#45;&#45;text">credit_card</v-icon><br>-->
                  <!--На данный момент мы принимаем оплату только с помощью сервиса PayPal-->
                  <!--</h4>-->
                  <!--<h4 v-if="delivery.method === this.DELIVERY_METHODS.courier && payment.method === payment.onReceipt" class="mt-4">-->
                  <!--<v-icon class="info&#45;&#45;text">monetization_on</v-icon><br>-->
                  <!--Оплата курьеру возможна только наличными-->
                  <!--</h4>-->
                  <!--<h4 v-if="delivery.method === this.DELIVERY_METHODS.russianPost && payment.method === payment.onReceipt"-->
                  <!--class="mt-4">-->
                  <!--<v-icon class="info&#45;&#45;text">assignment</v-icon><br>-->
                  <!--Оплата наложенным платежем-->
                  <!--</h4>-->
                  <!--<h4 v-if="delivery.method === this.DELIVERY_METHODS.pickPoint && payment.method === payment.onReceipt" class="mt-4">-->
                  <!--<v-icon class="info&#45;&#45;text">donut_small</v-icon><br>-->
                  <!--Услуги PickPoint оплачиваются при получении-->
                  <!--</h4>-->
                  <v-divider></v-divider>
                </div>
              </div>
            </el-col>
          </el-row>
          <!---------->
          <!--Step 4-->
          <el-row type="flex" justify="center">
              <el-col :xs="22" :sm="18" :md="18" :lg="18" :xl="18">
                <div v-if="activeStep === 4" class="white--text">
                  <p>Нажимая оформить вы соглашаетесь с пользовательским соглашением
                    <a target="_blank"
                       class="secondary--text"
                       href="https://misterio.shop/userAgreement">
                      пользовательским соглашением
                    </a>
                  </p>
                  <el-button class="mb-4" @click="checkout" type="danger">
                    ОФОРМИТЬ
                  </el-button>
                </div>
              </el-col>
            </el-row>
            <el-button @click="prevStep" v-if="activeStep !== 1">
              Назад
            </el-button>
            <el-button
              v-if="activeStep !== 4"
              id="next_step"
              @click="nextStep"
              :type="isValidBuyer ? 'danger' : 'info'"
              :disabled="!isValidBuyer || (activeStep === 2 && !isValidAddress)">
              Вперед
             </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </span>
</template>

<script>
import UserAgreement from '../info/UserAgreement'

export default {
  name: 'Checkout',
  components: {UserAgreement},
  props: ['checkoutObj', 'type'],
  data () {
    let notEmptyString = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Поле необходимо заполнить'))
      } else {
        callback()
      }
    }
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Введите адрес вашей эл. почты'))
      }
      setTimeout(() => {
        if (!this.isValidEmail(value)) {
          callback(new Error('Некорректная эл. почта'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      region: '',
      courier: false, // only 54 region
      delivery: {
        method: '',
        price: '',
        prices: {
          cdek: '',
          pickpoint: '',
          postrf: ''
        }
      },
      payment: {
        method: 'bank_card',
        type: ''
      },
      dialogFormVisible: false,
      activeStep: 1,
      buyer: {
        userId: this.$store.getters.userId,
        firstname: 'ALEXEY',
        lastname: 'AZAROV',
        email: 'smelayapandagm@gmail.com',
        phone: '89994677857'
      },
      address: {
        country: 'Россия',
        city: 'Новосибирск',
        street: 'Сиреневая',
        build: '31',
        house: '65',
        postCode: '630030'
      },
      buyerFormRules: {
        firstname: [{validator: notEmptyString, trigger: 'blur'}],
        lastname: [{validator: notEmptyString, trigger: 'blur'}],
        email: [{validator: checkEmail, trigger: 'blur'}]
      },
      addressFormRules: {
        country: [{validator: notEmptyString, trigger: 'blur'}],
        city: [{validator: notEmptyString, trigger: 'blur'}],
        street: [{validator: notEmptyString, trigger: 'blur'}],
        build: [{validator: notEmptyString, trigger: 'blur'}],
        house: [{validator: notEmptyString, trigger: 'blur'}],
        postCode: [{validator: notEmptyString, trigger: 'blur'}]
      }
    }
  },
  methods: {
    findDeliveryRegion (regionCode) {
      let prices = this.deliveryDictionary.find(el => el.code === Number(regionCode))
      if (prices) {
        this.delivery.prices = prices
      } else {
        this.delivery.prices = {cdek: '', pickpoint: '', postrf: ''}
        this.courier = false
      }
      if (Number(regionCode) === 54) this.courier = true
    },
    clickBuy () {
      this.dialogFormVisible = true
      this.$store.dispatch('USER_EVENT', 'Купить товар')
    },
    nextStep () {
      if (this.activeStep < 4) this.activeStep++
      this.$store.dispatch('USER_EVENT', `Шаг: ${this.activeStep}`)
    },
    prevStep () {
      if (this.activeStep > 1) {
        this.activeStep--
        this.$store.dispatch('USER_EVENT', `Шаг: ${this.activeStep}`)
      }
    },
    isValidEmail () {
      return /^\S+@\S+\.\S+$/.test(this.buyer.email)
    },
    isValidPhone () {
      return this.buyer.phone.replace(/[^0-9]/g, '').length === 11
    },
    checkout () {
      this.orderIsProcessed = true
      let lightProducts = []
      for (let p of this.orderProducts) {
        // minimum info
        let sp = {}
        sp.productId = p.productId
        sp.SKU = p.SKU
        sp.qty = p.qty
        sp.title = p.title
        sp.price = p.price
        sp.currency = 'RUB'
        lightProducts.push(sp)
      }
      let order = {
        amount: {
          final: {
            value: Number,
            currency: 'RUB'
          },
          products: {
            value: parseFloat(this.totalPrice).toFixed(2),
            currency: 'RUB'
          },
          delivery: {
            value: '',
            currency: 'RUB'
          },
          discount: {
            value: Number,
            currency: '',
            type: 'online',
            dim: 'percent'
          }
        },
        payment: {
          status: '',
          full: true,
          type: 'cash' | 'online' | 'terminal',
          method: 'cash' | 'bank_card',
          check: {}
        },
        delivery: {
          method: this.delivery.method,
          address: this.address
        },
        status: 'created',
        history: {'created': new Date()},
        buyer: this.buyer
      }
      this.$store.dispatch('checkout', order)
      this.$store.dispatch('USER_EVENT', 'Успешная покупка!')
    }
  },
  computed: {
    isValidBuyer () {
      return this.isValidPhone() && this.isValidEmail() && this.buyer.firstname && this.buyer.lastname
    },
    isValidAddress () {
      return this.address.country && this.address.city && this.address.build &&
          this.address.street && this.address.house && this.address.postCode
    },
    orderProducts () {
      let checkoutObj = this.checkoutObj
      let cart = this.$store.getters.user.cart
      let products = []
      checkoutObj.forEach(el => {
        let product = cart[el.productId]
        product.qty = el.qty
        products.push(product)
      })
      return products
    },
    totalPrice () {
      let total = 0
      let products = this.orderProducts
      for (let p of products) {
        total += p.qty * p.price
      }
      return total
    },
    deliveryDictionary () {
      return this.$store.getters.dictionaries['delivery']
    }
  }
}
</script>

<style scoped lang="scss">
  .order_info {
    font-size: 16px;
    margin-bottom: 20px;
    padding-top: 0;
  }

  #my_order_wrap {
    padding: 30px;
  }

  #my_order {
    background: $color-secondary-dark;
    color: white;
    border-radius: 3px;
  }

  #my_order_title {
    font-weight: 600;
    padding-top: 15px;
    padding-bottom: 15px;
    box-shadow: 1px 1px 1px rgba(13, 13, 13, 0.1), 0 5px 5px rgba(13, 13, 13, 0.1);
  }

  .product_title {
    font-size: 12px;
  }

  #total {
    font-weight: 600;
    padding-bottom: 20px;
  }

  #checkout {
    color: white;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-top: -20px;
    margin-bottom: 30px;
  }

  #checkout:after {
    content: '';
    display: block;
    width: 60px;
    margin: 5px auto;
    border-bottom: 2px solid white;
  }

  .price_tag {
    color: white;
    font-size: 12px;
    background: $color-primary-light;
    padding: 4px 10px;
    border-radius: 4px;
    margin-left: 2px;
    margin-right: 5px;
  }

  .additional_info {
    font-size: 12px;
    color: $color-info;
    font-weight: 300;
  }

  #checkout_form_3 {
    color: white;
  }

  @media only screen and (max-width: $xs-screen) {
    #my_order_wrap {
      padding: 10px;
    }
  }
</style>
