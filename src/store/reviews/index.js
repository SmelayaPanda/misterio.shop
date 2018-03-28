import * as firebase from 'firebase'

export default {
  state: {
    reviews: [],
    reviewStatistics: {
      newReview: 0,
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
      ({commit}, payload) => {
        commit('LOADING', true)
        let query = firebase.firestore().collection('reviews')
        if (payload.status) {
          query = query.where('status', '==', payload.status)
        }
        query.get()
          .then(snapshot => {
            let reviews = []
            snapshot.docs.forEach(doc => {
              let item = doc.data()
              item.id = doc.id
              reviews.push(item)
            })
            commit('setReviews', reviews)
            commit('LOADING', false)
            console.log('Fetched: reviews')
          })
          .catch(
            error => {
              console.log(error)
              commit('LOADING', false)
            })
      },
    addReview:
      ({commit, getters}, payload) => {
        commit('LOADING', true)
        firebase.firestore().collection('reviews').add(payload)
          .then((docRef) => {
            let reviews = getters.reviews
            reviews[docRef.id] = payload
            commit('setReviews', reviews)
            commit('LOADING', false)
            console.log('Review added')
          })
          .catch(err => {
            console.log(err)
            commit('LOADING', false)
          })
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
          .catch(err => {
            console.log(err)
            commit('LOADING', false)
          })
      },
    fetchReviewStatistics:
      ({commit}) => {
        firebase.firestore().collection('statistics').doc('reviews').get()
          .then(snapshot => {
            console.log('Statistics: for reviews')
            commit('reviewStatistics', snapshot.data())
          })
          .catch(err => {
            console.log(err)
          })
      }
  },
  getters: {
    reviews:
      state => {
        return state.reviews
      },
    reviewById:
      state => (id) => {
        return state.reviews.find(el => {
          return el.id === id
        })
      },
    reviewStatistics:
      state => {
        return state.reviewStatistics
      }
  }
}
