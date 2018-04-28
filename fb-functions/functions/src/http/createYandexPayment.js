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
    let {idempotenceKey} = req.body
    let {order} = req.body
    let items = []
    order.products.forEach(el => {
      let item = {}
      item.vat_code = 4
      item.description = el.title
      item.quantity = el.qty
      item.amount = {
        value: el.price,
        currency: el.currency
      }
      items.push(item)
    })
    let description = `${order.buyer.firstname} ${order.buyer.lastname} / ${order.buyer.phone} / ${order.id}.`.substring(0, 127)
    return YandexCheckout.createPayment({
      'amount': {
        'value': order.amount.final.value,
        'currency': order.amount.final.currency
      },
      'description': description,
      'receipt': {
        'items': items,
        'phone': order.buyer.phone.replace(/[^0-9]/g, '') // -> 79000000000
      },
      'confirmation': {
        'type': 'redirect',
        'return_url': 'https://misterio.shop/'
      },
      'payment_token': req.body.paymentToken, // token created by Yandex.Checkout
      'capture': true, // automatic waiting_for_capture -> succeeded
      'metadata': {
        'orderId': idempotenceKey
      }
    }, idempotenceKey + new Date().getTime()) // temporary for test one order
      .then((result) => {
        console.log('Payment Result:', result)
        // result.status = pending / waiting_for_capture / succeeded / canceled
        return res.status(200).send({status: result.status, obj: JSON.stringify(result)})
      })
      .catch((err) => {
        console.error(err)
        // 200 - for avoid loop invocation
        return res.status(200).send({status: 'error', obj: JSON.stringify(err)})
      })
  });
}
