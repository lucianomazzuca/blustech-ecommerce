module.exports = class ProductController {
  constructor({productService}) {
    this.productService = productService;
  }

  async index(req, res) {
    const products = await this.productService.getAll();
    return res.json(products);
  }

  async getOne(req, res) {
    const product = await this.productService.getOne(req.params.id);

    return res.json(product);
  }
}