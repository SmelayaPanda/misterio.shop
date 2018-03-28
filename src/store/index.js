import Vue from 'vue'
import Vuex from 'vuex'

import shared from './shared/index'
import user from './user/index'
import cart from './shopping-cart/index'
import products from './products/index'
import orders from './orders/index'
import dictionaries from './dictionaries/index'
import oneclick from './oneclick/index'
import reviews from './reviews/index'
import companyInfo from './company_info/index'
import liveChat from './live_chat/index'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user: user,
    shared: shared,
    cart: cart,
    products: products,
    orders: orders,
    dictionaries: dictionaries,
    oneclick: oneclick,
    reviews: reviews,
    companyInfo: companyInfo,
    liveChat: liveChat
  }
})
