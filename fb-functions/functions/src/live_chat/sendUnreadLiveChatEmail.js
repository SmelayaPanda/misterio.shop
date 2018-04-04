exports.handler = function (snap, context, admin, transporter) {
  console.log(CONST.LOG_DELIMITER)
  return sendEmailNotificationToAdmin(transporter, snap.val())
    .then(() => {
      return admin.database().ref(`unreadLiveChat/${context.params.msgId}`).remove()
    })
    .then(() => {
      console.log('Message handled!')
      return true
    })
    .catch(err => err)
}


let sendEmailNotificationToAdmin = function (transporter, info) {
  return new Promise(((resolve, reject) => {
    let mailOptions = {
      from: ADMIN_EMAIL,
      to: ADMIN_EMAIL,
      subject: 'LiveChat',
      text:
        `Новое сообщение от ${info.from}:
        "${info.msg.trim()}"
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error)
      } else {
        resolve('Email sent: ' + info.response)
      }
    })
  }))
}
