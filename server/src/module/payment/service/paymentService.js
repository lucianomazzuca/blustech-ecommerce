const EmptyCartError = require("../error/EmptyCartError");

module.exports = class PaymentService {
  constructor({ productRepository, productService }) {
    this.productRepository = productRepository;
    this.productService = productService;
  }

  async getItemsForMercadoPago(productsToBuy) {
    // Map to MP item
    const items = products.map((product) => fromProductToItem);
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
};
