const Product = require('../entity/Product');
const ProductNotDefinedError = require('../error/ProductNotDefinedError')

class ProductService {
  constructor({productRepository}) {
    this.productRepository = productRepository;
  }

  async getAll() {
    return this.productRepository.getAll();
  }

  async getById(id) {
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