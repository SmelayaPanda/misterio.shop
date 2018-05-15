<template>
  <div>
    <el-button @click="openProcessDialog">
      <i class="el-icon-service" style="transform: scale(1.1)"></i>
    </el-button>

    <el-dialog
      title="Обработать заявку"
      :visible.sync="dialogFormVisible"
      width="100%"
      :fullscreen="true"
      center>
      <el-row type="flex" justify="center" v-if="oneclick" :key="oneclick.id">
        <el-col :xs="24" :sm="16" :md="12" :lg="10" :xl="9">
          <el-card>
            <h3 align="center" class="primary_a--text">
              Первичная информация
            </h3>
            <v-divider class="mb-2 mt-3"></v-divider>
            <h3>{{ oneclick.buyer.firstname }}</h3>
            <p>
              <i class="el-icon-phone"></i> {{ oneclick.buyer.phone }}<br>
              <i class="el-icon-message"></i> {{ oneclick.buyer.email }}
            </p>
            <v-divider class="mb-2"></v-divider>
            <h3>Товар:</h3>
            <p>
              Название: {{ oneclick.products[0].title }}<br>
              Артикул: {{ oneclick.products[0].SKU }}<br>
              Цена: {{ oneclick.products[0].price | price }} <span v-html="RUB"></span>
            </p>
            <p class="right">{{ oneclick.history.created | date }}</p>
          </el-card>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="flex-wrap: wrap" class="mt-3">
        <el-col :span="22">
          <el-form>
            <el-row type="flex">
              <el-col>
                <el-form-item label="Имя" :label-width="formLabelWidth">
                  <el-input v-model="buyer.firstname" placeholder="Имя" :maxlength="50">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="Фамилия" :label-width="formLabelWidth">
                  <el-input v-model="buyer.lastname" placeholder="Фамилия" :maxlength="50"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex">
              <el-col>
                <el-form-item label="Страна" :label-width="formLabelWidth">
                  <el-input v-model="address.country" placeholder="Страна" :maxlength="50">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="Город" :label-width="formLabelWidth">
                  <el-input v-model="address.city" placeholder="Город" :maxlength="50">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex">
              <el-col>
                <el-form-item label="Улица" :label-width="formLabelWidth">
                  <el-input v-model="address.street" placeholder="Улица" :maxlength="50">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="Дом" :label-width="formLabelWidth">
                  <el-input v-model="address.build" placeholder="Дом" :maxlength="50">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex">
              <el-col>
                <el-form-item label="Квартира" :label-width="formLabelWidth">
                  <el-input v-model="address.house" placeholder="Квартира" :maxlength="50">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="Почтовый индекс" :label-width="formLabelWidth">
                  <el-input v-model="address.postCode" placeholder="Почтовый индекс" :maxlength="10">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="Коментарий" :label-width="formLabelWidth">
              <el-input
                v-model="comments.admin"
                type="textarea"
                placeholder="( < 400 символов. Видны только вам )"
                :autosize="{ minRows: 3, maxRows: 7}"
                :maxlength="400">
              </el-input>
            </el-form-item>
            <el-form-item label="Количество" :label-width="formLabelWidth" v-if="product">
              <el-input-number v-model="qty" :min="1" :max="product.totalQty"></el-input-number>
              <span v-if="product.totalQty < 1" class="error--text ml-2">
                <b>Товар закончился</b>
              </span>
              <span v-else> осталось {{ product.totalQty }} шт.</span>
            </el-form-item>
          </el-form>
          <el-row type="flex" justify="start">
            <el-col :span="15" :style="`margin-left: ${formLabelWidth}`">
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
              <br>
              <el-radio-group @change="changeDeliveryMethod" v-model="delivery.method" class="mb-4">
                <el-radio
                  v-if="Number(delivery.region) === 54"
                  :label="DELIVERY_METHODS.courier.value"
                  border class="mt-2">{{ DELIVERY_METHODS.courier.label }}
                </el-radio>
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
              <h4 class="mb-1">
                СПОСОБ ОПЛАТЫ
              </h4>
              <el-radio-group v-model="payment.method" class="mb-4">
                <el-radio :label="PAYMENT_METHODS.bank_card.value" border class="mt-1">
                  {{ PAYMENT_METHODS.bank_card.label }}
                </el-radio>
                <el-radio :label="PAYMENT_METHODS.cash.value" border class="mt-1">
                  {{ PAYMENT_METHODS.cash.label }}
                </el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="9">
              <v-card id="order_ticket">
              <h3 class="primary_a--text">ЗАКАЗ</h3>
              <span class="mb-2">{{ product.title }}:</span><br>
              <span class="price_tag">{{ product.price }}</span>x
              <span class="price_tag">{{ qty }}</span>=
              <span class="price_tag">
                {{ parseFloat(totalProductsPrice).toFixed(2) }}<span v-html="RUB"></span>
              </span>
              <!-- DELIVERY COAST -->
              <div v-if="delivery.method" class="mb-3 mt-2">
              <span class="product_title">
                Доставка ({{ DELIVERY_METHODS[delivery.method].label }}):
              </span>
                <span v-if="totalDeliveryPrice" class="price_tag">
                {{ totalDeliveryPrice }}<span v-html="RUB"></span>
              </span>
                <span v-else class="product_title">бесплатно</span>
              </div>
              <h3 class="success--text mt-2">ИТОГО: {{ totalOrderPrice }}<span v-html="RUB"></span></h3>
              </v-card>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <v-btn
              class="primary_a white--text"
              @click="processOneClick"
              :disabled="!isValidForm">
              Подтвердить
            </v-btn>
            <v-btn @click="dialogFormVisible = false">Отмена</v-btn>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import * as firebase from 'firebase'

export default {
  name: 'ProcessOneClick',
  props: ['oneClickId'],
  data () {
    return {
      product: {},
      qty: 1,
      dialogFormVisible: false,
      formLabelWidth: '140px',
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
        country: 'Россия',
        city: '',
        street: '',
        build: '',
        house: '',
        postCode: ''
      },
      comments: {
        admin: ''
      }
    }
  },
  methods: {
    processOneClick () {
      this.dialogFormVisible = false

      let oneclickUpdate = {
        amount: {
          final: {value: parseFloat(this.totalOrderPrice).toFixed(2), currency: 'RUB'},
          discount: {value: 0, currency: 'RUB'},
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
        products: [{
          id: this.product.productId,
          SKU: this.product.SKU,
          currency: this.product.currency,
          price: this.product.price,
          title: this.product.title,
          qty: this.qty
        }],
        status: this.ORDER_STATUSES.pending.value,
        'history.pending': new Date(),
        'buyer.firstname': this.buyer.firstname,
        'buyer.lastname': this.buyer.lastname,
        comments: {user: '', admin: this.comments.admin}
      }
      this.$store.dispatch('updateOneClick', {
        updateData: oneclickUpdate,
        id: this.oneClickId,
        product: {
          id: this.product.productId,
          newTotalQty: this.product.totalQty - this.qty
        }
      })
    },
    openProcessDialog () {
      this.dialogFormVisible = true
      this.$store.dispatch('LOADING', true)
      firebase.firestore().collection('products').doc(this.oneclick.products[0].id).get()
        .then((snap) => {
          this.product = snap.data()
          this.$store.dispatch('LOADING', false)
        })
        .catch((err) => this.$store.dispatch('LOG', err))
    },
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
    }
  },
  computed: {
    oneclick () {
      return this.$store.getters.oneclick[this.oneClickId]
    },
    isValidForm () {
      return this.buyer.firstname && this.buyer.lastname &&
          this.address.country && this.address.city && this.address.street &&
          this.address.build && this.address.house && this.address.postCode &&
          this.delivery.method && this.delivery.region && this.payment.method
    },
    deliveryDictionary () {
      return this.$store.getters.dictionaries['delivery']
    },
    courierDictionary () {
      return this.$store.getters.dictionaries['courier']
    },
    totalDeliveryPrice () {
      return this.delivery.method ? this.delivery.prices[this.delivery.method] : 0
    },
    totalOrderPrice () {
      return this.totalProductsPrice + this.totalDeliveryPrice
    },
    totalProductsPrice () {
      return this.product.price * this.qty
    }
  }
}
</script>

<style scoped lang="scss">
  .price_tag {
    color: white;
    font-size: 12px;
    background: $color-primary_a;
    padding: 4px 10px;
    border-radius: 4px;
    margin-left: 2px;
    margin-right: 5px;
  }

  #order_ticket {
    padding: 10px;
    margin: 2px;
    border-radius: 7px;
  }
</style>
