exports.updateOrderHandler = function (event, admin) {
  console.log(LOG_DELIMITER)
  let payPending = 0
  let sentPending = 0
  let sent = 0
  let delivered = 0
  let refused = 0
  let totalOrders = 0
  return admin.firestore().collection('orders').get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        if (doc.data().status === 'payPending') {
          payPending += 1
        } else if (doc.data().status === 'sentPending') {
          sentPending += 1
        } else if (doc.data().status === 'sent') {
          sent += 1
        } else if (doc.data().status === 'delivered') {
          delivered += 1
        } else if (doc.data().status === 'refused') {
          refused += 1
        }
        totalOrders++
      })
      return admin.firestore().collection('statistics').doc('orders').update({
        payPending: payPending,
        sentPending: sentPending,
        sent: sent,
        delivered: delivered,
        refused: refused,
        totalOrders: totalOrders
      })
    })
    .then(() => {
      console.log('Statistics: orders data updated!')
      return true
    })
    .catch(err => {
      console.log(err)
    })
}
