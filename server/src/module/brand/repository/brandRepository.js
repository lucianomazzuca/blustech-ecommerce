const Brand = require('../entity/Brand');
const BrandIdNotDefinedError = require('../error/BrandIdNotDefined');
const BrandNotFoundError = require('../error/BrandNotFoundError');
const BrandNotDefinedError = require('../error/BrandNotDefinedError');
const { fromModelToEntity } = require('../mapper/brandMapper');
const { Op } = require('sequelize');

class BrandRepository {
  constructor({ brandModel }) {
    this.brandModel = brandModel;
  }

  async getAll(offset = 0, limit = 10, brandName) {
    let query = {};
  
    if (brandName) {
      // create the where object for sequelize query
      query.name =  { [Op.iLike]: "%" + brandName + "%" }; 
    }
    
    const result = await this.brandModel.findAndCountAll({
      offset,
      limit,
      where: query
    });

    const data = {
      count: result.count,
      brands: result.rows.map((brand) => fromModelToEntity(brand))
    };
    
    return data;
  }

  async save(brand) {
    if (! (brand instanceof Brand)) {
      throw new BrandNotDefinedError();
    }
    const newBrand = await this.brandModel.build(brand, {
      isNewRecord: !brand.id,
    });
    await newBrand.save();
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
      throw new BrandNotDefinedError();
    };

    return Boolean(await this.brandModel.destroy({ where: { id: brand.id } }));
  }


}

module.exports = BrandRepository