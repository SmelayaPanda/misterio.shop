exports.onUserCreate = function (event, admin) {
  console.log(LOG_DELIMITER)
  const user = event.data
  let userStatRef = admin.firestore().collection('statistics').doc('user')
  let newCount
  return admin.firestore().runTransaction(t => {
    return t.get(userStatRef)
      .then(doc => {
        newCount = doc.data().count + 1
        return t.update(userStatRef, {count: newCount})
      })
      .then(() => {
        return admin.firestore().collection('users').doc(user.uid).update({
          userNo: newCount,
          accountCreationDate: new Date()
        })
      })
      .then(() => {
        console.log(`New user created! No.: ${newCount} / id: ${user.uid} created`)
        return true
      })
      .catch(err => {
        console.log(err)
      })
  })
}

