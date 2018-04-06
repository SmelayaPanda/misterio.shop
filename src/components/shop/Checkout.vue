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
      id="checkoutDialog"
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
        <el-col :xs="24" :sm="24" :md="9" :lg="8" :xl="7" class="mt-3 pl-4 pr-4 mb-4">
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
                {{ parseFloat(product.price * product.qty).toFixed(2) }} &#8381;
              </span>
            </div>
          <p id="total">ИТОГО: {{ this.totalPrice }} &#8381;</p>
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
            <el-col :span="18">
            <div class="form_1" v-if="activeStep === 1">
              <el-form
                label-position="top"
                label-width="100px"
                status-icon
                ref="form_1"
                :rules="formRules_1"
                :model="form_1">
                <!--EMAIL-->
              <el-form-item label="Email" prop="email">
                <el-input type="email" v-model="form_1.email" auto-complete="on"></el-input>
              </el-form-item>
                <!--NAME-->
                <el-row>
                  <el-col :span="12" class="pr-1">
                    <el-form-item label="Имя" prop="firstname">
                      <el-input type="text" v-model="form_1.firstname" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="pl-1">
                    <el-form-item label="Фамилия" prop="lastname">
                      <el-input v-model="form_1.lastname"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--PHONE-->
                <el-form-item label="Телефон" prop="phone">
                <masked-input
                  v-model="form_1.phone"
                  class="el-input__inner"
                  required
                  mask="\+\7 (111) 111-11-11"
                  placeholder="Phone number"/>
                </el-form-item>
              </el-form>
            </div>
            </el-col>
          </el-row>
          <!---------->
          <!--Step 2-->
          <el-row type="flex" justify="center">
            <el-col :span="18">
            <div class="form_2" v-if="activeStep === 2">
              <el-form
                v-if="activeStep === 2"
                label-position="top"
                label-width="100px"
                status-icon
                ref="form_2"
                :rules="formRules_2"
                :model="form_2">
                <!--COUNTRY-->
                <el-row type="flex">
                  <el-col :span="12" class="pr-1">
                    <el-form-item label="Страна" prop="country">
                      <el-input v-model="form_2.country"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--CITY-->
                  <el-col :span="12" class="pl-1">
                    <el-form-item label="Город" prop="city">
                      <el-input v-model="form_2.city"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--STREET-->
                <el-row>
                  <el-col :span="18" class="pr-1">
                    <el-form-item label="Улица" prop="street">
                      <el-input v-model="form_2.street"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--BUILD-->
                  <el-col :span="6" class="pr-1">
                    <el-form-item label="Дом" prop="build">
                      <el-input v-model="form_2.build"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex">
                <!--HOUSE/Apartment-->
                  <el-col :span="12" class="pr-1">
                    <el-form-item label="Квартира" prop="house">
                      <el-input v-model="form_2.house"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--POST CODE-->
                  <el-col :span="12" class="pl-1">
                    <el-form-item label="Почтовый код" prop="postCode">
                      <el-input v-model="form_2.postCode"></el-input>
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
            <el-col :span="18">
              <div id="checkout_form_3" v-if="activeStep === 3">
                <h3 class="mb-1">
                  СПОСОБ ДОСТАВКИ
                </h3>
                  <div>
                    <el-radio v-model="deliveryMethod" :label="delivery.courier" name="Привет" border></el-radio>
                    <el-radio v-model="deliveryMethod" :label="delivery.russianPost" border></el-radio>
                    <el-radio v-model="deliveryMethod" :label="delivery.pickPoint" border></el-radio>
                  </div>
                <div class="mb-4">
                  <h4 v-if="deliveryMethod === delivery.courier" class="mt-4">
                    Бесплатная доставка по Новосибирску!
                    <v-icon class="ml-2 info--text">directions_bike</v-icon>
                  </h4>
                  <h4 v-if="deliveryMethod === delivery.russianPost" class="mt-4">
                    Оплата за доставку <v-icon class="info--text">train</v-icon> при получении!
                  </h4>
                  <h4 v-if="deliveryMethod === delivery.pickPoint" class="mt-4">
                    Оплата за доставку <v-icon class="info--text">touch_app</v-icon> при получении!
                  </h4>
                  <v-divider></v-divider>
                  <h3 class="mb-1 mt-4">
                    СПОСОБ ОПЛАТЫ
                  </h3>
                  <div>
                    <el-radio v-model="paymentMethod" :label="payment.online" border></el-radio>
                    <el-radio v-model="paymentMethod" :label="payment.onReceipt" border></el-radio>
                  </div>
                  <h4 v-if="paymentMethod === payment.online" class="mt-4">
                    <v-icon class="info--text">credit_card</v-icon><br>
                    На данный момент мы принимаем оплату только с помощью сервиса PayPal
                  </h4>
                  <h4 v-if="deliveryMethod === delivery.courier && paymentMethod === payment.onReceipt" class="mt-4">
                    <v-icon class="info--text">monetization_on</v-icon><br>
                    Оплата курьеру возможна только наличными
                  </h4>
                  <h4 v-if="deliveryMethod === delivery.russianPost && paymentMethod === payment.onReceipt"
                      class="mt-4">
                    <v-icon class="info--text">assignment</v-icon><br>
                    Оплата наложенным платежем
                  </h4>
                  <h4 v-if="deliveryMethod === delivery.pickPoint && paymentMethod === payment.onReceipt" class="mt-4">
                    <v-icon class="info--text">donut_small</v-icon><br>
                    Услуги PickPoint оплачиваются при получении
                  </h4>
                  <v-divider></v-divider>
                </div>
              </div>
            </el-col>
          </el-row>
          <!---------->
          <!--Step 4-->
          <el-row type="flex" justify="center">
              <el-col :span="18">
                <div class="form_4 white--text" v-if="activeStep === 4">
                  <p>Нажимая оформить вы соглашаетесь с пользовательским соглашением
                    <!--TODO: fix address-->
                    <a target="_blank"
                       class="secondary--text"
                       href="http://localhost:8080/userAgreement">
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
              :type="isValidForm_1 ? 'danger' : 'info'"
              :disabled="!isValidForm_1 || (activeStep === 2 && !isValidForm_2)">
              Вперед
             </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </span>
</template>

<script>

export default {
  name: 'Checkout',
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
      deliveryMethod: 'Курьер',
      delivery: {
        // Very bad! replace
        courier: 'Курьер', // TODO: bad idea store cyrillic values
        russianPost: 'Почта России',
        pickPoint: 'PickPoint'
      },
      paymentMethod: 'При получении',
      payment: {
        online: 'Онлайн',
        onReceipt: 'При получении'
      },
      dialogFormVisible: false,
      activeStep: 1,
      form_1: {
        firstname: 'Alexey',
        lastname: 'Azarov',
        email: 'smelayapanda@mail.ru',
        phone: '999 232 32 3233'
      },
      form_2: {
        country: 'Russia',
        city: 'Novosibirsk',
        street: 'Sirenevaya',
        build: '31',
        house: '65',
        postCode: '630090'
      },
      formRules_1: {
        firstname: [
          {validator: notEmptyString, trigger: 'blur'}
        ],
        lastname: [
          {validator: notEmptyString, trigger: 'blur'}
        ],
        email: [
          {validator: checkEmail, trigger: 'blur'}
        ]
      },
      formRules_2: {
        country: [
          {validator: notEmptyString, trigger: 'blur'}
        ],
        city: [
          {validator: notEmptyString, trigger: 'blur'}
        ],
        street: [
          {validator: notEmptyString, trigger: 'blur'}
        ],
        build: [
          {validator: notEmptyString, trigger: 'blur'}
        ],
        house: [
          {validator: notEmptyString, trigger: 'blur'}
        ],
        postCode: [
          {validator: notEmptyString, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    clickBuy () {
      this.dialogFormVisible = true
      this.$store.dispatch('USER_EVENT', 'Купить товар')
    },
    nextStep () {
      if (this.activeStep < 4) {
        this.activeStep++
      }
      this.$store.dispatch('USER_EVENT', `Шаг: ${this.activeStep}`)
    },
    prevStep () {
      if (this.activeStep > 1) {
        this.activeStep--
        this.$store.dispatch('USER_EVENT', `Шаг: ${this.activeStep}`)
      }
    },
    isValidEmail () {
      return /^\S+@\S+\.\S+$/.test(this.form_1.email)
    },
    isValidPhone () {
      return this.form_1.phone.replace(/[^0-9]/g, '').length === 11
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
        products: lightProducts,
        buyer: this.form_1,
        shipping: this.form_2,
        checkoutDate: new Date(),
        deliveryMethod: this.deliveryMethod,
        paymentMethod: this.paymentMethod,
        status: this.paymentMethod === this.payment.online ? 'payPending' : 'sentPending',
        totalPrice: parseFloat(this.totalPrice).toFixed(2),
        currency: 'RUB'
      }
      this.$store.dispatch('checkout', order)
      this.$store.dispatch('USER_EVENT', 'Успешная покупка!')
    }
  },
  computed: {
    isValidForm_1 () {
      return this.isValidPhone() && this.isValidEmail() && this.form_1.firstname && this.form_1.lastname
    },
    isValidForm_2 () {
      return this.form_2.country && this.form_2.city && this.form_2.street && this.form_2.house && this.form_2.postCode
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

  #checkout_form_3 {
    color: white;
  }
</style>
