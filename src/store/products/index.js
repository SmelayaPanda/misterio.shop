import * as firebase from 'firebase'
import 'firebase/firestore'
import algoliasearch from 'algoliasearch'

export default {
  state: {
    products: {},
    productStatistics: { // auto updated from cloud function
      maxPrice: 1000000,
      avgPrice: 0,
      uniqueProductQty: 0,
      totalProductQty: 0,
      totalStoreCoast: 0
    },
    lastVisible: null, // value means load more button is available
    productFilters: {
      minPrice: 0,
      maxPrice: 0,
      group: '',
      category: '',
      country: '',
      brand: '',
      color: '',
      material: '',
      sortByPrice: 'desc',
      limit: 15
    },
    algoliaSearchText: ''
  },
  mutations: {
    setProducts:
      (state, payload) => {
        state.products = payload
      },
    setLastVisible:
      (state, payload) => {
        state.lastVisible = payload
      },
    productFilters:
      (state, payload) => {
        state.productFilters = payload
      },
    algoliaSearchText:
      (state, payload) => {
        state.algoliaSearchText = payload
      },
    productStatistics:
      (state, payload) => {
        state.productStatistics = payload
      }
  },
  actions: {
    fetchProducts:
      ({commit, getters, dispatch}) => {
        if (getters.algoliaSearchText) {
          return dispatch('algoliaSearch', getters.algoliaSearchText)
        }
        commit('LOADING', true)
        let filter = getters.productFilters
        let query = firebase.firestore().collection('products')
        if (filter.maxPrice) {
          query = query
            .where('price', '>=', filter.minPrice)
            .where('price', '<=', filter.maxPrice)
        }
        if (filter.group) {
          query = query.where('group', '==', filter.group)
        }
        if (filter.category) {
          query = query.where('category', '==', filter.category)
        }
        if (filter.country) {
          query = query.where('originCountry', '==', filter.country)
        }
        if (filter.brand) {
          query = query.where('brand', '==', filter.brand)
        }
        if (filter.color) {
          query = query.where('color', '==', filter.color)
        }
        if (filter.material) {
          query = query.where('material', '==', filter.material)
        }
        query = query.orderBy('price', filter.sortByPrice)
        if (getters.lastVisible) {
          query = query.startAfter(getters.lastVisible)
        }

        query.limit(filter.limit).get()
          .then((snap) => {
            let products
            if (getters.lastVisible && !getters.algoliaSearchText) {
              products = getters.products ? getters.products : {}
            } else {
              products = {}
            }
            if (snap.size === filter.limit) {
              commit('setLastVisible', snap.docs[snap.docs.length - 1])
            } else {
              commit('setLastVisible', null)
            }
            snap.docs.forEach(doc => {
              products[doc.id] = doc.data()
            })
            commit('setProducts', {...products})
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    productFilters:
      ({commit, getters}, payload) => {
        commit('productFilters', payload)
      },
    algoliaSearch:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        const ALGOLIA_APP_ID = '2CVO44WQ94'
        const ALGOLIA_SEARCH_KEY = '68d8a98b0c136d3dbd0a799949007e8d'
        const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY)
        let index
        if (process.env.NODE_ENV === 'production') {
          index = client.initIndex('MISTERIO-PROD-PRODUCTS')
        } else if (process.env.NODE_ENV === 'development') {
          index = client.initIndex('e_store_products')
        }
        index
          .search({
            query: payload
          })
          .then(responses => {
            let resp = responses.hits
            let actions = []
            let fetchProduct = function (id) {
              return firebase.firestore().collection('products').doc(id).get()
            }
            for (let product in resp) {
              actions.push(fetchProduct(resp[product].objectID))
            }
            return Promise.all(actions)
          })
          .then((snap) => {
            let products = {}
            let filter = getters.productFilters
            for (const doc of snap) {
              let product = doc.data()
              let isValidProduct = true
              if (isValidProduct && filter.maxPrice) {
                isValidProduct = product.price <= filter.maxPrice
              }
              if (isValidProduct && filter.minPrice) {
                isValidProduct = product.price >= filter.minPrice
              }
              if (isValidProduct && filter.group) {
                isValidProduct = product.group === filter.group
              }
              if (isValidProduct && filter.category) {
                isValidProduct = product.category === filter.category
              }
              if (isValidProduct && filter.country) {
                isValidProduct = product.country === filter.country
              }
              if (isValidProduct && filter.brand) {
                isValidProduct = product.brand === filter.brand
              }
              if (isValidProduct && filter.color) {
                isValidProduct = product.color === filter.color
              }
              if (isValidProduct && filter.material) {
                isValidProduct = product.material === filter.material
              }
              if (isValidProduct) {
                products[product.productId] = product
              }
            }
            // TODO: sort object by price
            // if (filter.sortByPrice === 'asc') {
            //   snap = snap.sort((a, b) => a.price > b.price)
            // } else {
            //   snap = snap.sort((a, b) => a.price < b.price)
            // }
            commit('setProducts', {...products})
            commit('LOADING', false)
            commit('algoliaSearchText', payload)
            commit('setLastVisible', null)
          })
          .catch(err => dispatch('LOG', err))
      },
    setLastVisible:
      ({commit}, payload) => {
        commit('setLastVisible', payload)
      },
    addNewProduct:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        let products = getters.products ? getters.products : {}
        let updateData
        firebase.firestore().collection('products').add(payload)
          .then(snap => {
            updateData = {
              // add productId field for quick access anywhere
              productId: snap.id,
              // Cloud function fill up it!
              img_0: {original: '', thumbnail: '', card: ''},
              img_1: {original: '', thumbnail: '', card: ''},
              img_2: {original: '', thumbnail: '', card: ''},
              img_3: {original: '', thumbnail: '', card: ''},
              img_4: {original: '', thumbnail: '', card: ''}
            }
            let newProduct = {[snap.id]: Object.assign(updateData, payload)}
            products = Object.assign(newProduct, products)
            // products[snap.id] = Object.assign(updateData, payload)
            return firebase.firestore().collection('products').doc(snap.id).update(updateData)
          })
          .then(() => {
            commit('setProducts', {...products})
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    editProduct:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        firebase.firestore().collection('products').doc(payload.productId).update(payload)
          .then(() => {
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    editProductImage:
      ({commit, dispatch}, payload) => {
        commit('LOADING', true)
        dispatch('subscribeToSubImagesCreation', payload.productId)
        let images = payload.images
        let uploadImage = function (name, image) {
          return firebase.storage().ref('products/' + payload.productId + '/' + name).put(image)
        }
        let actions = []
        for (let img in images) {
          actions.push(uploadImage(img, images[img]))
        }
        return Promise.all(actions)
          .then(() => {
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    subscribeToSubImagesCreation: // realtime change images
      ({commit, getters}, payload) => {
        let products = getters.products
        firebase.firestore().collection('products').doc(payload)
          .onSnapshot(doc => {
            products[doc.id] = doc.data()
            commit('setProducts', {...products})
          })
      },
    deleteProduct:
      ({commit, getters, dispatch}, payload) => {
        commit('LOADING', true)
        let products = getters.products
        firebase.firestore().collection('products').doc(payload).delete()
          .then(() => {
            let product = products[payload]
            let images = [] // images names
            for (let i = 0; i < 5; i++) {
              if (product['img_' + i].original !== '') {
                images.push('img_' + i)
                images.push('card_img_' + i)
                images.push('thumb_img_' + i)
              }
            }
            let deleteImage = function (name) {
              return firebase.storage().ref('products/' + payload + '/' + name).delete()
            }
            let actions = images.map(deleteImage)
            return Promise.all(actions)
          })
          .then(() => {
            delete products[payload]
            commit('setProducts', {...products})
            commit('LOADING', false)
          })
          .catch(err => dispatch('LOG', err))
      },
    fetchProductStatistics:
      ({commit, dispatch}) => {
        firebase.firestore().collection('statistics').doc('products').get()
          .then(snapshot => {
            console.log('Statistics: for products')
            commit('productStatistics', snapshot.data())
          })
          .catch(err => dispatch('LOG', err))
      }
  },
  // Getters  ---------------------------------------------------
  getters: {
    products:
      state => {
        return state.products
      },
    lastVisible:
      state => {
        return state.lastVisible
      },
    productFilters:
      state => {
        return state.productFilters
      },
    algoliaSearchText:
      state => {
        return state.algoliaSearchText
      },
    productStatistics:
      state => {
        return state.productStatistics
      }
  }
}
