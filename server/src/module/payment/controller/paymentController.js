const EmptyCartError = require('../error/EmptyCartError');

module.exports = class PaymentController {
  constructor({ paymentService, productService }) {
    this.paymentService = paymentService
    this.productService = productService
  }
  // async preference(req, res, next) {
  //   let preference = {
  //     items: [
  //       {
  //         title: "Mi producto",
  //         unit_price: 100,
  //         quantity: 1,
  //       },
  //     ],
  //   };

  //   mercadopago.preferences
  //     .create(preference)
  //     .then(function (response) {
  //       // Este valor reemplazará el string "<%= global.id %>" en tu HTML
  //       global.id = response.body.id;
  //       res.send(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       res.send(error);
  //     });
  // }

  async getMercadoPagoLink(req, res) {
    const { productsToBuy } = req.body;
    try {
      // search products in db
      const products = await this.productService.getMany(productsToBuy);

      // Map products to items for mercado pago
      const items = products.map(product => fromProductToItemMP(product))
  
      // get preference link
      const paymentLink = await this.paymentService.createPaymentMercadoPago(items);

      res.json(paymentLink);

    } catch (err) {
      if (err instanceof EmptyCartError) {
        return res.status(400).json({msg: 'Empty cart'});
      }

      return res.status(500).json({msg: 'Mercado Pago error'});
    }
  }

};
