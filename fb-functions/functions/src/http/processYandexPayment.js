const cors = require('cors')({origin: true});

/*
* Function for handle Yandex.Kassa payment requests
* with event type 'notification'
*/
exports.handler = function (req, res, admin, transporter) {
  cors(req, res, () => {
    console.log(CONST.LOG_DELIMITER)
    console.log(req.body)
    if (req.body.type !== 'notification') {
      console.error('No valid notification object!')
      return res.status(200).send()
    }
    return handleNotification(req, admin)
      .then(() => res.status(200).send())
      .catch(err => {
        console.error(err)
        res.status(200).send()
      })
  })
}

function handleNotification(req, admin) {
  let {orderId} = req.body.object.metadata
  let {object} = req.body
  let {event} = req.body
  if (event === 'payment.succeeded') {
    return admin.firestore().collection('orders').doc(orderId).update({
      'status': 'pending', // order from 'created'
      'history.pending': new Date(),

      'payment.status': 'succeeded',
      'payment.history.succeeded': new Date(),
      'payment.notification.succeeded': object
    })
  }
  if (event === 'payment.pending') {
    return admin.firestore().collection('orders').doc(orderId).update({
      'payment.status': 'pending',
      'payment.history.pending': new Date(),
      'payment.notification.pending': object
    })
  }
  if (event === 'payment.waiting_for_capture') {
    return admin.firestore().collection('orders').doc(orderId).update({
      'payment.status': 'waiting_for_capture',
      'payment.history.waiting_for_capture': new Date(),
      'payment.notification.waiting_for_capture': object
    })
  }
  if (event === 'payment.canceled') {
    return admin.firestore().collection('orders').doc(orderId).update({
      'payment.status': 'canceled',
      'payment.history.canceled': new Date(),
      'payment.notification.canceled': object
    })
  } else {
    return console.error('Not handled notification status!')
  }
}


// { type: 'notification',
//   event: 'payment.succeeded',
//   object:
//    { id: '2273af26-000f-5000-8000-1d506a8cfb6e',
//      status: 'succeeded',
//      paid: true,
//      amount: { value: '12000.00', currency: 'RUB' },
//      captured_at: '2018-04-26T09:27:05.986Z',
//      created_at: '2018-04-26T09:27:02.698Z',
//      description: 'Ордер БД №2vnk0CvvuOiGllmLBTxo17',
//      metadata: {},
//      payment_method:
//       { type: 'bank_card',
//         id: '2273af26-000f-5000-8000-1d506a8cfb6e',
//         saved: false,
//         card: [Object],
//         title: 'Bank card *1026' },
//      recipient: { account_id: '505369', gateway_id: '1513353' },
//      refunded_amount: { value: '0.00', currency: 'RUB' },
//      test: true } }
