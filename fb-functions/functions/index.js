'use strict'
// STORAGE
const createProductSubImages = require('./src/storage/createProductSubImages')
// AUTH
const onUserCreate = require('./src/auth/onUserCreate')
// DB
const updateOneClickStatistics = require('./src/db/updateOneClickStatistics')
const sendOneClickNotification = require('./src/db/sendOneClickNotification')
const updateOrdersStatistics = require('./src/db/updateOrdersStatistics')
const sendOrderNotification = require('./src/db/sendOrderNotification')
// HTTP
const processPayPal = require('./src/http/processPayPal')


const productHandlers = require('./src/productHandlers')
const reviewHandlers = require('./src/reviewHandlers')
const liveChat = require('./src/liveChat')

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// GLOBAL CONST
global.CONST = require('./src/constants')
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
exports.onUserCreate = functions
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
exports.sendOneClickEmailNotification = functions
  .firestore.document('oneclick/{oneClickId}')
  .onCreate((snap, context) => {
    return sendOneClickNotification.handler(snap, context, admin, transporter)
  })
exports.updateOneClickStatistics = functions
  .firestore.document('oneclick/{oneClickId}')
  .onWrite((change, context) => {
    return updateOneClickStatistics.handler(change, context, admin)
  })

exports.sendOrderNotification = functions
  .firestore.document('orders/{orderId}')
  .onCreate((change, context) => {
    return sendOrderNotification.handler(change, context, admin, transporter)
  })
exports.updateOrdersStatistics = functions
  .firestore.document('orders/{orderId}')
  .onWrite((change, context) => {
    return updateOrdersStatistics.handler(change, context, admin)
  })

// PRODUCT HANDLERS:
// 1. ALGOLIA SEARCH
// 2. STATISTICS
// Now, product updated after insertion (.onWrite not necessary)
// exports.onProductUpdate = functions.firestore.document('products/{productId}').onUpdate(event => {
//   return productHandlers.updateProductHandler(event, functions, admin)
// })
// exports.onProductDelete = functions.firestore.document('products/{productId}').onDelete(event => {
//   return productHandlers.deleteProductHandler(event, functions, admin)
// })
//
//
// // ORDER HANDLERS:
// // 1. STATISTICS

//
// // ONE CLICK HANDLERS:

//
// // REVIEW HANDLERS:
// // 1. STATISTICS
// exports.onReviewWrite = functions.firestore.document('reviews/{reviewId}').onWrite(event => {
//   return reviewHandlers.updateReviewHandler(event, admin)
// })
//
// // HANDLE UNREAD LIVE CHAT MESSAGE
// exports.liveChatNewMsgNotification = functions.database.ref('unreadLiveChat/{msgId}').onCreate(event => {
//   return liveChat.handleUnreadMsg(event, admin, transporter)
// })

// onWrite = created, updated, or deleted
