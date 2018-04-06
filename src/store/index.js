import Vue from 'vue'
import Vuex from 'vuex'

import shared from './shared/index'
import user from './user/index'
import products from './products/index'
import orders from './orders/index'
import dictionaries from './dictionaries/index'
import oneclick from './oneclick/index'
import reviews from './reviews/index'
import news from './news/index'
import companyInfo from './company_info/index'
import liveChat from './live_chat/index'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user: user,
    shared: shared,
    products: products,
    orders: orders,
    dictionaries: dictionaries,
    oneclick: oneclick,
    reviews: reviews,
    news: news,
    companyInfo: companyInfo,
    liveChat: liveChat
  }
})
