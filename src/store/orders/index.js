import * as firebase from 'firebase'
import router from '../../router'
import {Notification} from 'element-ui'

export default {
  state: {
    orders: {},
    orderStatistics: {
      payPending: 0,
      sentPending: 0,
      sent: 0,
      delivered: 0,
      refused: 0,
      totalOrders: 0
    },
    confirmationObj: {orderId: '', url: ''} // { orderId: '', url: '' } for confirm payment button
  },
  mutations: {
    setOrders:
      (state, payload) => {
        state.orders = payload
      },
    orderStatistics:
      (state, payload) => {
        state.orderStatistics = payload
      },
    setConfirmationObj (state, payload) {
      state.confirmationObj = payload
    }
  },
  actions: {
    fetchOrders:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        let query = firebase.firestore().collection('orders')
        if (payload.userId) {
          query = query.where('buyer.userId', '==', payload.userId)
        }
        if (payload.status) {
          query = query.where('status', '==', payload.status)
        }
        let orders = {}
        query.orderBy('history.created', 'desc').get()
          .then(snap => {
            snap.docs.forEach(doc => {
              orders[doc.id] = doc.data()
              orders[doc.id].id = doc.id
              orders[doc.id].showDetails = false // for collapse details
            })
            commit('setOrders', {...orders})
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    subscribeToOrderModification:
      ({commit, getters, dispatch}, payload) => {
        let orders = getters.orders ? getters.orders : {}
        return firebase.firestore().collection('orders').doc(payload)
          .onSnapshot(function (doc) {
            console.log('Order changed')
            let order = doc.data()
            order.id = doc.id
            orders[doc.id] = order
            commit('setOrders', {...orders})
          })
      },
    checkout:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        let user = getters.user
        let orders = getters.orders ? getters.orders : {}
        firebase.firestore().collection('orders').add(payload)
          .then((docRef) => {
            payload.id = docRef.id
            orders[docRef.id] = payload
            let actions = []
            // 1. Decrease totalQty of each products
            let decreaseQty = function (id, totalQty) {
              return firebase.firestore().collection('products').doc(id).update({totalQty: totalQty})
            }
            let productQty = 0
            payload.products.forEach(el => {
              productQty = user.cart[el.id].totalQty
              delete user.cart[el.id]
              actions.push(decreaseQty(el.id, productQty - el.qty > 0 ? productQty - el.qty : 0))
            })
            // 2. Update user data
            let orderIds = Object.keys(orders)
            let cartProductIds = user.cart ? Object.keys(user.cart) : []
            let updateUserData = function (cart, ordersIds) {
              return firebase.firestore().collection('users').doc(user.uid).update({cart: cart, orders: ordersIds})
            }
            actions.push(updateUserData(cartProductIds, orderIds))
            return Promise.all(actions)
          })
          .then(() => {
            commit('setOrders', {...orders})
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
            // Fact: total product qty not increased on refuse
            delete orders[payload.orderId]
            console.log('Order updated')
            commit('setOrders', {...orders})
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
      },
    setConfirmationObj ({commit}, payload) {
      commit('setConfirmationObj', payload)
    }
  },
  getters: {
    orders: state => state.orders,
    orderStatistics: state => state.orderStatistics,
    confirmationObj: state => state.confirmationObj
  }
}
