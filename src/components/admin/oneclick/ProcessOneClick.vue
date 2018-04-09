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
      <el-row type="flex" justify="center" v-if="oneClick">
        <el-col :xs="24" :sm="20" :md="10" :lg="8" :xl="6">
          <el-card>
            <h3>{{ oneClick.nickname }}</h3>
            <p>
              <i class="el-icon-phone"> </i> {{ oneClick.phone }}<br>
              <i class="el-icon-message"></i> {{ oneClick.email }}
            </p>
            <v-divider></v-divider>
            <h3>Продукт: </h3>
            <p>
              Название: {{ oneClick.product.title }}<br>
              Артикул: {{ oneClick.product.SKU }}<br>
              Цена: {{ oneClick.product.price }} RUB
            </p>
            <p class="right">{{ oneClick.creationDate | date }}</p>
          </el-card>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="flex-wrap: wrap" class="mt-3">
        <el-col :span="20">
          <el-form>
            <!--Country-->
            <el-form-item label="Страна" :label-width="formLabelWidth">
              <el-input v-model="country"
                        placeholder="( < 50 символов )"
                        :maxlength="50">
              </el-input>
            </el-form-item>
            <!--CITY-->
            <el-form-item label="Город" :label-width="formLabelWidth">
              <el-input v-model="city"
                        placeholder="( < 50 символов )"
                        :maxlength="50">
              </el-input>
            </el-form-item>
            <!--STREET-->
            <el-form-item label="Улица" :label-width="formLabelWidth">
              <el-input v-model="street"
                        placeholder="( < 50 символов )"
                        :maxlength="50"
              ></el-input>
            </el-form-item>
            <!--BUILD-->
            <el-form-item label="Дом" :label-width="formLabelWidth">
              <el-input v-model="build"
                        placeholder="( < 50 символов )"
                        :maxlength="50"
              ></el-input>
            </el-form-item>
            <!--HOUSE-->
            <el-form-item label="Квартира" :label-width="formLabelWidth">
              <el-input v-model="house"
                        placeholder="( < 50 символов )"
                        :maxlength="50"
              ></el-input>
            </el-form-item>
            <!--COMMENTS-->
            <el-form-item label="Коментарий" :label-width="formLabelWidth">
              <el-input v-model="comments"
                        type="textarea"
                        placeholder="( < 400 символов )"
                        :autosize="{ minRows: 3, maxRows: 7}"
                        :maxlength="400"
              ></el-input>
            </el-form-item>
            <el-form-item label="Количество" :label-width="formLabelWidth" v-if="product">
              <el-input-number v-model="qty" :min="1" :max="product.totalQty"></el-input-number>
              (max: {{ product.totalQty }})
              <span v-if="product.totalQty < 1" class="error--text ml-2">
                <b>Товар закончился</b>
              </span>
            </el-form-item>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button type="primary" @click="processOneClick" :disabled="!isValidForm">Подтвердить</el-button>
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
      country: '',
      city: '',
      street: '',
      build: '',
      house: '',
      comments: '',
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    processOneClick () {
      let obj = {}
      obj.status = 'sentPending'
      obj.processDate = new Date()
      obj.qty = this.qty
      obj.shipping = {
        country: this.country,
        city: this.city,
        street: this.street,
        build: this.build,
        house: this.house
      }
      obj.comments = this.comments
      this.dialogFormVisible = false
      this.$store.dispatch('updateOneClick', {
        updateData: obj,
        oneClickId: this.oneClickId,
        productId: this.product.productId,
        totalQty: this.product.totalQty - this.qty
      })
    },
    openProcessDialog () {
      this.dialogFormVisible = true
      // For calc actual totalQty
      firebase.firestore().collection('products').doc(this.oneClick.product.id).get()
        .then((snapshot) => {
          this.product = snapshot.data()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    oneClick () {
      return this.$store.getters.oneClickById(this.oneClickId)
    },
    isValidForm () {
      return this.city && this.street && this.build && this.house
    }
  }
}
</script>
