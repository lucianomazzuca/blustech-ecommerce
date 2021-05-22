const EmptyCartError = require('../error/EmptyCartError');

module.exports = class PaymentService {
  constructor({ productRepository }) {
    this.productRepository = productRepository
  }

  async getItemsForMercadoPago(productsToBuy) {


    // Map to MP item
    const items = products.map(product => fromProductToItem);

  }
};
