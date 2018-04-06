import * as firebase from 'firebase'

export default {
  state: {
    news: {} // article, sale
  },
  mutations: {
    setNews:
      (state, payload) => {
        state.news = payload
      }
  },
  actions: {
    loadNews:
      ({commit, dispatch}) => {
        commit('LOADING', true)
        firebase.firestore().collection('news').get()
          .then(snap => {
            let news = {}
            snap.docs.forEach(doc => {
              news[doc.id] = doc.data()
            })
            console.log(news)
            commit('setNews', news)
            commit('LOADING', false)
            console.log('Fetched: news data')
          })
          .catch(err => dispatch('LOG', err))
      },
    addNews:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        firebase.firestore().collection('news').add(payload)
          .then(docRef => {
            let news = getters.news
            news[docRef.id] = payload
            commit('setNews', {...news})
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    updateNewsInfo:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        firebase.firestore().collection('news').doc(payload.newsId).update(payload.updateData)
          .then(() => {
            let news = getters.news
            news[payload.newsId] = Object.assign(news[payload.newsId], payload.updateData)
            commit('setNews', {...news})
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    deleteNews:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        firebase.firestore().collection('news').doc(payload).delete()
          .then(() => {
            let news = getters.news
            delete news[payload]
            commit('setNews', {...news})
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      }
  },
  getters: {
    news:
      state => {
        return state.news
      },
    newsById:
      state => (newsId) => {
        return state.news[newsId]
      },
    showedNews:
      (state, getters) => getters.news.slice(0, 5)
  }
}
