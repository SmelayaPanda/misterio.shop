<template>
<span>
    <el-button v-if="!alreadyAddedProduct"
               size="medium"
               class="mt-3"
               :disabled="disabled"
               @click="buyOneClick">
    <span style="font-size: 14px">
      Buy one click
    </span>
    <i class="el-icon-check ml-2" style="transform: scale(1.5)"></i>
  </el-button>
  <el-dialog
    :title="`Buy one click: ${product.title}`"
    width="100%"
    :visible.sync="dialogVisible">
    <el-row type="flex" justify="center">
      <el-col :xs="23" :sm="14" :md="10" :lg="8" :xl="6">
        <el-form :model="oneClickForm"
                 status-icon
                 :rules="formRules"
                 ref="oneClickForm"
                 label-width="120px"
                 label-position="top">
          <el-form-item label="Nickname" prop="nickname">
            <el-input type="text" v-model="oneClickForm.nickname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input type="email" v-model="oneClickForm.email" auto-complete="on"></el-input>
          </el-form-item>
          <el-form-item label="Phone" prop="phone">
            <masked-input v-model="oneClickForm.phone"
                          class="el-input__inner"
                          required
                          mask="\+\7 (111) 111-11-11"
                          placeholder="Phone number"
            />
          </el-form-item>
          <el-button type="primary"
                     @click="submitForm"
                     :disabled="!isValidForm">
            One Click!
          </el-button>
          <el-button @click="closeOneClick">Cancel</el-button>
        </el-form>
      </el-col>
    </el-row>
  </el-dialog>
</span>
</template>

<script>
import axios from 'axios'

export default {
  name: 'OneClick',
  props: ['alreadyAddedProduct', 'product', 'disabled'],
  data () {
    let validateNickname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input nickname'))
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
      dialogVisible: false,
      oneClickForm: {
        nickname: '1',
        email: 'test@mail.ru',
        phone: '7 999 467 78 43'
      },
      formRules: {
        nickname: [
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
      this.$store.dispatch('USER_EVENT', 'Click By one click last product')
      this.dialogVisible = true
    },
    closeOneClick () {
      this.dialogVisible = false
      this.$store.dispatch('USER_EVENT', 'Close one click')
    },
    submitForm () {
      this.$store.dispatch('USER_EVENT', 'One click submit! Bingo!')
      this.dialogVisible = false
      axios.post('https://us-central1-e-store-dev.cloudfunctions.net/oneClickNotification', {
        nickname: this.oneClickForm.nickname,
        email: this.oneClickForm.email,
        phone: this.oneClickForm.phone,
        userId: this.$store.getters.user.uid,
        qty: 1,
        product: {
          title: this.product.title,
          price: this.product.price,
          SKU: this.product.SKU,
          id: this.product.productId
        }
      })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.$notify({
              title: 'Cool!',
              message: 'Your request has been delivered! ' +
                'Our manager will contact you soon.',
              type: 'success',
              showClose: true,
              duration: 10000,
              offset: 50
            })
          }
        })
        .catch(() => {
          this.$notify({
            title: 'Ahh...',
            message: 'Something is wrong with one click function. ' +
              'Please write into tec-support SmelayaPandaGM@gmail.com',
            type: 'error',
            showClose: true,
            duration: 100000,
            offset: 50
          })
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
      return this.isValidPhone() && this.isValidEmail() && this.oneClickForm.nickname
    }
  }
}
</script>

<style scoped>
</style>
