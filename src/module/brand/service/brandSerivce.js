const Brand = require('../entity/Brand');
const BrandNotDefinedError = require('../error/BrandNotDefinedError');

class BrandService {
  constructor({ brandRepository }) {
    this.brandRepository = brandRepository;
  }

  async getAll() {
    return this.brandRepository.getAll();
  }

  async save(brand) {
    if (! (brand instanceof Brand)) {
      throw new BrandNotDefinedError();
    }
    return this.brandRepository.save(brand);
  }
}

module.exports = BrandService;