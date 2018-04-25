const cors = require('cors')({origin: true});
/*
* Function for Yandex.Kassa payment object creation
*/
exports.handler = function (req, res, admin, transporter) {
  let YandexCheckout = require('yandex-checkout')({
    shopId: YANADEX_SHOPID,
    secretKey: YANADEX_SECRET_KEY
  });
  cors(req, res, () => {
    console.log(CONST.LOG_DELIMITER)
    console.log(req.body)
    let idempotenceKey = req.body.idempotenceKey
    let order = req.body.order
    let items = []
    for (let product in order.products) {
      if (order.hasOwnProperty(product)) {
        let item = {}
        item.description = order[product].title
        item.quantity = order[product].qty
        item.amount = {
          value: parseFloat(order[product].price).toFixed(2), // TODO: save in this format initially
          currency: 'RUB'
        }
        item.vat_code = 1 // TODO: know it
        items.push(item)
      }
    }
    let payment = ''
    YandexCheckout.createPayment({
      'amount': {
        'value': order.totalPrice,
        'currency': 'RUB'
      },
      'description': 'Ордер БД №' + idempotenceKey,
      'receipt': {
        'items': items,
        'phone': order.buyer.phone.replace(/[^0-9]/g, '')
      },
      'confirmation': {
        'type': 'redirect',
        'return_url': 'https://misterio.shop/succesPayment'
      },
      'payment_token': req.body.paymentToken, // token created by Yandex.Checkout
      'capture': true // automatic waiting_for_capture -> succeeded
    }, idempotenceKey)
      .then((result) => {
        console.log('Payment Result: ')
        payment = {payment: result}
        console.log(payment);
        return res.status(200).send(payment)
      })
      .catch((err) => {
        console.error('Some error', err);
        return res.status(200).send(err)
      })
  });
}
