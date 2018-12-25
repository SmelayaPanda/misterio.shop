'use strict'
// TO SWITCH prod/dev:
// $ firebase use prod/dev

// STORAGE
const createProductSubImages = require('./src/storage/createProductSubImages')
const createNewsThumbnail = require('./src/storage/createNewsThumbnail')
// AUTH
const onUserCreate = require('./src/auth/onUserCreate')
// DB
const updateOneClickStatistics = require('./src/db/oneclick/updateOneClickStatistics')
const sendOneClickNotification = require('./src/db/oneclick/sendOneClickNotification')
const updateOrdersStatistics = require('./src/db/orders/updateOrdersStatistics')
const sendOrderNotification = require('./src/db/orders/sendOrderNotification')
const updateReviewsStatistics = require('./src/db/reviews/updateReviewsStatistics')
const sendReviewNotification = require('./src/db/reviews/sendReviewNotification')
const updateProductStatistics = require('./src/db/products/updateProductStatistics')
const updateAlgoliaIndex = require('./src/db/products/updateAlgoliaIndex')
const deleteAlgoliaIndex = require('./src/db/products/deleteAlgoliaIndex')
const sendUnreadLiveChatEmail = require('./src/live_chat/sendUnreadLiveChatEmail')
const notifyDeveloperAboutError = require('./src/common/notifyDeveloperAboutError')
// HTTP
const processPayPal = require('./src/http/processPayPal')
const processYandexPayment = require('./src/http/processYandexPayment')
const createYandexPayment = require('./src/http/createYandexPayment')
// const patchAlgoliaIndex = require('./src/http/patchAlgoliaIndex')

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// GLOBAL CONST
global.CONST = require('./src/common/constants')
// firebase functions:config:set app.production="1/0"
// firebase functions:config:set algolia.app_id="<YOUR-ALGOLIA-APP-ID>"
// firebase functions:config:set algolia.api_key="<YOUR-ALGOLIA-ADMIN-KEY>"
// firebase functions:config:set algolia.product_idx="<YOUR-ALGOLIA-PRODUCT-IDX-NAME>" // 'e_store_products', "MISTERIO-PROD-PRODUCTS"

// firebase functions:config:set admin.email="shop.misterio@gmail.com"
// firebase functions:config:set admin.password="***"
// firebase functions:config:set developer.email="shop.misterio@gmail.com"
// firebase functions:config:set developer.password="***"

// TODO: set for prod
// firebase functions:config:set yandex.shopid="505***"      // settings: test shop id for dev / real for prod
// firebase functions:config:set yandex.secretkey="test_***" // settings: secret key id from test shop for dev / real for prod
global.IS_PRODUCTION = Number(functions.config().app.production) // 1 - true (misterio-prod), 0 - false (e-store-dev)
global.ADMIN_EMAIL = functions.config().admin.email
global.ADMIN_PASS = functions.config().admin.password
global.DEVELOPER_EMAIL = functions.config().developer.email
global.DEVELOPER_PASS = functions.config().developer.password
global.ALGOLIA_ID = functions.config().algolia.app_id;
global.ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
global.ALGOLIA_INDEX_NAME = functions.config().algolia.product_idx;
global.YANADEX_SHOPID = functions.config().yandex.shopid;
global.YANADEX_SECRET_KEY = functions.config().yandex.secretkey;

let nodemailer = require('nodemailer')
// Can be only one transporter instance
let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_PASS
  }
});

// *******************
// ALL CLOUD FUNCTIONS
// *******************
// AUTH
exports.onCreateUser = functions
  .auth.user()
  .onCreate((userMetadata, context) => {
    return onUserCreate.handler(userMetadata, context, admin)
  })

// STORAGE
exports.createProductSubImages = functions
  .storage.object()
  .onFinalize((object, context) => {
    return createProductSubImages.handler(object, context, admin)
  })
exports.createNewsThumbnail = functions
  .storage.object()
  .onFinalize((object, context) => {
    return createNewsThumbnail.handler(object, context, admin)
  })

// HTTP
exports.processPayPal = functions
  .https
  .onRequest((req, res) => {
    processPayPal.handler(req, res, admin, mailTransporter)
  })
exports.createYandexPayment = functions
  .https
  .onRequest((req, res) => {
    return createYandexPayment.handler(req, res, admin, mailTransporter)
  })
// exports.patchAlgoliaIndex = functions
//   .https
//   .onRequest((req, res) => {
//     return patchAlgoliaIndex.handler(req, res, admin)
//   })

exports.processYandexPayment = functions
  .https
  .onRequest((req, res) => {
    return processYandexPayment.handler(req, res, admin, mailTransporter)
  })
// DATABASE
// oneclick
exports.onCreateOneClick = functions.firestore
  .document('oneclick/{oneClickId}')
  .onCreate((snap, context) => {
    return sendOneClickNotification.handler(snap, context, mailTransporter)
  })
exports.onWriteOneClick = functions.firestore
  .document('oneclick/{oneClickId}')
  .onWrite((change, context) => {
    return updateOneClickStatistics.handler(change, context, admin)
  })
// order
exports.onCreateOrder = functions.firestore
  .document('orders/{orderId}')
  .onCreate((snap, context) => {
    return sendOrderNotification.handler(snap, context, mailTransporter)
  })
exports.onWriteOrder = functions.firestore
  .document('orders/{orderId}')
  .onWrite((change, context) => {
    return updateOrdersStatistics.handler(change, context, admin)
  })
// review
exports.onCreateReview = functions.firestore
  .document('reviews/{reviewId}')
  .onCreate((snap, context) => {
    return sendReviewNotification.handler(snap, context, mailTransporter)
  })
exports.onWriteReview = functions.firestore
  .document('reviews/{reviewId}')
  .onWrite((change, context) => {
    return updateReviewsStatistics.handler(change, context, admin)
  })
// Now, product updated after insertion (.onWrite not necessary)
exports.onUpdateProduct = functions.firestore
  .document('products/{productId}')
  .onUpdate((change, context) => {
    return Promise.all([
      updateProductStatistics.handler(change, context, admin),
      updateAlgoliaIndex.handler(change, context, functions)
    ])
  })
exports.onDeleteProduct = functions.firestore
  .document('products/{productId}')
  .onDelete((change, context) => {
    return deleteAlgoliaIndex.handler(change, context, functions)
  })
// live chat
exports.onCreateUnreadLiveChatMsg = functions
  .database.ref('unreadLiveChat/{msgId}')
  .onCreate((snap, context) => {
    return sendUnreadLiveChatEmail.handler(snap, context, admin, mailTransporter)
  })
// error log
exports.errLog = functions
  .database.ref('errLog/{oneClickId}')
  .onCreate((snap, context) => {
    return notifyDeveloperAboutError.handler(snap, context, mailTransporter)
  })

// onWrite = created, updated, or deleted
