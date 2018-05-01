exports.handler = function (snap, context, transporter) {
  console.log(CONST.LOG_DELIMITER)
  // TODO: not sent!
  let info = snap.data()
  console.log(info)
  return Promise.all([
    sendOneClickEmailNotifyToAdmin(transporter, info),
    sendOneClickEmailNotifyToBuyer(transporter, info)
  ])
    .then(data => data)
    .catch(err => err)
}

let sendOneClickEmailNotifyToAdmin = function (transporter, info) {
  return new Promise((resolve, reject) => {

    let mailOptions = {
      from: ADMIN_EMAIL,
      to: [ADMIN_EMAIL, DEVELOPER_EMAIL].toString(),
      subject: `Новая покупка в один клик!`,
      text: `
      Покупатель:
      Имя _____________________ ${info.buyer.firstname}
      Email ___________________ ${info.buyer.email}
      Телефон _________________ ${info.buyer.phone}
      ИД пользователя _________ ${info.buyer.userId}
     
      Товар:
      Артикул _________________ ${info.products[0].SKU}
      Название ________________ ${info.products[0].title}
      Цена ____________________ ${info.products[0].price} РУБ
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error)
      } else {
        resolve('Email sent: ' + info.response)
      }
    });
  })
}


let sendOneClickEmailNotifyToBuyer = function (transporter, info) {
  return new Promise(((resolve, reject) => {
    let mailOptions = {
      from: ADMIN_EMAIL,
      to: info.buyer.email,
      subject: `Misterio Shop: Покупка в один клик`,
      text: `
      ${info.buyer.firstname}, спасибо за Вашу заявку на "${info.products[0].title}".   
      Мы свяжемся с Вами по телефону ${info.buyer.phone} в ближайшее время для уточнения деталей!

      ${CONST.EMAIL_SIGN}
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
