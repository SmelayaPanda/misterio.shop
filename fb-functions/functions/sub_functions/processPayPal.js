exports.handler = function (req, res, admin, transporter) {
  console.log(LOG_DELIMITER)
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
      return res.sendStatus(200) // TODO: change to 500
    })
};

function logPaymentInfo(payInfo, orderId) {
  console.log(`PayPal transaction id: ${payInfo.txn_id} / Order farebaseId: ${orderId} /  added!`);
  console.log(`Payer: ${payInfo.first_name} ${payInfo.last_name} ${payInfo.payer_email} -
                      ${payInfo.mc_gross} ${payInfo.mc_currency}`)
}

function payPalSuccessOrderMail(transporter, info, orderId, to) {
  let mailOptions = {
    from: ADMIN_EMAIL,
    to: to,
    subject: `New PayPal order: ${info.txn_id}`,
    text:
      `Re:High Store message:
     
       PayPal order complete.
       --------------------------------------------------
       Payer info ............ ${info.last_name} ${info.first_name} 
       Email .................... ${info.payer_email}
       Country ................ ${info.address_country}
       State .................... ${info.address_state}
       City ...................... ${info.address_city}
       Street ................... ${info.address_street}
       Zip code ............... ${info.address_zip}
       --------------------------------------------------
       PayPal transaction Id: ${info.txn_id}
       Firebase Database Order Id: ${orderId}
       Total Gross: ${info.mc_gross} ${info.mc_currency}
       Fee: ${info.mc_fee} ${info.mc_currency}
       
       Items Info:
       #1 Item name: ${info.item_name1} - ${info.mc_gross_1} ( ${info.quantity1}x )
       ${info.item_name2 ? `#2 Item name: ${info.item_name2} - ${info.mc_gross_2} ( ${info.quantity2}x )` : ''}
       ${info.item_name3 ? `#3 Item name: ${info.item_name3} - ${info.mc_gross_3} ( ${info.quantity3}x )` : ''}
       ${info.item_name4 ? `#4 Item name: ${info.item_name4} - ${info.mc_gross_4} ( ${info.quantity4}x )` : ''}
       ${info.item_name5 ? `#5 Item name: ${info.item_name5} - ${info.mc_gross_5} ( ${info.quantity5}x )` : ''}
       ${info.item_name5 ? `#6 Item name: ${info.item_name6} - ${info.mc_gross_6} ( ${info.quantity6}x )` : ''}
       ${info.item_name5 ? `#7 Item name: ${info.item_name7} - ${info.mc_gross_7} ( ${info.quantity7}x )` : ''}
       ${info.item_name5 ? `#8 Item name: ${info.item_name8} - ${info.mc_gross_8} ( ${info.quantity8}x )` : ''}
       ${info.item_name5 ? `#9 Item name: ${info.item_name9} - ${info.mc_gross_9} ( ${info.quantity9}x )` : ''}
       ${info.item_name5 ? `#10 Item name: ${info.item_name10} - ${info.mc_gross_10} ( ${info.quantity10}x )` : ''}
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


// PayPal Instant Payment Notification (IPN) example:

/*
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
* */
