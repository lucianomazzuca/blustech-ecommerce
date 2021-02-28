class BrandService {
  constructor({ brandRepository }) {
    this.brandRepository = brandRepository;
  }

  async getAll() {
    return this.brandRepository.getAll();
  }
}

module.exports = BrandService;