module.exports = class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  static async index(req, res) {
    res.send('Hello World');
  }
}