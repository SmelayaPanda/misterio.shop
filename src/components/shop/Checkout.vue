<template>
  <span style="text-align: center">
    <el-button size="small"
               type="primary"
               @click="clickBuy">
      {{ btnName }}
    </el-button>
    <el-dialog title="CHECKOUT"
               v-if="orderProducts"
               width="100%"
               :visible.sync="dialogFormVisible"
               :fullscreen="true">
      <el-row type="flex" justify="center" style="flex-wrap: wrap">
                <!--ITEMS INFO-->
        <el-col :xs="24" :sm="24" :md="9" :lg="8" :xl="7" class="mt-3 pl-4 pr-4 mb-4">
          <el-card>
            <div slot="header" class="clearfix">
            <h3>
              My order
            </h3>
            </div>
          <div class="order_info"
               v-for="product in orderProducts"
               :key="product.productId"
          >
            <span style="font-weight: bold;">{{ product.title }}: </span><br>
            <el-tag>{{ product.price }}</el-tag>
            x
            <el-tag>{{ product.qty }}</el-tag>
            =
            <el-tag class="mb-2">{{ parseFloat(product.price * product.qty).toFixed(2) }} {{ product.currency }}</el-tag>
          </div>
          <b class="success--text">Total: {{ this.totalPrice }} RUB</b>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="16" :md="14" :lg="12" :xl="10">
          <!--Stepper-->
          <el-row class="mt-4">
          <el-steps :active="activeStep"
                    align-center
                    finish-status="success"
          >
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
              <el-form label-position="top"
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
                    <el-form-item label="Firstname" prop="firstname">
                      <el-input type="text" v-model="form_1.firstname" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" class="pl-1">
                    <el-form-item label="Last name" prop="lastname">
                      <el-input v-model="form_1.lastname"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--PHONE-->
                <el-form-item label="Phone" prop="phone">
                <masked-input v-model="form_1.phone"
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
              <el-form label-position="top"
                       label-width="100px"
                       status-icon
                       ref="form_2"
                       :rules="formRules_2"
                       v-if="activeStep === 2"
                       :model="form_2">
                <!--COUNTRY-->
                <el-row type="flex">
                  <el-col :span="12" class="pr-1">
                    <el-form-item label="Coutry" prop="country">
                      <el-input v-model="form_2.country"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--CITY-->
                  <el-col :span="12" class="pl-1">
                    <el-form-item label="City" prop="city">
                      <el-input v-model="form_2.city"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--STREET-->
                <el-row>
                  <el-col :span="18" class="pr-1">
                    <el-form-item label="Street" prop="street">
                      <el-input v-model="form_2.street"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--BUILD-->
                  <el-col :span="6" class="pr-1">
                    <el-form-item label="Build" prop="build">
                      <el-input v-model="form_2.build"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex">
                <!--HOUSE/Apartment-->
                  <el-col :span="12" class="pr-1">
                    <el-form-item label="House/Apartment" prop="house">
                      <el-input v-model="form_2.house"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--POST CODE-->
                  <el-col :span="12" class="pl-1">
                    <el-form-item label="Post code" prop="postCode">
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
              <div class="form_3" v-if="activeStep === 3">
                <h3 class="mb-1">DELIVERY METHOD</h3>
                  <div>
                    <el-radio v-model="deliveryMethod" :label="delivery.courier" border></el-radio>
                    <el-radio v-model="deliveryMethod" :label="delivery.russianPost" border></el-radio>
                    <el-radio v-model="deliveryMethod" :label="delivery.pickPoint" border></el-radio>
                  </div>
                <div class="mb-4">
                  <h4 v-if="deliveryMethod === delivery.courier" class="mt-4">
                    Free shipping only in Novosibirsk!
                    <v-icon class="ml-2">directions_bike</v-icon>
                  </h4>
                  <h4 v-if="deliveryMethod === delivery.russianPost" class="mt-4">
                    Shipping is charged
                    <v-icon>train</v-icon>
                    separately on receipt!
                  </h4>
                  <h4 v-if="deliveryMethod === delivery.pickPoint" class="mt-4">
                    Shipping is charged
                    <v-icon>touch_app</v-icon>
                    separately on receipt!
                  </h4>
                  <v-divider></v-divider>
                  <h3 class="mb-1 mt-4">PAYMENT METHOD</h3>
                  <div>
                    <el-radio v-model="paymentMethod" :label="payment.online" border></el-radio>
                    <el-radio v-model="paymentMethod" :label="payment.onReceipt" border></el-radio>
                  </div>
                  <h4 v-if="paymentMethod === payment.online" class="mt-4">
                    <v-icon>credit_card</v-icon><br>
                    Currently our system supports payment with PayPal only!
                  </h4>
                  <h4 v-if="deliveryMethod === delivery.courier && paymentMethod === payment.onReceipt" class="mt-4">
                    <v-icon>monetization_on</v-icon><br>
                    Pay the courier can cash only!
                  </h4>
                  <h4 v-if="deliveryMethod === delivery.russianPost && paymentMethod === payment.onReceipt" class="mt-4">
                    <v-icon>assignment</v-icon><br>
                    The parcel will be shipped by cash on delivery!
                  </h4>
                  <h4 v-if="deliveryMethod === delivery.pickPoint && paymentMethod === payment.onReceipt" class="mt-4">
                    <v-icon>donut_small</v-icon><br>
                    You can pay for PickPoint services on receipt!
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
                <div class="form_4" v-if="activeStep === 4">
                  <p>By clicking on the "CHECKOUT" button i I confirm with the
                    <!--TODO: fix address-->
                    <a target="_blank"
                       href="http://localhost:8080/userAgreement">
                      user agreement
                    </a>
                  </p>
                  <el-button class="mb-4"
                             @click="checkout"
                             type="success"
                  >
                    CHECKOUT
                  </el-button>
                </div>
              </el-col>
            </el-row>
            <el-button @click="prevStep"
                       v-if="activeStep !== 1">
              Prev step
            </el-button>
            <el-button @click="nextStep"
                       v-if="activeStep !== 4"
                       :type="isValidForm_1 ? 'success' : 'info'"
                       :disabled="!isValidForm_1 || (activeStep === 2 && !isValidForm_2)">
              Next step
             </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </span>
</template>

<script>

export default {
  name: 'Checkout',
  props: ['checkoutObj', 'btnName'],
  data () {
    let notEmptyString = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please fill in the field'))
      } else {
        callback()
      }
    }
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the Email'))
      }
      setTimeout(() => {
        if (!this.isValidEmail(value)) {
          callback(new Error('Email is not valid'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      deliveryMethod: 'Courier',
      delivery: {
        courier: 'Courier',
        russianPost: 'Russian Post',
        pickPoint: 'PickPoint'
      },
      paymentMethod: 'On receipt',
      payment: {
        online: 'Online',
        onReceipt: 'On receipt'
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
      this.$store.dispatch('USER_EVENT', 'Click buy!')
    },
    nextStep () {
      if (this.activeStep < 4) {
        this.activeStep++
      }
      this.$store.dispatch('USER_EVENT', `Step: ${this.activeStep}`)
    },
    prevStep () {
      if (this.activeStep > 1) {
        this.activeStep--
        this.$store.dispatch('USER_EVENT', `Step: ${this.activeStep}`)
      }
    },
    isValidEmail () {
      return /^\S+@\S+\.\S+$/.test(this.form_1.email)
    },
    isValidPhone () {
      return this.form_1.phone.replace(/[^0-9]/g, '').length === 11
    },
    checkout () {
      this.$store.dispatch('USER_EVENT', 'Checkout click! Bingo!')
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
      let products = []
      checkoutObj.forEach(el => {
        let product = this.$store.getters.productById(el.productId)
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

<style scoped>
  .order_info {
    font-size: 16px;
    margin-bottom: 20px;
    padding-top: 0;
  }
</style>
