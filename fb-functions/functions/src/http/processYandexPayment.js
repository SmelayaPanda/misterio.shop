const cors = require('cors')({origin: true});

/*
* Function for handle Yandex.Kassa payment requests
* with event type 'notification'
*/
exports.handler = function (req, res, admin, transporter) {
  let YandexCheckout = require('yandex-checkout')({
    shopId: YANADEX_SHOPID,
    secretKey: YANADEX_SECRET_KEY
  });
  cors(req, res, () => {
    console.log(CONST.LOG_DELIMITER)
    console.log(req.body)
    if (req.body.type === 'notification') {
      console.log(req.body.event)
      if(req.body.event === 'payment.succeeded') {
        // change order status -> paid
        return res.status(200).send('Success payment! Yes!')
      }
      return res.status(200).send('Not handled status yet =(')
    }
    return res.status(200).send('Wrong event type!')
  })
}
