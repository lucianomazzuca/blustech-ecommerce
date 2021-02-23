const { fromFromToEntity } = require("../mapper/productMapper");

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

  async save(req, res) {
    const product = fromFromToEntity(req.body);
    await this.productService.save(product);

    res.redirect('/products')
  }
}