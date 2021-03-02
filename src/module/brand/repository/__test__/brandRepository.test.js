const { Sequelize } = require("sequelize");
const BrandRepository = require('../brandRepository');
const BrandModel = require('../../model/brandModel');
const createTestBrand = require('../../controller/__test__/brandFixture');
const BrandNotFoundError = require('../../error/BrandNotFoundError');
const BrandIdNotDefinedError = require("../../error/BrandIdNotDefined");
const BrandNotDefinedError = require('../../error/BrandNotDefinedError');

describe('BrandRepository methods', () => {
  let sequelizeInstance;
  let brandModel;
  let brandRepository;

  beforeEach(async () => {
    sequelizeInstance = new Sequelize('sqlite::memory', { logging: false });
    brandModel = BrandModel.setup(sequelizeInstance);
    brandRepository = new BrandRepository({ brandModel });

    await sequelizeInstance.sync({ force: true });
  });

  test('Saves a new brand', async () => {
    const brandTest = createTestBrand();
    const newBrand = await brandRepository.save(brandTest);
    expect(newBrand.id).toEqual(1);
    expect(newBrand.name).toEqual('Asus');
  });

  test('Save throws an error because the parameter is not an instanceof Brand', async () => {
    const brand = {
      id: 1,
      name: 'Samsung'
    };

    await expect(brandRepository.save(brand)).rejects.toThrowError(BrandNotDefinedError);
  })

  test("Updates a brand name", async () => {
    const brandTest = createTestBrand();
    const savedBrand = await brandRepository.save(brandTest);
    expect(savedBrand.name).toEqual('Asus');

    savedBrand.name = 'Samsung';
    const updatedBrand = await brandRepository.save(savedBrand);
    expect(updatedBrand.name).toEqual('Samsung');
  });

  test('GetById returns a brand', async() => {
    const brandTest = createTestBrand();
    await brandRepository.save(brandTest);
    const selectedBrand = await brandRepository.getById(1);
    expect(selectedBrand.id).toEqual(1);
  });

  test("GetById throws an error because there is no brand with that id", async () => {
    const brandId = 2
    await expect(brandRepository.getById(brandId)).rejects.toThrowError(BrandNotFoundError);
  });

  test("GetById throws an error because the parameter is empty", async () => {
    await expect(brandRepository.getById()).rejects.toThrowError(BrandIdNotDefinedError);
  });

  test("GetAll returns all brands", async () => {
    const brandTest = createTestBrand();
    await brandRepository.save(brandTest);
    await brandRepository.save(brandTest);
    await brandRepository.save(brandTest);

    const brands = await brandRepository.getAll();

    await expect(brands).toHaveLength(3);
  });

  test("Delete a product and return true", async () => {
    const brandTest = createTestBrand();
    await brandRepository.save(brandTest);
    await brandRepository.save(brandTest);
    await brandRepository.save(brandTest);

    const brand = await brandRepository.getById(2);
    await expect(await brandRepository.delete(brand)).toEqual(true);

    const allBrands = await brandRepository.getAll();
    expect(allBrands).toHaveLength(2);
  });

  test('tries to delete non-existent car in DB and returns false', async () => {
    const brand = createTestBrand();
    brand.id = 1;
    expect(await brandRepository.delete(brand)).toBe(false);
  });
  
})