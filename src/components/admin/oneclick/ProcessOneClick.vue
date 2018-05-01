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
      <el-row type="flex" justify="center" v-if="oneclick">
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
              Цена: {{ oneclick.products[0].price }} <span v-html="RUB"></span>
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
                ( осталось товаров: {{ product.totalQty }} )
              <span v-if="product.totalQty < 1" class="error--text ml-2">
                <b>Товар закончился</b>
              </span>
            </el-form-item>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button class="primary_a white--text"
                       @click="processOneClick"
                       :disabled="!isValidForm">
              Подтвердить
            </el-button>
            <el-button @click="dialogFormVisible = false">Отмена</el-button>
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
          final: {value: 0, currency: 'RUB'},
          discount: {value: 0, currency: 'RUB'},
          products: {value: this.oneclick.products[0].price, currency: 'RUB'},
          delivery: {value: 0, currency: 'RUB'}
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
    }
  },
  computed: {
    oneclick () {
      return this.$store.getters.oneclick[this.oneClickId]
    },
    isValidForm () {
      return this.buyer.firstname && this.buyer.lastname &&
          this.address.country && this.address.city && this.address.street &&
          this.address.build && this.address.house && this.address.postCode
    }
  }
}
</script>
