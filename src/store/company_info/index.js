import * as firebase from 'firebase'

export default {
  state: {
    companyInfo: null
  },
  mutations: {
    setCompanyInfo:
      (state, payload) => {
        state.companyInfo = payload
      }
  },
  actions: {
    fetchCompanyInfo:
      ({commit}) => {
        commit('LOADING', true)
        firebase.firestore().collection('companyInfo').get()
          .then(snapshot => {
            let companyInfo = {}
            snapshot.docs.forEach(doc => {
              companyInfo[doc.id] = doc.data()
            })
            commit('setCompanyInfo', companyInfo)
            console.log('Fetched: company info')
            commit('LOADING', false)
          })
          .catch(err => {
            console.log(err)
            commit('LOADING', false)
          })
      },
    updateCompanyInfo:
      ({commit, getters}, payload) => {
        commit('LOADING', true)
        let companyInfo = getters.companyInfo
        firebase.firestore().collection('companyInfo').doc(payload.document).update({[payload.field]: payload.value})
          .then(() => {
            companyInfo[payload.document][payload.field] = payload.value
            console.log('Company info updated')
            commit('setCompanyInfo', companyInfo)
            commit('LOADING', false)
          })
          .catch(err => {
            console.log(err)
            commit('LOADING', false)
          })
      }
  },
  getters: {
    companyInfo:
      state => {
        return state.companyInfo
      }
  }
}
