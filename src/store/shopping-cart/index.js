import * as firebase from 'firebase'

export default {
  state: {
    cart: []
  },
  mutations: {
    setCart:
      (state, payload) => {
        state.cart = payload
      }
  },
  actions: {
    updateCart:
      ({commit, getters}, payload) => {
        commit('LOADING', true)
        const user = getters.user
        let cart = getters.cart
        if (payload.operation === 'add') {
          cart.push(payload.productId)
        } else if (payload.operation === 'remove') {
          cart.splice(cart.indexOf(payload), 1)
        }
        firebase.firestore().collection('users').doc(user.uid).update({cart: cart})
          .then(() => {
            commit('setCart', cart)
            commit('LOADING', false)
          })
          .catch(err => {
            console.log(err)
            commit('LOADING', false)
          })
      }
  },
  getters: {
    cart:
      state => {
        return state.cart
      }
  }
}
