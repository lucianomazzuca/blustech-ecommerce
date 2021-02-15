const Category = require('../../category/models/categoryModel');
const productModel = require('../model/productModel');

class ProductRepository {
  constructor(model) {
    this.productModel = model;
  }

  async getAll() {
    const products = await this.productModel.findAll({ include: { model: Category }});
    return products;
  }
};

module.exports = new ProductRepository(productModel);