// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// CORE
import Vue from 'vue'
import App from '@/App'
import {sync} from 'vuex-router-sync'
import router from '@/router'
import vueScrollBehavior from 'vue-scroll-behavior'
import {store} from '@/store'
import * as firebase from 'firebase'
// UI
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/element-variables.scss'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// FILTERS
import DateFilter from '@/filters/date'
import NewsDateFilter from '@/filters/newsDate'
import AdminDateFilter from '@/filters/adminDate'
import ChatTimeFilter from '@/filters/chatTime'
import BirthdayFilter from '@/filters/birthday'
import Snippet from '@/filters/snippet'
// MIXINS
import {authMixin} from '@/mixins/autentication'
import {appConstants} from '@/mixins/constants'
import {image} from '@/mixins/image'
import {isLoading} from '@/mixins/loading'
import {appError} from '@/mixins/error'
import {mailing} from '@/mixins/mailing'
import {purchaseStatuses} from '@/mixins/purchaseStatuses'
// SHARED
import AlertComp from '@/components/shared/Alert'
import Loader from '@/components/shared/Loader'
import HeartLoader from '@/components/shared/HeartLoader'
import BallsLoader from '@/components/shared/BallsLoader'
import HelpTooltip from '@/components/shared/HelpTooltip'
import MaskedInput from 'vue-masked-input'
import {VueEditor} from 'vue2-editor'
// THEME
import ThemePageTitle from '@/components//shared/theme/ThemePageTitle.vue'
import ThemeBtn from '@/components/shared/theme/ThemeBtn.vue'
// for router in store
const unsync = sync(store, router)
unsync()
// USE
Vue.mixin(appConstants)
Vue.mixin(authMixin)
Vue.mixin(image)
Vue.mixin(isLoading)
Vue.mixin(appError)
Vue.mixin(mailing)
Vue.mixin(purchaseStatuses)
Vue.filter('date', DateFilter)
Vue.filter('newsDate', NewsDateFilter)
Vue.filter('adminDate', AdminDateFilter)
Vue.filter('chatTime', ChatTimeFilter)
Vue.filter('birthday', BirthdayFilter)
Vue.filter('snippet', Snippet)
Vue.component('masked-input', MaskedInput)
Vue.component('vue-html-editor', VueEditor)
Vue.component('app-alert', AlertComp)
Vue.component('app-loader', Loader)
Vue.component('app-heart-loader', HeartLoader)
Vue.component('app-balls-loader', BallsLoader)
Vue.component('app-help-tooltip', HelpTooltip)
// Theme components
Vue.component('app-theme-page-title', ThemePageTitle)
Vue.component('app-theme-btn', ThemeBtn)

Vue.use(vueScrollBehavior, {
  router: router, // The router instance
  maxLength: 100, // Saved history List max length
  ignore: [], // RegExp - ignore some routes, they will directly scroll to the top
  delay: 0 // Delay by a number of milliseconds
})
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI, {locale})
Vue.use(Vuetify, {
  theme: {
    primary: '#0d0d0d',
    primaryLight: '#161516',
    secondary: '#8B0000',
    secondaryDark: '#710101',
    secondaryUltraDark: '#650000',
    danger: '#8B0000',
    info: '#d0d0d0',
    success: '#67c23a',
    warning: '#e6a23c',

    // admin colors
    primary_a: '#409EFF',
    secondary_a: '#2c3e50',
    success_a: '#67c23a',
    warning_a: '#e6a23c',
    danger_a: '#f56c6c',
    info_a: '#909399'
  }
})
// -----------------------------
Vue.config.productionTip = false
// FIREBASE
let config
if (process.env.NODE_ENV === 'development') {
  config = {
    apiKey: 'AIzaSyDWYuL9ChkfHkLiINoz7ZdDuQntk4eWrI8',
    authDomain: 'e-store-dev.firebaseapp.com',
    databaseURL: 'https://e-store-dev.firebaseio.com',
    projectId: 'e-store-dev',
    storageBucket: 'e-store-dev.appspot.com',
    messagingSenderId: '252391298748'
  }
} else if (process.env.NODE_ENV === 'production') {
  config = {
    apiKey: 'AIzaSyAGmvXm3x_xcCU9o26cHGiSmjRTBKLInH4',
    authDomain: 'misterio-prod.firebaseapp.com',
    databaseURL: 'https://misterio-prod.firebaseio.com',
    projectId: 'misterio-prod',
    storageBucket: 'misterio-prod.appspot.com',
    messagingSenderId: '470513135830'
  }
}

Vue.prototype.$bus = new Vue()
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
        if (user) {
          this.$store.dispatch('fetchUserData', user)
            .then(() => {
              if (this.$route.path.includes('admin') && ( // TODO: isAdmin copypast fix
                user.email === 'smelayapandagm@gmail.com' || user.email === 'otkrovennieigri@mail.ru')) {
                this.$store.dispatch('fetchAllChats')
              } else {
                this.$store.dispatch('initializeChat', user)
                this.$store.dispatch('fetchProducts')
                this.$store.dispatch('updateEmailVerification', user) // always check - because there is no another way
              }
            })
        } else {
          this.$store.dispatch('signInAnonymously')
        }
        // ALWAYS
        this.$store.dispatch('fetchDictionaries') // product dropdowns
        this.$store.dispatch('fetchCompanyInfo') // for footer
        this.$store.dispatch('fetchProductStatistics') // MaxPrice for shop
      })
    // In admin panel all data fetched by router click
  }
})
