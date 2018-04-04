exports.handler = function (change, context, admin, transporter) {
  console.log(CONST.LOG_DELIMITER)
  let info = change.after.data()
  console.log(info)
  return Promise.all([
    sendOrderEmailNotifyToAdmin(transporter, info),
    sendOrderEmailNotifyToBuyer(transporter, info)
  ])
    .then(data => data)
    .catch(err => err)
}

let sendOrderEmailNotifyToAdmin = function (transporter, info) {
  return new Promise((resolve, reject) => {

    let mailOptions = {
      from: ADMIN_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Новая покупка!`,
      text:
        `
        Покупатель:

        Имя ............................. ${info.name}
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


let sendOrderEmailNotifyToBuyer = function (transporter, info) {
  return new Promise(((resolve, reject) => {
    console.log('To: ' + info.email)
    let mailOptions = {
      from: ADMIN_EMAIL,
      to: info.email,
      subject: `Покупка товара`,
      text:
        `${info.nickname}, спасибо за Вашу покупку на "${info.product.title}".
         
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
