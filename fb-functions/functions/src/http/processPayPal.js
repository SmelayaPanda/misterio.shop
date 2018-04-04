exports.handler = function (req, res, admin, transporter) {
  console.log(CONST.LOG_DELIMITER)
  const payInfo = req.body;
  console.log(payInfo);

  let orderId;

  let handlePaymentOrder = new Promise((resolve, reject) => {
    if (!payInfo.txn_id) {
      reject(Error('Invalid payment order!'))
    } else if (!payInfo.transaction_subject) {
      reject(Error('Transaction subject is Empty!'))
    } else {
      orderId = payInfo.transaction_subject; // (!)
      resolve(orderId)
    }
  });


  handlePaymentOrder
    .then(() => {
      return admin.firestore().collection('orders').doc(orderId)
        .update({
          payPalIPN: payInfo,
          paymentDate: new Date(),
          status: 'sentPending'
        })
    })
    .then(() => {
      logPaymentInfo(payInfo, orderId);
      // Yet not Promise because it is not destroyed payment process
      payPalSuccessOrderMail(transporter, payInfo, orderId, ADMIN_EMAIL);
      payPalSuccessOrderMail(transporter, payInfo, orderId, payInfo.payer_email);
      return res.sendStatus(200)
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500)
    })
};

function logPaymentInfo(payInfo, orderId) {
  console.log(`PayPal transaction id: ${payInfo.txn_id} / Order farebaseId: ${orderId} /  added!`);
  console.log(`Payer: ${payInfo.first_name} ${payInfo.last_name} ${payInfo.payer_email} -
                      ${payInfo.mc_gross} ${payInfo.mc_currency}`)
}

function payPalSuccessOrderMail(transporter, info, orderId, to) {
  let itemsInfo = ''
  for (let i = 1; i < 20; i++){
    if(info['item_name' + i]) {
      itemsInfo += `${info['item_name' + i]} - ${info['mc_gross_' + i]} ( ${info['quantity' + i]}x )\n`
    }
  }
  let mailOptions = {
    from: ADMIN_EMAIL,
    to: to,
    subject: `PayPal ордер: ${info.txn_id}`,
    text:
      `Совершена оплата товаров через PayPal.
     
       Покупатель:
       --------------------------------------------------
       Фамилия Имя ......... ${info.last_name} ${info.first_name} 
       Email ....................... ${info.payer_email}
       Страна .................... ${info.address_country}
       Город ....................... ${info.address_city}
       Улица ...................... ${info.address_street}
       Почтовый код ......... ${info.address_zip}
       --------------------------------------------------
       ИД транзакции: ${info.txn_id}
       ИД ордера (FirebaseDB): ${orderId}
       Сумма: ${info.mc_gross} ${info.mc_currency}
       Налог: ${info.mc_fee} ${info.mc_currency}
       
       Информация о товарах:
       ${itemsInfo}
       
       ${to === ADMIN_EMAIL ? '' : CONST.EMAIL_SIGN}
       `
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}



/*

  PayPal Instant Payment Notification (IPN) example:

  mc_gross: '33.00',
  mc_currency: 'RUB',
  mc_fee: '11.29',

  item_name: '',
  item_number: '',
  quantity: '1',

  txn_id: '2WF37480SF103400W',
  txn_type: 'express_checkout',

  payment_date: '05:47:49 Feb 27, 2018 PST',
  payment_status: 'Completed',               / Pending, Completed
  payment_type: 'instant',
  payment_fee: '',
  payment_gross: '',

  payer_id: 'WMBNWF9MFNXZ8',
  payer_status: 'verified',
  payer_email: 'person_panda@gmail.com',
  first_name: 'Vika',
  last_name: 'Zayceva',
  address_state: 'Москва',
  address_country: 'Russia',
  address_city: 'Москва',
  address_zip: '127001',
  address_country_code: 'RU',
  address_name: 'Zayceva Vika',
  address_status: 'confirmed',
  address_street: 'улица Первая, дом 1, квартира 2',


  business: 'business_panda@gmail.com',
  receiver_email: 'business_panda@gmail.com',
  receiver_id: 'GKSKY7AXVQ48S',


  protection_eligibility: 'Eligible',
  charset: 'KOI8_R',
  notify_version: '3.9',
  custom: '',
  verify_sign: 'AZrBO1E8R-CynzOZ1Cjgvc7kA38xAWL1aMAiNY85I0gS-5OW1AvZseYY',


  residence_country: 'RU',
  test_ipn: '1',
  transaction_subject: '',
  ipn_track_id: '3b21f369b7bab'

*/
