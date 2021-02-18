class ProductService {
  constructor({productRepository}) {
    this.productRepository = productRepository;
  }

  async getAll() {
    return this.productRepository.getAll();
  }
}

module.exports = ProductService;