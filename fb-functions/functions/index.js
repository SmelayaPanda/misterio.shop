'use strict'
// STORAGE
const createProductSubImages = require('./src/storage/createProductSubImages')
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
// HTTP
const processPayPal = require('./src/http/processPayPal')

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// GLOBAL CONST
global.CONST = require('./src/constants')
// firebase functions:config:set algolia.app_id="<YOUR-ALGOLIA-APP-ID>"
// firebase functions:config:set algolia.api_key="<YOUR-ALGOLIA-APP-PUBLIC-KEY>"
// firebase functions:config:set admin.email="SmelayaPandaGM@gmail.com"
// firebase functions:config:set admin.password="***"
global.ADMIN_EMAIL = functions.config().admin.email
global.ADMIN_PASS = functions.config().admin.password
let nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
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

// HTTP
exports.processPayPal = functions
  .https
  .onRequest((req, res) => {
    processPayPal.handler(req, res, admin, transporter)
  })

// DATABASE
// oneclick
exports.onCreateOneClick = functions.firestore
  .document('oneclick/{oneClickId}')
  .onCreate((snap, context) => {
    return sendOneClickNotification.handler(snap, context, transporter)
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
    return sendOrderNotification.handler(snap, context, transporter)
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
    return sendReviewNotification.handler(snap, context, transporter)
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
  return sendUnreadLiveChatEmail.handler(snap, context, admin, transporter)
})

// onWrite = created, updated, or deleted
