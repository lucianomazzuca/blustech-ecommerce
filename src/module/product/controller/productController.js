const { fromFromToEntity } = require("../mapper/productMapper");

module.exports = class ProductController {
  constructor({productService}) {
    this.productService = productService;
  }

  async index(req, res) {
    const products = await this.productService.getAll();
    return res.json(products);
  }

  async getById(req, res, next) {
    try {
      const product = await this.productService.getById(req.params.id);
      return res.json(product);
    } catch(e) {
      next(e)
    }
  }

  async save(req, res) {
    const product = fromFromToEntity(req.body);
    await this.productService.save(product);

    res.redirect('/products')
  }

  async delete(req, res) {
    const productId = req.params.id;
    const product = await this.productService.getById(productId);
    this.productService.delete(product)
    res.redirect('/products');
  }
}