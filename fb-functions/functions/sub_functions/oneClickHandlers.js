exports.updateOneClickHandler = function (event, admin) {
  console.log(LOG_DELIMITER)
  let created = 0
  let sentPending = 0
  let sent = 0
  let delivered = 0
  let refused = 0
  let totalOneClick = 0
  return admin.firestore().collection('oneclick').get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        if (doc.data().status === 'created') {
          created += 1
        } else if (doc.data().status === 'sentPending') {
          sentPending += 1
        } else if (doc.data().status === 'sent') {
          sent += 1
        } else if (doc.data().status === 'delivered') {
          delivered += 1
        } else if (doc.data().status === 'refused') {
          refused += 1
        }
        totalOneClick++
      })
      return admin.firestore().collection('statistics').doc('oneclick').update({
        created: created,
        sentPending: sentPending,
        sent: sent,
        delivered: delivered,
        refused: refused,
        totalOneClick: totalOneClick
      })
    })
    .then(() => {
      console.log('Statistics: one click data updated!')
      return true
    })
    .catch(err => {
      console.log(err)
    })
}
