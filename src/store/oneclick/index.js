import * as firebase from 'firebase'
import {Notification} from 'element-ui'

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
      ({commit, dispatch}, payload) => {
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
          .catch(err => dispatch('LOG', err))
      },
    addOneClick:
      ({commit, getters}, payload) => {
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
          .catch(() => {
            commit('LOADING', false)
            Notification({
              title: 'Ахх...',
              message:
              'Что-то пошло не так. ' +
              'Если проблема повторяется, пожалуйста, ' +
              'сообщите в отдел технической поддержки по почте SmelayaPandaGM@gmail.com',
              type: 'error',
              showClose: true,
              duration: 100000,
              offset: 50
            })
          })
      },
    updateOneClick:
      ({commit, getters, dispatch}, payload) => {
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
