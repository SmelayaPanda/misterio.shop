<!--
  order: {
    amount: {
      final: {
        value: String(0.00),
        currency: 'RUB',
      },
      products: {
        value: String(0.00),
        currency: 'RUB'
      },
      delivery: {
        value: String(0.00),
        currency: 'RUB'
      },
      discount: {
        value: String(0.00),
        currency: 'RUB',
      }
    },
    status: 'created' | 'pending' | 'sent' | 'delivered’ | 'refused’,
    history: {
      created: Date,
      pending: Date,
      sent: Date,
      delivered: Date,
      refused: Date
    },
    payment: {
      status: 'none' | 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled'
      full: Boolean(true = full, false = part)
      type: 'receipt' | 'online'
      method: 'cash' | 'bank_card'  ('sberbank' | 'yandex_money' | 'qiwi' | 'alfabank' | 'webmoney' | 'apple_pay' | 'mobile_balance' | 'installments')
      history: {
        pending: Date,
        waiting_for_capture: Date,
        succeeded: Date,
        canceled: Date
      },
      notification: { // Yandex Payment Response Obj
        pending: Object,
        waiting_for_capture: Object,
        succeeded: Object,
        canceled: Object
      }
    },
    delivery: {
      method: 'courier' | 'cdek' | 'pickpoint' | 'postrf',
      region: String,
      district: String,
      address: {
        country: String,
        city: String,
        street: String,
        build: String,
        house: String,
        postCode: String
      }
    },
    products: [{
        id: String,
        SKU: String,
        title: String,
        price: String,
        currency: String,
        qty: String
      }
    ],
    buyer: {
      userId: String,
      firstname: String,
      lastname: String,
      email: String,
      phone: String
    },
    comments: {
      user: String,
      admin: String
    }
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
            <div class="order_info"
                 v-for="product in orderProducts"
                 :key="product.productId">
              <span class="product_title">{{ product.title }}:</span><br>
              <span class="price_tag">{{ product.price | price }}</span>x
              <span class="price_tag">{{ product.qty }}</span>=
              <span class="price_tag">
                {{ parseFloat(product.price * product.qty).toFixed(2) }}<span v-html="RUB"></span>
              </span>
            </div>
            <div v-if="discount" class="mb-2">
              <span class="product_title">Скидка:</span>
              <span class="price_tag">- {{ totalDiscount }}<span v-html="RUB"></span></span>
            </div>
            <!-- DELIVERY COAST -->
            <div v-if="delivery.method" class="mb-3">
              <span class="product_title">
                Доставка ({{ DELIVERY_METHODS[delivery.method].label }}):
              </span>
              <span v-if="totalDeliveryPrice" class="price_tag">
                {{ totalDeliveryPrice }}<span v-html="RUB"></span>
              </span>
              <span v-else class="product_title">бесплатно</span>
            </div>
            <p id="total">ИТОГО: {{ totalOrderPrice }}<span v-html="RUB"></span></p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="16" :md="14" :lg="12" :xl="10">
          <!--Stepper-->
          <el-row class="mt-4">
          <el-steps
            :active="activeStep"
            align-center
            finish-status="success">
            <el-step title="Ваши контакты" icon="el-icon-info"></el-step>
            <el-step title="Адрес" icon="el-icon-location"></el-step>
            <el-step title="Доставка"><v-icon slot="icon" class="white--text">train</v-icon></el-step>
            <el-step title="Оплата" icon="el-icon-document"></el-step>
            <el-step title="Оформление" icon="el-icon-circle-check-outline"></el-step>
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
              <div v-if="activeStep === 3" id="delivery_form">
                  <el-select
                    v-model="delivery.region"
                    @change="changeDeliveryRegion"
                    no-data-text="Отсутвует"
                    no-match-text="Отсутвует"
                    filterable
                    size="large"
                    class="mb-3"
                    placeholder="Выберите регион">
                    <el-option
                      v-for="(regionName, code) in RUS_REGIONS"
                      :key="regionName"
                      :label="regionName"
                      :value="code">
                    </el-option>
                  </el-select>
                  <el-tooltip placement="bottom" class="item">
                    <v-icon small id="delivery_help">live_help</v-icon>
                    <span slot="content">
                      На данный момент постоянная доставка осущестявляется только по России. <br>
                      Если вы находитесь в другой стране, то мы готовы рассмотреть Вашу заявку в индивидуальном плане,<br>
                      для этого свяжитесь с нами по телефону горячей линии {{ this.$store.getters.companyInfo.contacts.phone }}
                    </span>
                  </el-tooltip> <br>
                  <p v-if="delivery.region && totalProductsPrice > 3000">
                    Бесплатная доставка любым выбранным способом! <br>
                    <span style="font-size: 12px;">* действительно при покупке от 3000 рублей</span>
                  </p>
                  <p v-if="delivery.region && Number(delivery.region) !== 54 &&
                          !delivery.prices.cdek && !delivery.prices.pickpoint && !delivery.prices.postrf"
                     class="mt-2">
                    К сожалению доставка в Ваш регион на данный момент не осуществляется.
                    Для уточнения свяжитесь с нами по телефону горячей линии {{ this.$store.getters.companyInfo.contacts.phone }}
                  </p>
                  <el-radio-group @change="changeDeliveryMethod" v-model="delivery.method" class="mb-4">
                    <el-radio
                      v-if="Number(delivery.region) === 54"
                      :label="DELIVERY_METHODS.courier.value"
                      border class="mt-2">{{ DELIVERY_METHODS.courier.label }}</el-radio>
                    <el-radio
                      v-if="delivery.prices.cdek"
                      :label="DELIVERY_METHODS.cdek.value"
                      border class="mt-2">
                      {{ DELIVERY_METHODS.cdek.label }}
                      <span v-if="totalDeliveryPrice">
                        - <b>{{ delivery.prices.cdek }}</b><span v-html="RUB"></span>
                      </span>
                    </el-radio>
                    <el-radio
                      v-if="delivery.prices.pickpoint"
                      :label="DELIVERY_METHODS.pickpoint.value"
                      border class="mt-2">
                      {{ DELIVERY_METHODS.pickpoint.label }}
                      <span v-if="totalDeliveryPrice">
                        - <b>{{ delivery.prices.pickpoint }}</b><span v-html="RUB"></span>
                      </span>
                    </el-radio>
                    <el-radio
                      v-if="delivery.prices.postrf"
                      :label="DELIVERY_METHODS.postrf.value"
                      border class="mt-2">
                      {{ DELIVERY_METHODS.postrf.label }}
                      <span v-if="totalDeliveryPrice">
                        - <b>{{ delivery.prices.postrf }}</b><span v-html="RUB"></span>
                      </span>
                    </el-radio>
                  </el-radio-group>
                  <br>
                  <el-select
                    v-if="delivery.method === DELIVERY_METHODS.courier.value"
                    v-model="delivery.district"
                    @change="changeCourierDistrict"
                    no-data-text="Отсутвует"
                    no-match-text="Отсутвует"
                    filterable
                    size="large"
                    class="mb-3 mr-3"
                    placeholder="Выберите регион">
                    <el-option
                      v-for="(districtName, code) in NSK_DISTRICTS"
                      :key="districtName"
                      :label="districtName"
                      :value="code"
                      :disabled="!districtWithDelivery(code)">
                    </el-option>
                  </el-select>
              </div>
            </el-col>
          </el-row>
          <!---------->
          <!--Step 4-->
          <el-row type="flex" justify="center">
              <el-col :xs="22" :sm="18" :md="18" :lg="18" :xl="18">
                <div v-if="activeStep === 4" id="payment_form">
                  <h3 class="mb-1">
                    ОПЛАТА
                  </h3>
                  <el-radio-group @change="changePaymentType" v-model="payment.type" class="mb-4">
                    <el-radio :label="PAYMENT_TYPES.online.value" border class="mt-1">
                      {{ PAYMENT_TYPES.online.label }}
                    </el-radio>
                    <el-radio v-if="delivery.method !== DELIVERY_METHODS.cdek.value &&
                                    delivery.method !== DELIVERY_METHODS.pickpoint.value"
                              :label="PAYMENT_TYPES.receipt.value" border class="mt-1">
                      {{ PAYMENT_TYPES.receipt.label }}
                    </el-radio>
                  </el-radio-group>
                  <p v-if="payment.type === PAYMENT_TYPES.online.value">
                    <b>Скидка 3% на любой товар!</b><br>
                    При покупке онлайн на сайте!<br>
                  </p>
                  <h3 class="mb-1">
                    СПОСОБ ОПЛАТЫ
                  </h3>
                  <el-radio-group v-if="payment.type" v-model="payment.method" class="mb-4">
                    <el-radio :label="PAYMENT_METHODS.bank_card.value" border class="mt-1">
                      {{ PAYMENT_METHODS.bank_card.label }}
                    </el-radio>
                    <el-radio
                      v-if="payment.type !== PAYMENT_TYPES.online.value"
                      :label="PAYMENT_METHODS.cash.value" border class="mt-1">
                      {{ PAYMENT_METHODS.cash.label }}
                    </el-radio>
                  </el-radio-group>
                </div>
              </el-col>
          </el-row>
          <!---------->
          <!--Step 5-->
          <el-row type="flex" justify="center">
              <el-col :xs="22" :sm="18" :md="18" :lg="18" :xl="18">
                <div v-if="activeStep === 5" class="white--text">
                  <p>Нажимая оформить вы соглашаетесь с
                    <a target="_blank" class="secondary--text" href="https://misterio.shop/userAgreement">офертой</a>
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
              v-if="activeStep !== 5"
              @click="nextStep"
              id="next_step"
              :type="validCheckoutStep ? 'danger' : 'info'"
              :disabled="!validCheckoutStep">
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
      dialogFormVisible: false,
      activeStep: 1,
      delivery: {
        region: '',
        district: '',
        method: '',
        prices: {
          cdek: '',
          pickpoint: '',
          postrf: '',
          courier: '' // only 54 region
        }
      },
      payment: {
        type: '',
        method: ''
      },
      discount: '',
      buyer: {
        firstname: '',
        lastname: '',
        email: '',
        phone: ''
      },
      address: {
        country: '',
        city: '',
        street: '',
        build: '',
        house: '',
        postCode: ''
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
    changeDeliveryRegion (regionCode) {
      this.delivery.method = ''
      let prices = this.deliveryDictionary.find(el => el.code === Number(regionCode))
      if (prices) {
        this.delivery.prices = prices
      } else {
        this.delivery.prices = {cdek: '', pickpoint: '', postrf: ''}
      }
    },
    changeDeliveryMethod (method) {
      if (method === this.DELIVERY_METHODS.courier.value && !this.delivery.district) {
        let prices = this.delivery.prices
        prices.courier = 0
        this.delivery.prices = {...prices}
      }
    },
    changeCourierDistrict (districtCode) {
      let courier = this.courierDictionary.find(el => el.code === Number(districtCode))
      let prices = this.delivery.prices
      prices.courier = courier.price
      this.delivery.prices = {...prices}
    },
    districtWithDelivery (districtCode) {
      let courier = this.courierDictionary.find(el => el.code === Number(districtCode))
      if (courier) return courier.price > 0
      else return false
    },
    changePaymentType (type) {
      this.payment.method = ''
      if (type === this.PAYMENT_TYPES.online.value) {
        this.discount = this.DISCOUNT_TYPES.online
      } else {
        this.discount = ''
      }
    },
    clickBuy () {
      this.dialogFormVisible = true
      this.$store.dispatch('USER_EVENT', 'Купить товар')
    },
    nextStep () {
      if (this.activeStep < 5) this.activeStep++
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
      this.buyer.userId = this.$store.getters.user.uid
      let products = []
      this.orderProducts.forEach(el => {
        products.push({
          id: el.productId,
          SKU: el.SKU,
          qty: el.qty,
          title: el.title,
          price: parseFloat(el.price).toFixed(2),
          currency: 'RUB'
        })
      })
      let status
      let history
      if (this.PAYMENT_TYPES.receipt.value === this.payment.type) {
        status = this.ORDER_STATUSES.pending.value
        history = {created: new Date(), pending: new Date()}
      } else {
        status = this.ORDER_STATUSES.created.value
        history = {created: new Date()}
      }

      let order = {
        amount: {
          final: {value: parseFloat(this.totalOrderPrice).toFixed(2), currency: 'RUB'},
          discount: {value: parseFloat(this.totalDiscount).toFixed(2), currency: 'RUB'},
          products: {value: parseFloat(this.totalProductsPrice).toFixed(2), currency: 'RUB'},
          delivery: {value: parseFloat(this.totalDeliveryPrice).toFixed(2), currency: 'RUB'}
        },
        payment: {
          status: this.PAYMENT_STATUSES.none.value,
          history: {},
          full: true,
          type: this.payment.type,
          method: this.payment.method,
          notification: {}
        },
        delivery: {
          method: this.delivery.method,
          region: this.delivery.region,
          district: this.delivery.district ? this.delivery.district : '',
          address: this.address
        },
        products: products,
        status: status,
        history: history,
        buyer: this.buyer,
        comments: {user: '', admin: ''}
      }
      this.$store.dispatch('checkout', order)
      this.$store.dispatch('USER_EVENT', 'Успешная покупка!')
    }
  },
  computed: {
    isValidBuyerData () {
      return this.isValidPhone() && this.isValidEmail() && this.buyer.firstname && this.buyer.lastname
    },
    isValidAddress () {
      return this.address.country && this.address.city && this.address.build &&
          this.address.street && this.address.house && this.address.postCode
    },
    validCheckoutStep () {
      if (this.activeStep === 1) return this.isValidBuyerData
      if (this.activeStep === 2) return this.isValidAddress
      if (this.activeStep === 3) {
        if (Number(this.delivery.region) === 54) {
          return this.delivery.region && this.delivery.district && this.delivery.method
        } else {
          return this.delivery.region && this.delivery.method
        }
      }
      if (this.activeStep === 4) return this.payment.type && this.payment.method
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
    totalOrderPrice () {
      return this.totalProductsPrice - this.totalDiscount + this.totalDeliveryPrice
    },
    totalProductsPrice () {
      let products = this.orderProducts
      let total = 0
      products.forEach(el => {
        total += el.qty * el.price
      })
      return total
    },
    totalDiscount () {
      if (!this.discount) {
        return 0
      }
      let discount = 0
      if (this.discount.dim === 'percent') {
        discount = this.totalProductsPrice * this.discount.value / 100
      } else if (this.discount.dim === 'money') {
        discount = this.totalProductsPrice - this.discount.value
      }
      return discount
    },
    totalDeliveryPrice () {
      return this.delivery.method && this.totalProductsPrice < 3000 ? this.delivery.prices[this.delivery.method] : 0
    },
    deliveryDictionary () {
      return this.$store.getters.dictionaries['delivery']
    },
    courierDictionary () {
      return this.$store.getters.dictionaries['courier']
    }
  }
}
</script>

<style scoped lang="scss">
  .order_info {
    font-size: 16px;
    margin-bottom: 14px;
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

  #delivery_form,
  #payment_form {
    color: white;
  }

  #delivery_help {
    margin-top: -42px;
    margin-left: 2px;
    color: $color-info;
  }

  #delivery_help:hover,
  #delivery_help:active {
    cursor: help;
  }

  @media only screen and (max-width: $xs-screen) {
    #my_order_wrap {
      padding: 10px;
    }
  }
</style>
