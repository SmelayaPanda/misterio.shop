<template>
  <v-container>
    <!--Loading circular-->
    <v-container v-if="this.isLoading">
      <app-loader></app-loader>
    </v-container>
    <!--Authentication form-->
    <el-row type="flex" justify="center" v-if="!this.isLoading">
      <el-col :xs="24" :sm="14" :md="12" :lg="10" :xl="8">
        <app-alert v-if="error" :text="error.message"></app-alert>
        <el-card>
          <h2>Sign in</h2>
          <v-container>
            <el-form :model="formRule"
                     status-icon
                     :rules="rules"
                     auto-complete="on"
                     ref="formRule"
            >
              <el-form-item label="Email" prop="email">
                <el-input type="email"
                          id="email"
                          :autofocus="true"
                          v-model="formRule.email"
                          auto-complete="on"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="Password" prop="password">
                <el-input type="password"
                          v-model="formRule.password"
                          auto-complete="off">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           :disabled="this.isLoading"
                           @click="submitForm('formRule')"> Sign In
                </el-button>
              </el-form-item>
              <div v-if="submitCount > 2">
                <span class="primary--text ml-3">Forgot password?</span>
                <p>Enter your email in the above field and click:</p>
                <el-button type="success" @click="resetPassword">Reset password</el-button>
              </div>
              <router-link to="/signup">
                <el-button type="text">Do not have an account?</el-button>
              </router-link>
            </el-form>
          </v-container>
        </el-card>
      </el-col>
    </el-row>
  </v-container>
</template>

<script>
export default {
  name: 'signin',
  data () {
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
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.formRule.checkPass !== '') {
          this.$refs.formRule.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      formRule: {
        password: '',
        checkPass: '',
        email: ''
      },
      rules: {
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        email: [
          {validator: checkEmail, trigger: 'blur'}
        ]
      },
      submitCount: 0
    }
  },
  computed: {
    user:
        function () {
          return this.$store.getters.user
        },
    error:
        function () {
          return this.$store.getters.error
        }
  },
  watch: {
    user:
        function (value) {
          if (value !== null && value !== undefined) {
            this.$router.push('/account')
          }
        }
  },
  methods: {
    submitForm (formName) {
      this.submitCount++
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('signUserIn', {email: this.formRule.email, password: this.formRule.password})
        } else {
          return this.$store.dispatch('ERR', {message: 'Please, fill in the fields correctly'})
        }
      })
    },
    isValidEmail: function (email) {
      return /^\S+@\S+\.\S+$/.test(email)
    },
    resetPassword: function sendPasswordReset () {
      let email = document.getElementById('email').value
      this.$store.dispatch('resetPassword', email)
    }
  }
}
</script>

<style scoped>
</style>
