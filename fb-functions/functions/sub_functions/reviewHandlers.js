exports.updateReviewHandler = function (event, admin) {
  console.log(LOG_DELIMITER)
  let newReview = 0
  let published = 0
  let archived = 0
  let totalReviews = 0
  return admin.firestore().collection('reviews').get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        if (doc.data().status === 'new') {
          newReview += 1
        } else if (doc.data().status === 'published') {
          published += 1
        } else if (doc.data().status === 'archived') {
          archived += 1
        }
        totalReviews++
      })
      return admin.firestore().collection('statistics').doc('reviews').update({
        newReview: newReview,
        published: published,
        archived: archived,
        totalReviews: totalReviews
      })
    })
    .then(() => {
      console.log('Statistics: reviews data updated!')
      return true
    })
    .catch(err => {
      console.log(err)
    })
}
// TODO: Send msg
