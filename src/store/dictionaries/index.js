import * as firebase from 'firebase'

export default {
  state: {
    dictionaries: {
      brands: [],
      colors: [],
      countries: [],
      materials: [],
      delivery: []
    }
  },
  mutations: {
    setDictionary:
      (state, payload) => {
        state.dictionaries[payload.name] = payload.data
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
              commit('setDictionary', {name: doc.id, data: doc.data().all})
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
            commit('setDictionary', {name: payload.name, data: payload.data})
            commit('LOADING', false)
            console.log('Dictionary updated')
          })
          .catch(err => dispatch('LOG', err))
      }
  },
  getters: {
    dictionaries:
      state => {
        return state.dictionaries
      }
  }
}
