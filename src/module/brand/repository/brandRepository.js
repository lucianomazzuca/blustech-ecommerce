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

  async save(brand) {
    if (! (brand instanceof Brand)) {
      throw new BrandNotDefinedError();
    }
    debugger
    const newBrand = await this.brandModel.build(brand);
    await newBrand.save()
    debugger
    return fromModelToEntity(newBrand);
  }
}

module.exports = BrandRepository