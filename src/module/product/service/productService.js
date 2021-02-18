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

}

module.exports = ProductService;