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

    const limit = 2;
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
    }

    res.status(200).send('llegaste')
    
    // const product = fromFromToEntity(req.body);
    // await this.productService.save(product);

    // res.redirect("/products");
  }

  async delete(req, res, next) {
    try {
      const productId = req.params.id;
      const product = await this.productService.getById(productId);
      this.productService.delete(product);
      res.redirect("/products");
    } catch (e) {
      next(e);
    }
  }
};
