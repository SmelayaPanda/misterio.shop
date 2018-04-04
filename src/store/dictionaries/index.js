import * as firebase from 'firebase'

export default {
  state: {
    brands: [],
    colors: []
  },
  mutations: {
    setBrands:
      (state, payload) => {
        state.brands = payload
      },
    setColors:
      (state, payload) => {
        state.colors = payload
      }
  },
  actions: {
    fetchDictionaries:
      ({commit, dispatch}) => {
        commit('LOADING', true)
        firebase.firestore().collection('dictionaries').get()
          .then(snapshot => {
            let docs = snapshot.docs
            docs.forEach(doc => {
              if (doc.id === 'brands') {
                commit('setBrands', doc.data().all)
              }
              if (doc.id === 'colors') {
                commit('setColors', doc.data().all)
              }
            })
            console.log('Fetched: dictionaries')
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    uploadDictionary:
      ({commit, getters, dispatch}, payload) => {
        let name = payload.name
        delete payload.dictionary
        commit('LOADING', true)
        firebase.firestore().collection('dictionaries').doc(name).set({all: payload.data})
          .then(() => {
            console.log('Dictionary updated')
            commit('setBrands', payload.data)
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      }
  },
  getters: {
    brands:
      state => {
        return state.brands
      },
    colors:
      state => {
        return state.colors
      }
  }
}
