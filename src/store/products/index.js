import * as firebase from 'firebase'
import 'firebase/firestore'
import algoliasearch from 'algoliasearch'

export default {
  state: {
    products: [],
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
      brand: '',
      color: '',
      sortAsc: true,
      limit: 6
    },
    algoliaSearchText: '',
    algoliaSearchProductIds: []
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
    algoliaSearchProductIds:
      (state, payload) => {
        state.algoliaSearchProductIds = payload
      },
    productStatistics:
      (state, payload) => {
        state.productStatistics = payload
      }
  },
  actions: {
    fetchProducts:
      ({commit, getters}) => {
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
        if (filter.brand) {
          query = query.where('brand', '==', filter.brand)
        }
        if (filter.color) {
          query = query.where('color', '==', filter.color)
        }
        query = query.orderBy('price', filter.sortAsc ? 'asc' : 'desc')
        if (getters.lastVisible) {
          query = query.startAfter(getters.lastVisible)
        }
        if (filter.limit && !getters.algoliaSearchText) { // no limit with algoliaText
          query = query.limit(filter.limit)
        }

        query.get()
          .then((snapshot) => {
            let products
            if (getters.lastVisible && !getters.algoliaSearchText) {
              products = getters.products
            } else {
              products = []
            }
            if (snapshot.size === filter.limit) {
              commit('setLastVisible', snapshot.docs[snapshot.docs.length - 1])
            } else {
              commit('setLastVisible', null)
            }
            snapshot.docs.forEach(doc => {
              products.push(doc.data())
            })
            // Algolia filter
            if (getters.algoliaSearchText) {
              products = products.filter(el => {
                return getters.algoliaSearchProductIds.indexOf(el.productId) !== -1
              })
              commit('setLastVisible', null) // no limit records with algolia search
            }
            commit('setProducts', products)
            commit('LOADING', false)
          })
          .catch(err => {
            console.log(err)
            commit('LOADING', false)
          })
      },
    productFilters:
      ({commit, getters}, payload) => {
        commit('productFilters', payload)
      },
    algoliaSearch: // intersect with fb data as filter
      ({commit, dispatch}, payload) => {
        commit('LOADING', true)
        const ALGOLIA_APP_ID = '2CVO44WQ94'
        const ALGOLIA_SEARCH_KEY = '68d8a98b0c136d3dbd0a799949007e8d'
        const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY)
        const index = client.initIndex('e_store_products')
        let objectIds = []
        index
          .search({
            query: payload
          })
          .then(responses => {
            let resp = responses.hits
            for (let product in resp) {
              objectIds.push(resp[product].objectID)
            }
          })
          .then(() => {
            commit('LOADING', false)
            commit('algoliaSearchText', payload)
            commit('algoliaSearchProductIds', objectIds)
            commit('setLastVisible', null)
            dispatch('fetchProducts')
          })
          .catch(err => {
            commit('LOADING', false)
            console.log(err)
          })
      },
    setLastVisible:
      ({commit}, payload) => {
        commit('setLastVisible', payload)
      },
    addNewProduct:
      ({commit, getters}, payload) => {
        commit('LOADING', true)
        let productId
        firebase.firestore().collection('products').add(payload)
          .then(data => {
            productId = data.id
            let updateData = {
              productId: productId,
              // For quick access in admin table.
              // Cloud function fill up it!
              img_0: {original: '', thumbnail: '', card: ''},
              img_1: {original: '', thumbnail: '', card: ''},
              img_2: {original: '', thumbnail: '', card: ''},
              img_3: {original: '', thumbnail: '', card: ''},
              img_4: {original: '', thumbnail: '', card: ''}
            }
            return firebase.firestore().collection('products').doc(productId).update(updateData)
          })
          .then(() => {
            commit('LOADING', false)
            window.location.reload() // TODO: fix it
          })
          .catch(err => {
            console.log(err)
            commit('LOADING', false)
          })
      },
    editProduct:
      ({commit, getters}, payload) => {
        commit('LOADING', true)
        firebase.firestore().collection('products').doc(payload.productId).update(payload)
          .then(() => {
            console.log('Product edited')
            commit('LOADING', false)
          })
          .catch(err => {
            console.log(err)
            commit('LOADING', false)
          })
      },
    editProductImage:
      ({commit, getters}, payload) => {
        commit('LOADING', true)
        let images = payload.images
        delete payload.images
        let uploadImage = function (name, image) {
          return firebase.storage().ref('products/' + payload.productId + '/' + name).put(image)
        }
        let actions = []
        for (let img in images) {
          actions.push(uploadImage(img, images[img]))
        }
        console.log(actions)
        return Promise.all(actions)
          .then(() => {
            commit('LOADING', false)
            window.location.reload() // TODO: fix it
          })
          .catch((error) => {
            console.log(error)
            commit('LOADING', false)
          })
      },
    deleteProduct:
      ({commit, getters}, payload) => {
        commit('LOADING', true)
        firebase.firestore().collection('products').doc(payload).delete()
          .then(() => {
            let product = getters.productById(payload)
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
            console.log('Product was removed')
            commit('LOADING', false)
            window.location.reload() // TODO: fix it!
          })
          .catch(err => {
            console.log(err)
            commit('LOADING', false)
          })
      },
    fetchProductStatistics:
      ({commit}) => {
        firebase.firestore().collection('statistics').doc('products').get()
          .then(snapshot => {
            console.log('Statistics: for products')
            commit('productStatistics', snapshot.data())
          })
          .catch(err => {
            console.log(err)
          })
      }
  },
  // Getters  ---------------------------------------------------
  getters: {
    products:
      state => {
        return state.products
      },
    productById:
      state => (productId) => {
        return state.products.find(p => {
          return p.productId === productId
        })
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
    algoliaSearchProductIds:
      state => {
        return state.algoliaSearchProductIds
      },
    productStatistics:
      state => {
        return state.productStatistics
      }
  }
}
