const Brand = require('../entity/Brand');
const BrandIdNotDefinedError = require('../error/BrandIdNotDefined');
const BrandNotFoundError = require('../error/BrandNotFoundError');
const BrandNotDefined = require('../error/BrandNotDefinedError');
const { fromModelToEntity } = require('../mapper/brandMapper');

class BrandRepository {
  constructor({ brandModel }) {
    this.brandModel = brandModel;
  }

  async getAll() {
    const brands = await this.brandModel.findAll();
    return brands.map(brand => fromModelToEntity(brand));
  }

  async save(brand) {
    if (! (brand instanceof Brand)) {
      throw new BrandIdNotDefinedError();
    }
    const newBrand = await this.brandModel.create(brand);
    return fromModelToEntity(newBrand);
  }

  async getById(id) {
    if (!Number(id)) {
      throw new BrandIdNotDefinedError();
    }

    const brand = await this.brandModel.findByPk(id);
    if (!brand) {
      throw new BrandNotFoundError(`Brand with id ${id} was not found`);
    }

    return fromModelToEntity(brand);
  };

  async delete(brand) {
    if (!(brand instanceof Brand)) {
      throw new BrandNotDefined();
    };

    return Boolean(await this.brandModel.destroy({ where: { id: brand.id } }));
  }


}

module.exports = BrandRepository