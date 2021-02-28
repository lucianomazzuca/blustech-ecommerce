const { Sequelize } = require("sequelize");
const BrandRepository = require('../brandRepository');
const BrandModel = require('../../model/brandModel');
const createTestBrand = require('../../controller/__test__/brandFixture');

describe('BrandRepository methods', () => {
  let sequelizeInstance;
  let brandModel;
  let brandRepository;

  beforeEach(async () => {
    sequelizeInstance = new Sequelize('sqlite::memory', { logging: false });
    brandModel = BrandModel.setup(sequelizeInstance);
    brandRepository = new BrandRepository({ brandModel });

    await sequelizeInstance.sync({ force: true });
  })

  test('Saves a new brand in DB', async () => {
    const brandTest = createTestBrand();
    const newBrand = await brandRepository.save(brandTest);
    expect(newBrand.id).toEqual(1);
    expect(newBrand.name).toEqual('Asus');
  });

  test('GetById returns a brand', async() => {
    const brandTest = createTestBrand();
    await brandRepository.save(brandTest);
    const selectedBrand = await brandRepository.getById(1);
    expect(selectedBrand.id).toEqual(1);
  })

  test("GetById throws error when doesn't find a brand", () => {
    
  })

})