exports.handleUnreadMsg = function (event, admin, transporter) {
  console.log(LOG_DELIMITER)
  sendEmailNotificationToAdmin(transporter, event.data.val())
    .then(() => {
      return admin.database().ref(`unreadLiveChat/${event.params.msgId}`).remove()
    })
    .then(() => {
      console.log('Message handled')
      return true
    })
    .catch(err => {
      console.log(err)
    })
}


let sendEmailNotificationToAdmin = function (transporter, info) {
  return new Promise(((resolve, reject) => {
    let mailOptions = {
      from: ADMIN_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Re:High Store notification: new live chat message`,
      text:
        `New message from ${info.from}:
        "${info.msg.trim()}"
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error)
      } else {
        resolve('Email sent: ' + info.response)
      }
    });
  }))
}
