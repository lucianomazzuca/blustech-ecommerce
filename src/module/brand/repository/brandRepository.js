const Brand = require('../entity/Brand');
const BrandNotDefinedError = require('../error/BrandNotDefined');
const { fromModelToEntity } = require('../mapper/brandMapper');

class BrandRepository {
  constructor({ brandModel }) {
    this.brandModel = brandModel;
  }

  getAll() {
    return this.brandModel.findAll();
  }

  save(brand) {
    if (! (brand instanceof Brand)) {
      throw new BrandNotDefinedError();
    }

    const newBrand = this.brandModel.create(brand);
    return fromModelToEntity(newBrand);
  }
}

module.exports = BrandRepository