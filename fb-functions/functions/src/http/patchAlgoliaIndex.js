const algoliaSearch = require('algoliasearch');
exports.handler = function (req, res, admin) {

  const client = algoliaSearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
  const index = client.initIndex(ALGOLIA_INDEX_NAME);

  console.log(CONST.LOG_DELIMITER)
  let products = []
  return admin.firestore().collection('products').get()
    .then((snap) => {
        snap.docs.forEach(doc => {
          let p = {}
          if (doc.data().productId) {
            p.objectID = doc.data().productId
            p.price = doc.data().price ? doc.data().price : ''
            p.size = doc.data().size ? doc.data().size : ''
            p.creationDate = doc.data().creationDate ? doc.data().creationDate : ''
            products.push(p)
          }
        })
        return index.partialUpdateObjects(products, false, (err) => {
          if (err) {
            console.error(err)
            return res.status(200).send('Fail')
          } else {
            console.log(`Algolia: partial update success!`)
            return res.status(200).send('OK')
          }
        })
      })
}

