const cors = require('cors')({origin: true});

exports.handler = function (req, res, admin, transporter) {
  console.log(LOG_DELIMITER)
  cors(req, res, () => {
    let info = req.body
    info.creationDate = new Date()
    info.status = 'created'
    admin.firestore().collection('oneclick').add(info)
      .then(() => {
        console.log('One click message added into database!', info)
        return Promise.all([
          sendOneClickEmailNotifyToAdmin(transporter, info),
          sendOneClickEmailNotifyToBuyer(transporter, info)
        ])
      })
      .then((data) => {
        console.log(data)
        return res.status(200).send('OK')
      })
      .catch(err => {
        console.log(err)
        return res.status(500).send('Error saving into database!')
      })
  });
}

let sendOneClickEmailNotifyToAdmin = function (transporter, info) {
  return new Promise(((resolve, reject) => {

    let mailOptions = {
      from: ADMIN_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New one click message from ${info.nickname}`,
      text:
        `Re:High Store One Click message:
     
       WHO:
       Nickname ........... ${info.nickname}
       Email .................. ${info.email}
       Phone ................. ${info.phone}
       UserId ............... ${info.userId}
       
       
       WANT TO BUY:
       SKU .................... ${info.product.SKU}
       Title ...................... ${info.product.title}
       Price .................... ${info.product.price} RUB
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


let sendOneClickEmailNotifyToBuyer = function (transporter, info) {
  return new Promise(((resolve, reject) => {
    console.log('To: ' + info.email)
    let mailOptions = {
      from: ADMIN_EMAIL,
      to: info.email,
      subject: `Re:High Store notification`,
      text:
        `${info.nickname}, thank you for ordering "${info.product.title} (${info.product.price} RUB)" on our website.
         
         Administrator will contact you by phone ${info.phone} in the near future to clarify the details.
         
         --------------------------------------
         Re:High Store
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
