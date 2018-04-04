exports.handler = function (snap, context, transporter) {
  console.log(CONST.LOG_DELIMITER)
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
      to: ADMIN_EMAIL,
      subject: `Новая покупка в один клик!`,
      text:
        `
        Покупатель:

        Имя ............................. ${info.nickname}
        Email ......................... ${info.email}
        Телефон ................... ${info.phone}
        ИД пользователя ...... ${info.userId}
       
       
        Товар:
        Артикул ................... ${info.product.SKU}
        Название ................. ${info.product.title}
        Цена ......................... ${info.product.price} РУБ
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
      to: info.email,
      subject: `Покупка в один клик`,
      text:
        `${info.nickname}, спасибо за Вашу заявку на "${info.product.title}".
         
         Мы свяжемся с Вами по телефону ${info.phone} в ближайшее время для уточнения деталей!
         
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
