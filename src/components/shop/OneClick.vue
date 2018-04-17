<template>
<span>
  <!--TODO: how confirm one click person?-->
  <!--TODO: sort by date decs-->
    <el-button
      v-if="!alreadyAddedProduct"
      size="medium"
      class="mt-3"
      :disabled="disabled"
      @click="buyOneClick">
    <span style="font-size: 14px">
      В один клик
    </span>
    <i class="el-icon-check ml-2" style="transform: scale(1.5)"></i>
  </el-button>
  <el-dialog
    id="buy_one_click"
    :title="`Купить в один клик  ${product.title}`"
    width="100%"
    close-on-press-escape
    :visible.sync="dialogVisible">
    <el-row type="flex" justify="center">
      <el-col :xs="23" :sm="14" :md="10" :lg="8" :xl="6">
        <el-form :model="oneClickForm"
                 status-icon
                 :rules="formRules"
                 ref="oneClickForm"
                 label-width="120px"
                 label-position="top">
          <el-form-item label="Имя" prop="firstname">
            <el-input type="text" v-model="oneClickForm.firstname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input type="email" v-model="oneClickForm.email" auto-complete="on"></el-input>
          </el-form-item>
          <el-form-item label="Телефон" prop="phone">
            <masked-input v-model="oneClickForm.phone"
                          class="el-input__inner"
                          required
                          mask="\+\7 (111) 111-11-11"
                          placeholder="Номер телефона"/>
          </el-form-item>
          <el-button type="danger"
                     @click="addOneClick"
                     :disabled="!isValidForm">
            Отправить заявку!
          </el-button>
          <el-button @click="closeOneClick">Отмена</el-button>
        </el-form>
      </el-col>
    </el-row>
  </el-dialog>
</span>
</template>

<script>

export default {
  name: 'OneClick',
  props: ['alreadyAddedProduct', 'product', 'disabled'],
  data () {
    let validateNickname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Пожалуйста, введите имя'))
      } else {
        callback()
      }
    }
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Введите Email'))
      }
      setTimeout(() => {
        if (!this.isValidEmail(value)) {
          callback(new Error('Email некорректный'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      dialogVisible: false,
      oneClickForm: {
        firstname: '',
        email: '',
        phone: ''
      },
      formRules: {
        firstname: [
          {validator: validateNickname, trigger: 'blur'}
        ],
        email: [
          {validator: checkEmail, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    buyOneClick () {
      this.$store.dispatch('USER_EVENT', 'Купить в один клик')
      this.dialogVisible = true
    },
    closeOneClick () {
      this.dialogVisible = false
      this.$store.dispatch('USER_EVENT', 'Отмена')
    },
    addOneClick () {
      this.$store.dispatch('USER_EVENT', 'Товар куплен в один клик!')
      this.dialogVisible = false

      this.$store.dispatch('addOneClick', {
        firstname: this.oneClickForm.firstname,
        email: this.oneClickForm.email,
        phone: this.oneClickForm.phone,
        userId: this.$store.getters.user.uid,
        title: this.product.title,
        price: this.product.price,
        SKU: this.product.SKU,
        productId: this.product.productId,
        qty: 1,
        creationDate: new Date(),
        status: 'created'
      })
    },
    isValidEmail () {
      return /^\S+@\S+\.\S+$/.test(this.oneClickForm.email)
    },
    isValidPhone () {
      return this.oneClickForm.phone.replace(/[^0-9]/g, '').length === 11
    }
  },
  computed: {
    isValidForm () {
      return this.isValidPhone() && this.isValidEmail() && this.oneClickForm.firstname
    }
  }
}
</script>

<style scoped>
</style>
