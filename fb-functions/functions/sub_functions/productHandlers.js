const productHandlers = require('algoliasearch');
// DON'T FORGET SEE WHAT PRODUCT UPDATED AFTER CREATION!
// TODO: not update algolia index if it totalQty update
exports.updateProductHandler = function (event, functions, admin) {
  console.log(LOG_DELIMITER)
  return Promise.all([
    updateProductStatistics(event, admin),
    updateAlgoliaIndex(functions, event, 'update')
  ])
    .then(val => {
      return val
    })
    .catch(err => {
      console.log(err)
    })
}

exports.deleteProductHandler = function (event, functions, admin) {
  console.log(LOG_DELIMITER)
  return Promise.all([
    updateProductStatistics(event, admin),
    updateAlgoliaIndex(functions, event, 'delete')
  ])
    .then(val => {
      return val
    })
    .catch(err => {
      console.log(err)
    })
}


// App ID and API Key are stored in functions config variables
// firebase functions:config:set algolia.app_id="<YOUR-ALGOLIA-APP-ID>"
// firebase functions:config:set algolia.api_key="<YOUR-ALGOLIA-APP-PUBLIC-KEY>"
let updateAlgoliaIndex = function (functions, event, operation) {
  return new Promise((resolve, reject) => {
    const ALGOLIA_INDEX_NAME = 'e_store_products';
    const ALGOLIA_ID = functions.config().algolia.app_id;
    const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
    const client = productHandlers(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    if (operation === 'update') {
      // Get the product document
      console.log(event.data.data())
      let product = {}
      product.objectID = event.params.productId;
      product.title = event.data.data().title
      product.description = event.data.data().description
      product.group = event.data.data().group
      product.brand = event.data.data().brand
      product.category = event.data.data().category
      product.color = event.data.data().color
      product.SKU = event.data.data().SKU
      // Write to the algolia index
      return index.saveObject(product, (err) => {
        if (err) {
          reject(err)
        } else {
          console.log(`Algolia: Object ${event.params.productId} updated!`)
          resolve()
        }
      });
    } else { // delete operation
      return index.deleteObject(event.params.productId, (err) => {
        if (err) {
          reject(err)
        } else {
          console.log(`Algolia: Object ${event.params.productId} deleted!`)
          resolve()
        }
      });
    }
  })
}

function updateProductStatistics(event, admin) {
  admin.firestore().collection('products').get()
    .then(snapshot => {
      let maxPrice = 0
      let totalPrice = 0
      let totalStoreCoast = 0
      let totalProductQty = 0
      let i = 0
      snapshot.docs.forEach(doc => {
        i++
        totalPrice += doc.data().price
        totalStoreCoast += doc.data().price * doc.data().totalQty
        totalProductQty += doc.data().totalQty
        if (doc.data().price > maxPrice) {
          maxPrice = doc.data().price
        }
      })
      let avgPrice = totalPrice / i
      return admin.firestore().collection('statistics').doc('products').update({
        maxPrice: maxPrice,
        avgPrice: Number((avgPrice).toFixed(2)),
        uniqueProductQty: i,
        totalProductQty: totalProductQty,
        totalStoreCoast: totalStoreCoast
      })
    })
    .then(() => {
      console.log('Statistics: product data updated!')
      return true
    })
    .catch(err => {
      console.log(err)
    })
}
