class BrandService {
  constructor({ brandRepository }) {
    this.brandRepository = brandRepository;
  }

  async getAll() {
    return this.brandRepository.getAll();
  }

  async save(brand) {
    return this.brandRepository.save(brand);
  }
}

module.exports = BrandService;