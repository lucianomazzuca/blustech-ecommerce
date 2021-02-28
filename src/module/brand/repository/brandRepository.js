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
    const newBrand = await this.brandModel.create(brand);
    return fromModelToEntity(newBrand);
  }

  async getById(id) {
    const brand = await this.brandModel.findByPk(id);

    return fromModelToEntity(brand);
  }
}

module.exports = BrandRepository