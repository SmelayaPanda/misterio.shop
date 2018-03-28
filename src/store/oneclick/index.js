import * as firebase from 'firebase'

export default {
  state: {
    oneClick: [],
    oneClickStatistics: {
      created: 0,
      sentPending: 0,
      sent: 0,
      delivered: 0,
      refused: 0,
      totalOneClick: 0
    }
  },
  mutations: {
    setOneClick:
      (state, payload) => {
        state.oneClick = payload
      },
    oneClickStatistics:
      (state, payload) => {
        state.oneClickStatistics = payload
      }
  },
  actions: {
    fetchOneClick:
      ({commit}, payload) => {
        commit('LOADING', true)
        let query = firebase.firestore().collection('oneclick')
        if (payload) {
          query = query.where('status', '==', payload)
        }
        query.orderBy('creationDate').get()
          .then(snapshot => {
            let oneClick = []
            snapshot.docs.forEach(doc => {
              let item = doc.data()
              item.id = doc.id
              oneClick.push(item)
            })
            console.log('Fetched: one click')
            commit('setOneClick', oneClick)
            commit('LOADING', false)
          })
          .catch(err => {
            console.log(err)
            commit('LOADING', false)
          })
      },
    updateOneClick:
      ({commit, getters}, payload) => {
        commit('LOADING', true)
        let oneClick = getters.oneClick
        firebase.firestore().collection('oneclick').doc(payload.oneClickId).update(payload.updateData)
          .then(() => {
            if (payload.updateData.status === 'processed') {
              return firebase.firestore().collection('products') // operator can add if absent
                .doc(payload.productId).update({totalQty: payload.totalQty > 0 ? payload.totalQty : 0})
            }
          })
          .then(() => {
            oneClick.splice(oneClick.indexOf(payload.oneClickId), 1)
            console.log('One Click updated')
            commit('setOneClick', oneClick)
            commit('LOADING', false)
          })
          .catch(err => {
            console.log(err)
            commit('LOADING', false)
          })
      },
    fetchOneClickStatistics:
      ({commit}) => {
        firebase.firestore().collection('statistics').doc('oneclick').get()
          .then(snapshot => {
            console.log('Statistics: for one click')
            commit('oneClickStatistics', snapshot.data())
          })
          .catch(err => {
            console.log(err)
          })
      }
  },
  getters: {
    oneClick:
      state => {
        return state.oneClick
      },
    oneClickById:
      state => (id) => {
        return state.oneClick.find(el => {
          return el.id === id
        })
      },
    oneClickStatistics:
      state => {
        return state.oneClickStatistics
      }
  }
}
