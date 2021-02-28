const { Sequelize } = require("sequelize");
const BrandRepository = require('../brandRepository');
const BrandModel = require('../../model/brandModel');
const createTestBrand = require('../../controller/__test__/brandFixture');

describe('BrandRepository methods', () => {
  let sequelizeInstance;
  let brandModel;
  let brandRepository;

  beforeEach(async (done) => {
    sequelizeInstance = new Sequelize('sqlite::memory');
    brandModel = BrandModel.setup(sequelizeInstance);
    brandRepository = new BrandRepository({ brandModel });

    await sequelizeInstance.sync({ force: true });
    done();
  })

  test('Saves a new brand in DB', async () => {
    const brandTest = createTestBrand();

    const newBrand = await brandRepository.save(brandTest);

    expect(newBrand.id).toEqual(1);
    expect(newBrand.name).toEqual('Asus');
  })
})