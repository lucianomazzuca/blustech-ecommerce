const EmptyCartError = require("../error/EmptyCartError");
const { fromProductToItemMP } = require("../mapper/paymentMapper");

module.exports = class PaymentService {
  constructor({ productRepository, productService, mercadopago }) {
    this.productRepository = productRepository;
    this.productService = productService;
    this.mercadopago = mercadopago;
  }

  async createPaymentMercadoPago(items) {
    let preference = {
      items
    };

    try {
      const response = await this.mercadopago.preferences.create(preference);
      return response.body.id;
    } catch (err) {
      console.log(err);
    }

  }

  addQuantityToProducts(products, productsIdAndQuantity) {
    // compare the arrays and add the quantity to the first one based when the id's match
    const productsWithQuantity = products.map((product) => {
      const { quantity } = productsIdAndQuantity.find(
        (element) => element.id === product.id
      );
      return { ...product, quantity };
    });

    return productsWithQuantity;
  }

  mapProductsToItems(products) {
    const items = products.map((product) => fromProductToItemMP(product));
    return items;
  }
};
