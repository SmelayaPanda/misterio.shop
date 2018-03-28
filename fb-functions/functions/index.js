// Function for Handle IPN Notification
'use strict'
const processPayPal = require('./sub_functions/processPayPal')
const generateProductImages = require('./sub_functions/generateProductImages')
const oneClickNotification = require('./sub_functions/oneClickNotification')
const productHandlers = require('./sub_functions/productHandlers')
const orderHandlers = require('./sub_functions/orderHandlers')
const oneClickHandlers = require('./sub_functions/oneClickHandlers')
const reviewHandlers = require('./sub_functions/reviewHandlers')
const userHandlers = require('./sub_functions/userHandlers')
const liveChat = require('./sub_functions/liveChat')

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// firebase functions:config:set admin.email="SmelayaPandaGM@gmail.com"
// firebase functions:config:set admin.password="***"
global.ADMIN_EMAIL = functions.config().admin.email
global.ADMIN_PASS = functions.config().admin.password
global.LOG_DELIMITER = '>-------------------------------------------------------------------------------------------------------'
let nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_PASS
  }
});

// ---------------------------[ ALL FUNCTIONS ]---------------------------
exports.onUserCreate = functions.auth.user().onCreate(event => {
  return userHandlers.onUserCreate(event, admin)
})
// PAYPAL
exports.processPayPal = functions.https.onRequest((req, res) => {
  processPayPal.handler(req, res, admin, transporter)
})

// ONE CLICK
exports.oneClickNotification = functions.https.onRequest((req, res) => {
  oneClickNotification.handler(req, res, admin, transporter)
})

// PRODUCT IMAGES
exports.generateProductImages = functions.storage.object().onChange(event => {
  return generateProductImages.handler(event, admin)
})

// PRODUCT HANDLERS:
// 1. ALGOLIA SEARCH
// 2. STATISTICS
// Now, product updated after insertion (.onWrite not necessary)
exports.onProductUpdate = functions.firestore.document('products/{productId}').onUpdate(event => {
  return productHandlers.updateProductHandler(event, functions, admin)
})
exports.onProductDelete = functions.firestore.document('products/{productId}').onDelete(event => {
  return productHandlers.deleteProductHandler(event, functions, admin)
})


// ORDER HANDLERS:
// 1. STATISTICS
exports.onOrderWrire = functions.firestore.document('orders/{orderId}').onWrite(event => {
  return orderHandlers.updateOrderHandler(event, admin)
})

// ONE CLICK HANDLERS:
// 1. STATISTICS
exports.onOneCLickWrite = functions.firestore.document('oneclick/{oneClickId}').onWrite(event => {
  return oneClickHandlers.updateOneClickHandler(event, admin)
})

// REVIEW HANDLERS:
// 1. STATISTICS
exports.onReviewWrite = functions.firestore.document('reviews/{reviewId}').onWrite(event => {
  return reviewHandlers.updateReviewHandler(event, admin)
})

// HANDLE UNREAD LIVE CHAT MESSAGE
exports.liveChatNewMsgNotification = functions.database.ref('unreadLiveChat/{msgId}').onCreate(event => {
  return liveChat.handleUnreadMsg(event, admin, transporter)
})

// onWrite = created, updated, or deleted
