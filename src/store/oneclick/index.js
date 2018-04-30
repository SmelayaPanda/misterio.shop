import * as firebase from 'firebase'
import {Notification} from 'element-ui'

export default {
  state: {
    oneclick: {},
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
        state.oneclick = payload
      },
    oneClickStatistics:
      (state, payload) => {
        state.oneClickStatistics = payload
      }
  },
  actions: {
    fetchOneClick:
      ({commit, dispatch}, payload) => {
        commit('LOADING', true)
        let query = firebase.firestore().collection('oneclick')
        if (payload) {
          query = query.where('status', '==', payload)
        }
        query.orderBy('history.created', 'desc').get()
          .then(snapshot => {
            let oneclicks = {}
            snapshot.docs.forEach(doc => {
              let oneclick = doc.data()
              oneclick.id = doc.id
              oneclicks[doc.id] = oneclick
            })
            commit('setOneClick', {...oneclicks})
            commit('LOADING', false)
            console.log('Fetched: one click')
          })
          .catch(err => dispatch('LOG', err))
      },
    addOneClick:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        firebase.firestore().collection('oneclick').add(payload)
          .then((docRef) => {
            let oneclickIds = getters.user.oneclick
            oneclickIds.push(docRef.id)
            return firebase.firestore().collection('users').doc(getters.user.uid).update({oneclick: oneclickIds})
          })
          .then(() => {
            commit('LOADING', false)
            Notification({
              title: 'Поздравляем!',
              message: 'Ваша заявка доставлена! Мы свяжемся с Вами в ближайшее время.',
              type: 'success',
              showClose: true,
              duration: 10000,
              offset: 50
            })
          })
          .catch(err => dispatch('LOG', err))
      },
    updateOneClick:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        let oneclick = getters.oneclick
        firebase.firestore().collection('oneclick').doc(payload.id).update(payload.updateData)
          .then(() => {
            if (payload.updateData.status === 'pending') { // processed oneclick
              return firebase.firestore().collection('products')
                .doc(payload.productId).update({totalQty: payload.totalQty > 0 ? payload.totalQty : 0})
            }
          })
          .then(() => {
            delete oneclick[payload.id]
            console.log('One Click updated')
            commit('setOneClick', {...oneclick})
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    fetchOneClickStatistics:
      ({commit, dispatch}) => {
        firebase.firestore().collection('statistics').doc('oneclick').get()
          .then(snapshot => {
            console.log('Statistics: for one click')
            commit('oneClickStatistics', snapshot.data())
          })
          .catch(err => dispatch('LOG', err))
      }
  },
  getters: {
    oneclick:
      state => {
        return state.oneclick
      },
    oneClickStatistics:
      state => {
        return state.oneClickStatistics
      }
  }
}
