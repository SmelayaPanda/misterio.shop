import * as firebase from 'firebase'

export default {
  state: {
    companyInfo: {
      contacts: {
        phone: '',
        mobilePhone: '',
        email: ''
      },
      address: {
        country: '',
        city: '',
        street: '',
        build: '',
        house: '',
        postCode: ''
      },
      main: {
        INN: '',
        name: ''
      }
    }
  },
  mutations: {
    setCompanyInfo:
      (state, payload) => {
        state.companyInfo = payload
      }
  },
  actions: {
    fetchCompanyInfo:
      ({commit, dispatch}) => {
        commit('LOADING', true)
        firebase.firestore().collection('companyInfo').get()
          .then(snap => {
            let companyInfo = {}
            snap.docs.forEach(doc => {
              companyInfo[doc.id] = doc.data()
            })
            commit('setCompanyInfo', {...companyInfo})
            console.log('Fetched: company info')
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    updateCompanyInfo:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        let companyInfo = getters.companyInfo
        firebase.firestore().collection('companyInfo').doc(payload.document)
          .update({[payload.field]: payload.value})
          .then(() => {
            companyInfo[payload.document][payload.field] = payload.value
            console.log('Company info updated')
            commit('setCompanyInfo', {...companyInfo})
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      }
  },
  getters: {
    companyInfo:
      state => {
        return state.companyInfo
      }
  }
}
