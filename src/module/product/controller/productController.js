const ProductRepository = require('../repository/productRepository');

module.exports = class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  static async index(req, res) {
    const products = await ProductRepository.getAll();
    return res.json(products);
  }
}