const { fromFromToEntity } = require("../mapper/productMapper");


module.exports = class ProductController {
  constructor({ productService }) {
    this.productService = productService;
  }

  async index(req, res) {
    let page = req.query.page;
    if (page < 1 || page == undefined) {
      page = 1;
    };

    const limit = 10;
    const offset = (page - 1) * limit;

    const data = await this.productService.getAll(offset, limit);
    res.status(200).json(data);
  }

  async getById(req, res, next) {
    try {
      const product = await this.productService.getById(req.params.id);
      res.json(product);
    } catch (e) {
      next(e);
    }
  }

  async save(req, res) {
    if (req.file) {
      console.log(req.file);
      req.body.image = req.file.filename
    }
    
    const product = fromFromToEntity(req.body);
    await this.productService.save(product);

    res.sendStatus(201);
  }

  async delete(req, res, next) {
    try {
      const productId = req.params.id;
      const product = await this.productService.getById(productId);
      this.productService.delete(product);
      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
};
