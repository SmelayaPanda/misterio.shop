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
    if (!req.body.idempotenceKey || !req.body.paymentToken || !req.body.order) {
      console.log('Wrong payment data!')
      return res.status(200).send({type: 'error', obj: `See no valid data in ${JSON.stringify(req.body)}`})
    }
    let idempotenceKey = req.body.idempotenceKey
    let order = req.body.order
    let items = []
    for (let product of order.products) {
      let item = {}
      item.description = product.title
      item.quantity = product.qty
      item.amount = {
        value: parseFloat(product.price).toFixed(2), // TODO: save in this format initially
        currency: 'RUB'
      }
      item.vat_code = 1 // TODO: know real vat_code
      items.push(item)
    }
    return YandexCheckout.createPayment({
      'amount': {
        'value': order.totalPrice,
        'currency': 'RUB'
      },
      'description': 'Ордер БД №' + idempotenceKey,
      'receipt': {
        'items': items,
        'phone': order.buyer.phone.replace(/[^0-9]/g, '') // -> 79000000000
      },
      'confirmation': {
        'type': 'redirect',
        'return_url': 'https://misterio.shop/'
      },
      'payment_token': req.body.paymentToken, // token created by Yandex.Checkout
      'capture': true // automatic waiting_for_capture -> succeeded
    }, idempotenceKey)
      .then((result) => {
        console.log('Payment Result:', result)
        return res.status(200).send({type: 'success', obj: JSON.stringify(result)})
      })
      .catch((err) => {
        console.error(err)
        // 200 - for avoid loop invocation
        return res.status(200).send({type: 'error', obj: JSON.stringify(err)})
      })
  });
}
