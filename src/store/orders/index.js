import * as firebase from 'firebase'
import router from '../../router'
import {Notification} from 'element-ui'

export default {
  state: {
    orders: [],
    orderStatistics: {
      payPending: 0,
      sentPending: 0,
      sent: 0,
      delivered: 0,
      refused: 0,
      totalOrders: 0
    }
  },
  mutations: {
    setOrders:
      (state, payload) => {
        state.orders = payload
      },
    orderStatistics:
      (state, payload) => {
        state.orderStatistics = payload
      }
  },
  actions: {
    fetchOrders:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        let query = firebase.firestore().collection('orders')
        if (payload.userId) {
          query = query.where('userId', '==', payload.userId)
        }
        if (payload.status) {
          query = query.where('status', '==', payload.status)
        }
        query.orderBy('checkoutDate', 'desc').get()
          .then(
            (snapshot) => {
              let orders = []
              snapshot.docs.forEach(doc => {
                let order = doc.data()
                order.id = doc.id
                order.showDetails = false
                orders.push(order)
              })
              commit('setOrders', orders)
              commit('LOADING', false)
            })
          .catch(err => dispatch('LOG', err))
      },
    checkout:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        let user = getters.user
        let orderId
        let orders = getters.orders ? getters.orders : []
        payload.userId = user.uid
        firebase.firestore().collection('orders').add(payload)
          .then((docRef) => {
            orderId = docRef.id
            payload.id = orderId
            orders.unshift(payload)
            let actions = []
            // 1. Decrease totalQty of each products
            let decreaseTotalQty = function (productId, totalQty) {
              return firebase.firestore().collection('products').doc(productId).update({totalQty: totalQty})
            }
            let productQty
            for (let p of payload.products) {
              productQty = user.cart[p.productId].totalQty
              delete user.cart[p.productId]
              actions.push(decreaseTotalQty(p.productId, productQty - p.qty < 0 ? 0 : productQty - p.qty))
            }
            // 2. Update user data
            let orderIds = []
            let cartProductIds = []
            if (user.cart) {
              cartProductIds = Object.keys(user.cart)
            }
            let updateUserData = function (cart, ordersIds) {
              return firebase.firestore().collection('users').doc(user.uid).update({
                cart: cart,
                orders: ordersIds
              })
            }
            orders.forEach(order => orderIds.push(order.id))
            actions.push(updateUserData(cartProductIds, orderIds))
            return Promise.all(actions)
          })
          .then(() => {
            commit('setOrders', orders)
            commit('setUser', {...user})
            commit('LOADING', false)
            Notification({
              title: 'Поздравляем!',
              message:
              'Заказ совершен! ' +
              'Мы свяжемся с Вами в ближайшее время для подтверждения покупки.',
              type: 'success',
              showClose: true,
              duration: 30000,
              offset: 50
            })
            router.push('/cart')
          })
          .catch(err => dispatch('LOG', err))
      },
    updateOrder:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        let orders = getters.orders
        firebase.firestore().collection('orders').doc(payload.orderId).update(payload.updateData)
          .then(() => {
            // total product qty not increased on refuse - operator work
            orders.splice(orders.indexOf(payload.orderId), 1)
            console.log('Order updated')
            commit('setOrders', orders)
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    fetchOrderStatistics:
      ({commit, dispatch}) => {
        firebase.firestore().collection('statistics').doc('orders').get()
          .then(snapshot => {
            console.log('Statistics: for orders')
            commit('orderStatistics', snapshot.data())
          })
          .catch(err => dispatch('LOG', err))
      }
  },
  getters: {
    orders:
      state => {
        return state.orders
      },
    orderById:
      state => (id) => {
        return state.orders.find(el => {
          return el.id === id
        })
      },
    orderStatistics:
      state => {
        return state.orderStatistics
      }
  }
}
