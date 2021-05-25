const ArgumentIsEmptyError = require("../../product/error/ArgumentIsEmpty");

module.exports = class PaymentController {
  constructor({ paymentService, productService }) {
    this.paymentService = paymentService;
    this.productService = productService;
  }

  async getMercadoPagoLink(req, res) {
    if (!req.body.productsIdAndQuantity) {
      return res.status(400).json({ msg: "Empty cart" });
    }

    const { productsIdAndQuantity } = req.body;
    const productsId = productsIdAndQuantity.map((product) => product.id);

    try {
      // search products in db
      const products = await this.productService.getMany(productsId);

      // Add quantity to products
      const productsWithQuantity = this.paymentService.addQuantityToProducts(
        products,
        productsIdAndQuantity
      );

      // Map products to items for mercado pago
      const items =
        this.paymentService.mapProductsToItems(productsWithQuantity);

      // get preference link
      const paymentLink = await this.paymentService.createPaymentMercadoPago(
        items
      );

      res.status(200).json(paymentLink);
    } catch (err) {
      if (err instanceof ArgumentIsEmptyError) {
        return res.status(400).json({ msg: "Empty cart" });
      }

      return res.status(500).json({ msg: "Mercado Pago error" });
    }
  }
};
