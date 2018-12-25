import * as firebase from 'firebase'
import {Notification} from 'element-ui'

export default {
  state: {
    reviews: {},
    reviewStatistics: {
      created: 0,
      published: 0,
      archived: 0,
      totalReviews: 0
    }
  },
  mutations: {
    setReviews:
      (state, payload) => {
        state.reviews = payload
      },
    reviewStatistics:
      (state, payload) => {
        state.reviewStatistics = payload
      }
  },
  actions: {
    fetchReviews:
      ({commit, dispatch}, payload) => {
        commit('LOADING', true)
        let query = firebase.firestore().collection('reviews')
        if (payload.status) {
          query = query.where('status', '==', payload.status)
        }
        query.get()
          .then(snapshot => {
            let reviews = {}
            snapshot.docs.forEach(doc => {
              reviews[doc.id] = doc.data()
              reviews[doc.id].id = doc.id
            })
            commit('setReviews', {...reviews})
            commit('LOADING', false)
            console.log('Fetched: reviews')
          })
          .catch(err => dispatch('LOG', err))
      },
    addReview:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        payload.userId = getters.user.uid
        firebase.firestore().collection('reviews').add(payload)
          .then(() => {
            commit('LOADING', false)
            console.log('Review added')
            Notification({
              title: 'Спасибо',
              message: 'Ваш отзыв будет опубликован после прохождения модерации!',
              type: 'success',
              showClose: true,
              duration: 10000,
              offset: 50
            })
          })
          .catch(err => dispatch('LOG', err))
      },
    updateReview:
      ({commit, dispatch}, payload) => {
        commit('LOADING', true)
        firebase.firestore().collection('reviews').doc(payload.reviewId).update(payload.updateData)
          .then(() => {
            dispatch('fetchReviews', {status: payload.oldStatus})
            commit('LOADING', false)
            console.log('Review updated')
          })
          .catch(err => dispatch('LOG', err))
      },
    fetchReviewStatistics:
      ({commit, dispatch}) => {
        firebase.firestore().collection('statistics').doc('reviews').get()
          .then(snapshot => {
            console.log('Statistics: for reviews')
            commit('reviewStatistics', snapshot.data())
          })
          .catch(err => dispatch('LOG', err))
      }
  },
  getters: {
    reviews:
      state => {
        return state.reviews
      },
    reviewStatistics:
      state => {
        return state.reviewStatistics
      }
  }
}
