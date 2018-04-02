import * as firebase from 'firebase'
import router from '../../router'
import {Message, Notification} from 'element-ui'

export default {
  state: {
    user: {
      cart: [], // ids only
      cartProducts: {}, // { productId : {}, ... }
      orders: []
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
        let user = {...payload}
        firebase.firestore().collection('users').doc(user.uid).get()
          .then(snapshot => {
            if (snapshot.data()) {
              // add to auth user data own firestore
              let extendUser = Object.assign(user, snapshot.data())
              commit('setUser', extendUser)
              commit('setAdmin', user.email === 'smelayapandagm@gmail.com')
            }
            dispatch('fetchOrders', {userId: user.uid})
            return dispatch('loadCartProducts')
          })
          .then(() => {
            commit('LOADING', false)
            console.log('Fetched: user data')
          })
          .catch(err => {
            console.log(err)
            commit('LOADING', false)
          })
      },
    editPersonalInfo:
      ({commit, getters}, payload) => {
        commit('LOADING', true)
        let user = getters.user
        firebase.firestore().collection('users').doc(user.uid).update(payload)
          .then(() => {
            commit('setUser', Object.assign(user, payload))
            commit('LOADING', false)
            console.log('Personal info updated!')
          })
          .catch(err => {
            commit('LOADING', false)
            console.log(err)
          })
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
          .catch(err => {
            commit('LOADING', false)
            commit('ERR', err)
            console.log(err)
          })
      },
    signUserIn:
      ({commit}, payload) => {
        commit('CLEAR_ERR')
        commit('LOADING', true)
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(payload.email, payload.password)
          .then(() => { // onAuthStateChanged works
            console.log('Successful Login')
            router.push('/account')
            commit('LOADING', false)
          })
          .catch(
            error => {
              commit('ERR', error)
              commit('LOADING', false)
            })
      },
    signInAnonymously:
    // All users initially register as anonymous
      ({commit}) => {
        commit('setUser', {cart: [], orders: []})
        firebase.auth().signInAnonymouslyAndRetrieveData()
          .then((data) => { // onAuthStateChanged works
            return firebase.firestore().collection('users').doc(data.user.uid)
              .set({ // initialize user for quick update
                cart: [],
                orders: [],
                oneclick: [],
                isAnonymous: data.user.isAnonymous
              })
          })
          .then(() => {
            console.log('You are sign in anonymously')
          })
          .catch(err => {
            console.log(err)
          })
      },
    upgradeAnonymousAccount:
      ({commit, dispatch}, payload) => {
        let userId
        let credential = firebase.auth.EmailAuthProvider.credential(payload.email, payload.password)
        firebase.auth().currentUser.linkWithCredential(credential)
          .then(user => {
            userId = user.uid
            user.sendEmailVerification() // TODO: verification link may be expired, force resend
            commit('setUser', {...user})
            console.log('User register. Email verification sent.')
            console.log('Anonymous account successfully upgraded', user)
            return firebase.firestore().collection('users').doc(user.uid).update({
              email: user.email,
              emailVerified: user.emailVerified,
              isAnonymous: false
            })
          })
          .then(() => {
            return firebase.database().ref(`liveChats/${userId}/props`).update({userEmail: payload.email})
          })
          .then(() => {
            console.log('Live chat email updated', payload.email)
          })
          .catch(err => {
            console.log('Error upgrading anonymous account', err)
          })
      },
    updateEmailVerification:
      ({commit}, payload) => {
        firebase.firestore().collection('users').doc(payload.uid).update({emailVerified: payload.emailVerified})
          .catch((err) => console.log(err))
      },
    logout:
      ({commit, dispatch}) => {
        dispatch('signInAnonymously')
          .then(() => {
            router.push('/')
            commit('setChatMessages', [])
          })
          .catch(err => {
            console.log(err)
          })
      },
    resetPassword:
      ({commit}, payload) => {
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
            console.log(err)
          })
      },
    editUserData:
      () => {
      },
    updateCart:
      ({commit, getters}, payload) => {
        commit('LOADING', true)
        const user = getters.user
        let pId = payload.product.productId
        if (payload.operation === 'add') {
          user.cart.push(pId)
          user.cartProducts[pId] = payload.product
        } else if (payload.operation === 'remove') {
          user.cart.splice(user.cart.indexOf(pId), 1)
          delete user.cartProducts[pId]
        }
        firebase.firestore().collection('users').doc(user.uid).update({cart: user.cart})
          .then(() => {
            commit('setUser', {...user})
            commit('LOADING', false)
          })
          .catch(err => {
            console.log(err)
            commit('LOADING', false)
          })
      },
    loadCartProducts:
      ({commit, getters}) => {
        // TODO: if product was removed?
        let user = getters.user
        let actions = []
        let cartProducts = {}
        let loadProduct = function (pId) {
          return firebase.firestore().collection('products').doc(pId).get()
            .then(snap => {
              cartProducts[pId] = snap.data()
            })
        }
        user.cart.forEach(pId => {
          actions.push(loadProduct(pId))
        })
        Promise.all(actions)
          .then(() => {
            user.cartProducts = cartProducts
            commit('setUser', {...user})
            console.log('Fetched: user cart products')
          })
          .catch(err => {
            console.log(err)
          })
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
