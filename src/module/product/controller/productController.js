const db = require('../../../config/db');
const Category = require('../../category/models/categoryModel');
const Product = require('../model/productModel');

module.exports = class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  static async index(req, res) {
    Product.findAll({
      include: {model: Category, as: 'category'}
    })
      .then(products => {
        res.send(products)
      })
      .catch(err => res.send(err))
  }
}