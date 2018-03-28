import * as firebase from 'firebase'
import router from '../../router'
import {Message, Notification} from 'element-ui'

export default {
  // State ---------------------------------------------------
  state: {
    user: null,
    isAdmin: false
  },
  // Mutations ---------------------------------------------------
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
  // Actions ---------------------------------------------------
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
              commit('setCart', snapshot.data().cart)
              commit('setUser', extendUser)
              commit('setAdmin', payload)
              commit('setAdmin', user.email === 'smelayapandagm@gmail.com')
            }
            dispatch('fetchOrders', {userId: user.uid})
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
              title: 'Congratulations',
              message: 'The account was created!',
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
      () => {
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
              title: 'Info',
              message: `Reset password form sent to your email: ${payload}!`,
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
      }
  },
  // Getters  ---------------------------------------------------
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
