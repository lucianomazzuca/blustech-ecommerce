const Product = require("../entity/Product");
const ProductNotDefinedError = require("../error/ProductNotDefinedError");
const ProductIdNotDefinedError = require("../error/ProductIdNotDefinedError");
const ArgumentIsNotArrayError = require("../error/ArgumentIsNotArrayError");
const ArgumentIsEmpty = require("../error/ArgumentIsEmpty");

class ProductService {
  constructor({ productRepository }) {
    this.productRepository = productRepository;
  }

  async getAll(offset, limit, term, category, brand, sort) {
    return this.productRepository.getAll(
      offset,
      limit,
      term,
      category,
      brand,
      sort
    );
  }

  async getById(id) {
    if (!Number(id)) {
      throw new ProductIdNotDefinedError();
    }

    return this.productRepository.getById(id);
  }

  async save(product) {
    if (!(product instanceof Product)) {
      throw new ProductNotDefinedError();
    }
    return this.productRepository.save(product);
  }

  async delete(product) {
    if (!(product instanceof Product)) {
      throw new ProductNotDefinedError();
    }

    return this.productRepository.delete(product);
  }

  async getMany(productsId) {
    if (!(productsId instanceof Array)) {
      throw new ArgumentIsNotArrayError("Argument must be an array");
    }

    if (productsId.length == 0) {
      throw new ArgumentIsEmpty("Empty argument");
    }

    const products = await this.productRepository.getMany(productsId);
    return products;
  }
}

module.exports = ProductService;
