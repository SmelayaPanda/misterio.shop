import * as firebase from 'firebase'
import router from '../../router'
import {Message, Notification} from 'element-ui'

export default {
  state: {
    user: {
      // Arrays of ids in database, but
      // Full product obj in client side
      cart: {},
      favorites: {},
      // ids only
      orders: [],
      oneclick: []
    },
    isAdmin: false
  },
  mutations: { // change state
    setUser:
      (state, payload) => {
        state.user = payload
      },
    setAdmin:
      (state, payload) => {
        state.isAdmin = payload
      }
  },
  actions: {
    fetchUserData: // one action with another vuex dependencies
      ({commit, dispatch, getters}, payload) => {
        commit('LOADING', true)
        let user = {...payload} // auth object read only, copy them!
        firebase.firestore().collection('users').doc(user.uid).get()
          .then(snap => {
            // add to auth user data own firestore
            let extendUser = Object.assign(user, snap.data())
            commit('setUser', extendUser)
            commit('setAdmin', user.email === 'smelayapandagm@gmail.com')
            return Promise.all([
              dispatch('loadOwnProducts'),
              dispatch('fetchOrders', {userId: user.uid})
            ])
          })
          .then(() => {
            commit('LOADING', false)
            console.log('Fetched: user data')
          })
          .catch(err => dispatch('LOG', err))
      },
    editPersonalInfo:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        let user = getters.user
        firebase.firestore().collection('users').doc(user.uid).update(payload)
          .then(() => {
            commit('setUser', Object.assign(user, payload))
            commit('LOADING', false)
            console.log('Personal info updated!')
          })
          .catch(err => dispatch('LOG', err))
      },
    signUserUp:
      ({commit, dispatch}, payload) => {
        commit('CLEAR_ERR')
        commit('LOADING', true)
        dispatch('upgradeAnonymousAccount', payload)
          .then(() => {
            Notification({
              title: 'Поздравляем',
              message: 'Аккаунт был успешно создан!',
              type: 'success',
              showClose: true,
              duration: 10000,
              offset: 50
            })
            router.push('/account')
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    signUserIn:
      ({commit, dispatch}, payload) => {
        commit('CLEAR_ERR')
        commit('LOADING', true)
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(payload.email, payload.password)
          .then(() => { // onAuthStateChanged works
            console.log('Successful Login')
            router.push('/account')
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    signInAnonymously:
    // All users initially register as anonymous
      ({commit, dispatch}) => {
        commit('setUser', {cart: [], orders: []})
        firebase.auth().signInAnonymouslyAndRetrieveData()
          .then((data) => { // onAuthStateChanged works
            return firebase.firestore().collection('users').doc(data.user.uid)
              .set({ // initialize user for quick update
                cart: [],
                orders: [],
                oneclick: [],
                favorites: [],
                isAnonymous: data.user.isAnonymous
              })
          })
          .then(() => {
            console.log('You are sign in anonymously')
          })
          .catch(err => dispatch('LOG', err))
      },
    upgradeAnonymousAccount:
      ({commit, dispatch}, payload) => {
        let credential = firebase.auth.EmailAuthProvider.credential(payload.email, payload.password)
        firebase.auth().currentUser.linkWithCredential(credential)
          .then(user => {
            dispatch('fetchUserData', user)
            user.sendEmailVerification() // TODO: verification link may be expired, force resend
            console.log('User register. Email verification sent.')
            console.log('Anonymous account successfully upgraded', user)
            return Promise.all([
              firebase.firestore().collection('users').doc(user.uid)
                .update({
                  email: user.email,
                  emailVerified: user.emailVerified,
                  isAnonymous: false
                }),
              firebase.database().ref(`liveChats/${user.uid}/props`).update({userEmail: user.email})
            ])
          })
          .catch(err => dispatch('LOG', err))
      },
    updateEmailVerification:
      ({commit, dispatch}, payload) => {
        firebase.firestore().collection('users').doc(payload.uid)
          .update({emailVerified: payload.emailVerified})
          .catch(err => dispatch('LOG', err))
      },
    logout:
      ({commit, dispatch}) => {
        dispatch('signInAnonymously')
          .then(() => {
            router.push('/')
            commit('setChatMessages', [])
          })
          .catch(err => dispatch('LOG', err))
      },
    resetPassword:
      ({commit, dispatch}, payload) => {
        commit('CLEAR_ERR')
        firebase.auth().sendPasswordResetEmail(payload)
          .then(function () {
            Notification({
              title: 'Внимание',
              message: `На почту ${payload} отправлено письмо для восстановления пароля!`,
              type: 'info',
              showClose: true,
              duration: 20000,
              offset: 50
            })
          })
          .catch(function (err) {
            let errorCode = err.code
            let errorMessage = err.message
            if (errorCode === 'auth/invalid-email') {
              Message({
                type: 'error',
                showClose: true,
                message: errorMessage,
                duration: 10000
              })
            } else if (errorCode === 'auth/user-not-found') {
              Message({
                type: 'error',
                showClose: true,
                message: errorMessage,
                duration: 10000
              })
            }
            dispatch('LOG', err)
          })
      },
    updateCart:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        const user = getters.user
        let pId = payload.product.productId
        if (payload.operation === 'add') {
          user.cart[pId] = payload.product
        } else if (payload.operation === 'remove') {
          delete user.cart[pId]
        }
        let productIds = []
        if (user.cart) {
          productIds = Object.keys(user.cart)
        }
        firebase.firestore().collection('users').doc(user.uid).update({cart: productIds})
          .then(() => {
            commit('setUser', {...user})
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    loadOwnProducts: // cart and favorites
      ({commit, getters, dispatch}) => {
        let user = getters.user
        let cart = {}
        let favorites = {}
        let loadProduct = function (pId, to) {
          // TODO: if product was removed?
          return firebase.firestore().collection('products').doc(pId).get()
            .then(snap => {
              if (to === 'cart') {
                cart[pId] = snap.data()
              } else if (to === 'favorites') {
                favorites[pId] = snap.data()
              }
            })
        }
        let actions = []
        if (user.cart) {
          user.cart.forEach(pId => actions.push(loadProduct(pId, 'cart')))
        }
        if (user.favorites) {
          user.favorites.forEach(pId => actions.push(loadProduct(pId, 'favorites')))
        }
        Promise.all(actions)
          .then(() => {
            user.cart = cart
            user.favorites = favorites
            commit('setUser', {...user})
            console.log('Fetched: user cart products')
          })
          .catch(err => dispatch('LOG', err))
      }
  },
  getters: {
    user:
      state => {
        return state.user
      },
    isAdmin:
      state => {
        return state.isAdmin
      }
  }
}
