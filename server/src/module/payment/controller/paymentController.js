module.exports = class PaymentController {
  constructor({ paymentService }) {
    this.paymentService = paymentService
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
      const items = await this.paymentService.getItemsForMercadoPago(productsToBuy);
  
      // get preference link
      const paymentLink = await this.paymentService.createPaymentMercadoPago(items);

      res.json(paymentLink);

    } catch (err) {
      res.status(500).json({msg: 'Mercado Pago error'});
    }
  }

};
