const Brand = require('../entity/Brand');
const BrandIdNotDefinedError = require('../error/BrandIdNotDefined');
const BrandNotDefinedError = require('../error/BrandNotDefinedError');

class BrandService {
  constructor({ brandRepository }) {
    this.brandRepository = brandRepository;
  }

  async getAll(offset, limit, brandName) {
    return this.brandRepository.getAll(offset, limit, brandName);
  }

  async save(brand) {
    if (! (brand instanceof Brand)) {
      throw new BrandNotDefinedError();
    }

    return this.brandRepository.save(brand);
  }

  async getById(id) {
    if (!Number(id)) {
      throw new BrandIdNotDefinedError();
    }

    return this.brandRepository.getById(id);
  }

  async delete(brand) {
    if (! (brand instanceof Brand)) {
      throw new BrandNotDefinedError();
    };

    return this.brandRepository.delete(brand);
  }
}

module.exports = BrandService;