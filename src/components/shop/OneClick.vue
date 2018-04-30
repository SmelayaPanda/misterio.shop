<!--
Structure of one click identical with order:
@see Checkout.vue
-->
<template>
<span>
  <!--TODO: sort by date decs-->
    <el-button
      v-if="!alreadyAddedProduct"
      id="oneclick_btn"
      :disabled="disabled"
      @click="openOneClickDialog">
      <span>
        В один клик
      </span>
      <v-icon id="oneclick_btn_icon">touch_app</v-icon>
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
                     @click="oneClickBuy"
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
    openOneClickDialog () {
      this.dialogVisible = true
      this.$store.dispatch('USER_EVENT', 'Купить в один клик')
    },
    closeOneClick () {
      this.dialogVisible = false
      this.$store.dispatch('USER_EVENT', 'Отмена')
    },
    oneClickBuy () {
      this.dialogVisible = false

      let oneclick = {
        amount: {
          final: {value: 1, currency: 'RUB'},
          products: {value: String(0.00), currency: 'RUB'},
          delivery: {value: String(0.00), currency: 'RUB'},
          discount: {value: String(0.00), currency: 'RUB'}
        },
        status: 'created',
        history: {created: new Date()},
        payment: {},
        delivery: {},
        products: [{
          id: this.product.productId,
          SKU: this.product.SKU,
          title: this.product.title,
          price: this.product.price,
          currency: 'RUB',
          qty: 1
        }],
        buyer: {
          userId: this.$store.getters.user.uid,
          firstname: this.oneClickForm.firstname,
          lastname: '',
          email: this.oneClickForm.email,
          phone: this.oneClickForm.phone
        },
        comments: {user: '', admin: ''}
      }

      this.$store.dispatch('addOneClick', oneclick)
      this.$store.dispatch('USER_EVENT', 'Товар куплен в один клик!')
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

<style scoped lang="scss">
  #oneclick_btn {
    color: $color-secondary;
    height: 44px;
    width: 160px;
    transition: all .5s;
  }

  #oneclick_btn:hover {
    color: white;
    background: $color-secondary;
    border: 1px solid $color-secondary;
    #oneclick_btn_icon {
      color: white
    }
  }

  #oneclick_btn_icon {
    margin-top: -4px;
    color: $color-secondary;
  }
</style>
