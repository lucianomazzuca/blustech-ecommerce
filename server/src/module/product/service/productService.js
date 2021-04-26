const Product = require('../entity/Product');
const ProductNotDefinedError = require('../error/ProductNotDefinedError');
const ProductIdNotDefinedError = require('../error/ProductIdNotDefinedError');

class ProductService {
  constructor({productRepository}) {
    this.productRepository = productRepository;
  }

  async getAll(offset, limit, term, category, brand, sort) {
    return this.productRepository.getAll(offset, limit, term, category, brand, sort);
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
}

module.exports = ProductService;