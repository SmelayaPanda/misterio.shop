<template>
  <div>
    <el-button @click="openProcessDialog">
      <i class="el-icon-service" style="transform: scale(1.1)"></i>
    </el-button>

    <app-loader v-if="this.isLoading"></app-loader>
    <el-dialog
      v-else
      title="Обработать заявку"
      :visible.sync="dialogFormVisible"
      width="100%"
      :fullscreen="true"
      center>
      <el-row type="flex" justify="center" v-if="oneClick">
        <el-col :xs="24" :sm="20" :md="10" :lg="8" :xl="6">
          <el-card>
            <h3>{{ oneClick.firstname }}</h3>
            <p>
              <i class="el-icon-phone"> </i> {{ oneClick.phone }}<br>
              <i class="el-icon-message"></i> {{ oneClick.email }}
            </p>
            <v-divider></v-divider>
            <h3>Товар: </h3>
            <p>
              Название: {{ oneClick.title }}<br>
              Артикул: {{ oneClick.SKU }}<br>
              Цена: {{ oneClick.price }} <span v-html="RUBLE"></span>
            </p>
            <p class="right">{{ oneClick.creationDate | date }}</p>
          </el-card>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="flex-wrap: wrap" class="mt-3">
        <el-col :span="20">
          <el-form>
            <el-row type="flex">
              <el-col>
                <el-form-item label="Имя" :label-width="formLabelWidth">
                  <el-input v-model="firstname"
                            placeholder="Имя"
                            :maxlength="50">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="Фамилия" :label-width="formLabelWidth">
                  <el-input v-model="lastname"
                            placeholder="Фамилия"
                            :maxlength="50">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex">
              <el-col>
                <el-form-item label="Страна" :label-width="formLabelWidth">
                  <el-input v-model="shipping.country"
                            placeholder="Страна"
                            :maxlength="50">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="Город" :label-width="formLabelWidth">
                  <el-input v-model="shipping.city"
                            placeholder="Город"
                            :maxlength="50">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex">
              <el-col>
                <el-form-item label="Улица" :label-width="formLabelWidth">
                  <el-input v-model="shipping.street"
                            placeholder="Улица"
                            :maxlength="50">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="Дом" :label-width="formLabelWidth">
                  <el-input v-model="shipping.build"
                            placeholder="Дом"
                            :maxlength="50">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex">
              <el-col>
                <el-form-item label="Квартира" :label-width="formLabelWidth">
                  <el-input v-model="shipping.house"
                            placeholder="Квартира"
                            :maxlength="50">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="Почтовый индекс" :label-width="formLabelWidth">
                  <el-input v-model="shipping.postCode"
                            placeholder="Почтовый индекс"
                            :maxlength="10">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="Коментарий" :label-width="formLabelWidth">
              <el-input v-model="comments"
                        type="textarea"
                        placeholder="( < 400 символов )"
                        :autosize="{ minRows: 3, maxRows: 7}"
                        :maxlength="400">
              </el-input>
            </el-form-item>
            <el-form-item label="Количество" :label-width="formLabelWidth" v-if="product">
              <el-input-number v-model="qty" :min="1" :max="product.totalQty"></el-input-number>
              (осталось товаров: {{ product.totalQty }})
              <span v-if="product.totalQty < 1" class="error--text ml-2">
                <b>Товар закончился</b>
              </span>
            </el-form-item>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button class="primary_a"
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
      firstname: '',
      lastname: '',
      shipping: {
        country: 'Россия',
        city: 'Новосибирск',
        street: '',
        build: '',
        house: '',
        postCode: ''
      },
      comments: '',
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    processOneClick () {
      this.dialogFormVisible = false
      let obj = {}
      obj.firstname = this.firstname
      obj.lastname = this.lastname
      obj.shipping = this.shipping
      obj.status = 'sentPending'
      obj.qty = this.qty
      obj.processDate = new Date()
      this.$store.dispatch('updateOneClick', {
        updateData: obj,
        id: this.oneClickId,
        productId: this.product.productId,
        totalQty: this.product.totalQty - this.qty
      })
    },
    openProcessDialog () {
      this.dialogFormVisible = true
      this.$store.dispatch('LOADING', true)
      firebase.firestore().collection('products').doc(this.oneClick.productId).get()
        .then((snap) => {
          this.product = snap.data()
          this.$store.dispatch('LOADING', false)
        })
        .catch((err) => {
          console.log(err)
          this.$store.dispatch('LOADING', false)
        })
    }
  },
  computed: {
    oneClick () {
      return this.$store.getters.oneClick[this.oneClickId]
    },
    isValidForm () {
      return this.firstname && this.lastname &&
          this.shipping.country && this.shipping.city && this.shipping.street &&
          this.shipping.build && this.shipping.house && this.shipping.postCode
    }
  }
}
</script>
