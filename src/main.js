// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// CORE
import Vue from 'vue'
import App from '@/App'
import {sync} from 'vuex-router-sync'
import router from '@/router'
import {store} from '@/store'
import * as firebase from 'firebase'
// UI
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import './element-variables.scss'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// FILTERS
import DateFilter from '@/filters/date'
import AdminDateFilter from '@/filters/adminDate'
import ChatTimeFilter from '@/filters/chatTime'
import BirthdayFilter from '@/filters/birthday'
import Snippet from '@/filters/snippet'
// MIXINS
import {authMixin} from '@/mixins/autentication'
import {image} from '@/mixins/image'
import {isLoading} from '@/mixins/loading'
import {mailing} from '@/mixins/mailing'
import {purchaseStatuses} from '@/mixins/purchaseStatuses'
// SHARED
import AlertComp from '@/components/shared/Alert'
import Loader from '@/components/shared/Loader'
import BallsLoader from '@/components/shared/BallsLoader'
import HelpTooltip from '@/components/shared/HelpTooltip'
import MaskedInput from 'vue-masked-input'
// for router in store
const unsync = sync(store, router)
unsync()
// USE
Vue.mixin(authMixin)
Vue.mixin(image)
Vue.mixin(isLoading)
Vue.mixin(mailing)
Vue.mixin(purchaseStatuses)
Vue.filter('date', DateFilter)
Vue.filter('adminDate', AdminDateFilter)
Vue.filter('chatTime', ChatTimeFilter)
Vue.filter('birthday', BirthdayFilter)
Vue.filter('snippet', Snippet)
Vue.component('masked-input', MaskedInput)
Vue.component('app-alert', AlertComp)
Vue.component('app-loader', Loader)
Vue.component('app-balls-loader', BallsLoader)
Vue.component('app-help-tooltip', HelpTooltip)

Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI, {locale})
Vue.use(Vuetify, {
  theme: {
    primary: '#0d0d0d',
    secondary: '#810101',
    danger: '#810101',
    info: '#d0d0d0',
    success: '#67c23a',
    warning: '#e6a23c'
  }
})
// -----------------------------
Vue.config.productionTip = false
// FIREBASE
let config
// if (process.env.NODE_ENV === 'development') {
config = {
  apiKey: 'AIzaSyDWYuL9ChkfHkLiINoz7ZdDuQntk4eWrI8',
  authDomain: 'e-store-dev.firebaseapp.com',
  databaseURL: 'https://e-store-dev.firebaseio.com',
  projectId: 'e-store-dev',
  storageBucket: 'e-store-dev.appspot.com',
  messagingSenderId: '252391298748'
}
// } else if (process.env.NODE_ENV === 'production') {
//   config = {
//     apiKey: 'AIzaSyA_xtUXZm6kZAKDJ4j1phpAlkqukVg_7Uo',
//     authDomain: 'e-store-prod.firebaseapp.com',
//     databaseURL: 'https://e-store-prod.firebaseio.com',
//     projectId: 'e-store-prod',
//     storageBucket: 'e-store-prod.appspot.com',
//     messagingSenderId: '117902843738'
//   }
// }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  created: function () {
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged(
      user => {
        let isAdminPanel = this.$router.history.current.fullPath.includes('admin')
        if (user) {
          this.$store.dispatch('fetchUserData', user)
          if (isAdminPanel) {
            this.$store.dispatch('fetchAllChats')
          } else {
            this.$store.dispatch('initializeChat', user)
            this.$store.dispatch('fetchProducts')
            this.$store.dispatch('updateEmailVerification', user) // always check - because there is no another way
          }
        } else {
          this.$store.dispatch('signInAnonymously')
        }
        // ALWAYS
        this.$store.dispatch('fetchDictionaries') // product dropdowns
        this.$store.dispatch('fetchProductStatistics') // MaxPrice for shop
      })
    // In admin panel all data fetched by router click
  }
})
