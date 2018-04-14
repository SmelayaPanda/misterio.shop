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
      },
      photos: {
        img_0: '',
        img_1: '',
        img_2: '',
        img_3: '',
        img_4: '',
        img_5: ''
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
      },
    editCompanyPhotos:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        let companyInfo = getters.companyInfo
        let images = payload.images
        let uploadImage = function (name, image) {
          return firebase.storage().ref('company/' + name).put(image)
            .then(fileData => {
              let imageUrl = fileData.metadata.downloadURLs[0]
              firebase.firestore().collection('companyInfo').doc('photos').update({[name]: imageUrl})
              companyInfo.photos[name] = imageUrl
            })
        }
        let actions = []
        for (let img in images) {
          actions.push(uploadImage(img, images[img]))
        }
        return Promise.all(actions)
          .then(() => {
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
