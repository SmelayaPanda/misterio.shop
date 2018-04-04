exports.handler = function (userMetadata, context, admin) {
  console.log(CONST.LOG_DELIMITER)
  console.log(userMetadata)
  let userStatRef = admin.firestore().collection('statistics').doc('user')
  let newCount
  return admin.firestore().runTransaction(t => {
    return t.get(userStatRef)
      .then(doc => {
        newCount = doc.data().count + 1
        return t.update(userStatRef, {count: newCount})
      })
      .then(() => {
        return admin.firestore().collection('users').doc(userMetadata.uid).update({userNo: newCount})
      })
      .then(() => {
        console.log(`New user created! No.: ${newCount} / id: ${userMetadata.uid} created`)
        return true
      })
      .catch(err => {
        console.log(err)
      })
  })
}

