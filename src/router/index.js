import Vue from 'vue'
import Router from 'vue-router'
// MAIN
import Home from '@/components/Home'
import About from '@/components/about/About'
import ShoppingCart from '@/components/shop/ShoppingCart'
// AUTH
import Signin from '@/components/auth/Signin'
import Signup from '@/components/auth/Signup'
import Account from '@/components/user/Account'
import AuthGuard from '@/router/auth-guard'
// ADMIN
import AdminPanel from '@/components/admin/AdminPanel'
import Dashboard from '@/components/admin/dashboard/Dashboard'
import AdminProducts from '@/components/admin/products/AdminProducts'
import AdminOrders from '@/components/admin/orders/AdminOrders'
import AdminOneClick from '@/components/admin/oneclick/AdminOneClick'
import AdminReviews from '@/components/admin/reviews/AdminReviews'
import CompanyInfo from '@/components/admin/company_info/CompanyInfo'
import Dictionaries from '@/components/admin/dictionaries/Dictionaries'
import AdminLiveChat from '@/components/admin/live_chat/AdminLiveChat'

// SHOP
import Shop from '@/components/shop/Shop'
import Product from '@/components/shop/Product'
import UserAgreement from '@/components/info/UserAgreement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      beforeEnter: AuthGuard
    },
    {
      path: '/cart',
      name: 'cart',
      component: ShoppingCart
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
    {
      path: '/product/:id',
      name: 'product',
      props: true,
      component: Product
    },
    {
      path: '/admin',
      name: 'admin',
      props: true,
      component: AdminPanel,
      children: [
        {
          path: '',
          component: Dashboard
        },
        {
          path: 'products',
          component: AdminProducts
        },
        {
          path: 'orders',
          component: AdminOrders
        },
        {
          path: 'oneClick',
          component: AdminOneClick
        },
        {
          path: 'reviews',
          component: AdminReviews
        },
        {
          path: 'company',
          component: CompanyInfo
        },
        {
          path: 'dictionaries',
          component: Dictionaries
        },
        {
          path: 'liveChat',
          component: AdminLiveChat
        }
      ]
    },
    {
      path: '/userAgreement',
      name: 'userAgreement',
      props: true,
      component: UserAgreement
    }
  ],
  mode: 'history'
})
