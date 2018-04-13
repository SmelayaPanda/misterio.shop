import Vue from 'vue'
import Router from 'vue-router'
// MAIN
import Home from '@/components/home/Home'
import About from '@/components/about/About'
import Cart from '@/components/cart/Cart'
import News from '@/components/news/News'
import Article from '@/components/news/Article'
import Contacts from '@/components/contacts/Contacts'
import Shop from '@/components/shop/Shop'
import Product from '@/components/shop/Product'
import UserAgreement from '@/components/info/UserAgreement'
import Favorites from '@/components/favorites/Favorites'
// AUTH
import Signin from '@/components/auth/Signin'
import Signup from '@/components/auth/Signup'
import Account from '@/components/account/Account'
// import AuthGuard from '@/router/auth-guard'
// ADMIN
import AdminPanel from '@/components/admin/AdminPanel'
import System from '@/components/admin/system/System'
import Dashboard from '@/components/admin/dashboard/Dashboard'
import AdminProducts from '@/components/admin/products/AdminProducts'
import AdminOrders from '@/components/admin/orders/AdminOrders'
import AdminOneClick from '@/components/admin/oneclick/AdminOneClick'
import AdminReviews from '@/components/admin/reviews/AdminReviews'
import AdminNews from '@/components/admin/news/AdminNews'
import CompanyInfo from '@/components/admin/company_info/CompanyInfo'
import Dictionaries from '@/components/admin/dictionaries/Dictionaries'
import AdminLiveChat from '@/components/admin/live_chat/AdminLiveChat'

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
      component: Account
      // beforeEnter: AuthGuard
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
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
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/news/:id',
      name: 'article',
      props: true,
      component: Article
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
          path: 'system',
          component: System
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
          path: 'news',
          component: AdminNews
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
