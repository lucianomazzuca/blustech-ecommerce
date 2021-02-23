const Product = require('../entity/Product');
const ProductNotDefinedError = require('../error/ProductNotDefinedError')

class ProductService {
  constructor({productRepository}) {
    this.productRepository = productRepository;
  }

  async getAll() {
    return this.productRepository.getAll();
  }

  async getOne(id) {
    return this.productRepository.getOne(id);
  }

  async save(product) {
    if (!(product instanceof Product)) {
      throw new ProductNotDefinedError();
    }
    return this.productRepository.save(product);
  }
}

module.exports = ProductService;