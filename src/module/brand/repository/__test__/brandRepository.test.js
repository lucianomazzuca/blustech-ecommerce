const { Sequelize } = require("sequelize");
const BrandRepository = require('../brandRepository');
const BrandModel = require('../../model/brandModel');

describe('BrandRepository methods', () => {
  let sequelizeInstance;
  let brandModel;
  let brandRepository;

  beforeEach(async (done) => {
    sequelizeInstance = new Sequelize('sqlite::memory');
    brandModel = BrandModel.setup(sequelizeInstance);
    brandRepository = new BrandRepository({ brandModel })

    sequelizeInstance.sync({ force: true });
  })

  
})