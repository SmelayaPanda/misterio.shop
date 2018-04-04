const productHandlers = require('algoliasearch');
// DON'T FORGET SEE WHAT PRODUCT UPDATED AFTER CREATION!
// TODO: not update algolia index if it totalQty update
exports.handler = function (change, context, functions) {
  console.log(CONST.LOG_DELIMITER)
  let after = change.after.data()
  let before = change.before.data()
  let productId = context.params.productId
  return new Promise((resolve, reject) => {

    if (
      after.title === before.title &&
      after.description === before.description &&
      after.group === before.group &&
      after.category === before.category &&
      after.brand === before.brand &&
      after.color === before.color &&
      after.SKU === before.SKU
    ) {
      console.log('No fields to update Algolia index!')
      return true
    } else {
      const ALGOLIA_INDEX_NAME = 'e_store_products';
      const ALGOLIA_ID = functions.config().algolia.app_id;
      const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
      const client = productHandlers(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
      const index = client.initIndex(ALGOLIA_INDEX_NAME);

      let product = {}
      product.objectID = productId
      product.title = after.title
      product.description = after.description
      product.group = after.group
      product.category = after.category
      product.brand = after.brand
      product.color = after.color
      product.SKU = after.SKU
      // Write to the algolia index
      return index.saveObject(product, (err) => {
        if (err) {
          reject(err)
        } else {
          console.log(`Algolia: Object ${productId} updated!`)
          resolve()
        }
      })
    }
  })
}
