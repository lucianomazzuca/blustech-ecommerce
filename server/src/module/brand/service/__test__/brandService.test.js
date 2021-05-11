const BrandService = require('../brandService');
const createBrandTest = require('../../controller/__test__/brandFixture');
const BrandNotDefinedError = require('../../error/BrandNotDefinedError');
const BrandIdNotDefinedError = require('../../error/BrandIdNotDefined');

const repositoryMock = {
  save: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
}

const mockService = new BrandService({ brandRepository: repositoryMock });

describe('BrandService methods', () => {

  test("Save calls repository's save method", async () => {
    const brand = createBrandTest();
    await mockService.save(brand);

    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(brand);
  });

  test('Save throws an error because of lack of Brand entity as parameter', async () => {
    const brand = {
      id: 1,
      name: 'Samsung'
    };

    await expect(mockService.save(brand)).rejects.toThrowError(BrandNotDefinedError);
  });

  test("getAll calls repository's getAll method", async () => {
    const offset = 0;
    const limit = 10;
    const brandName = 'asus'
    await mockService.getAll(offset, limit, brandName);

    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getAll).toHaveBeenCalledWith(offset, limit, brandName);
  });

  test("getById calls repository's getById method", async () => {
    await mockService.getById(1);

    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);
  });

  test('getById throws an error on undefined id as argument', async () => {
    await expect(mockService.getById()).rejects.toThrowError(BrandIdNotDefinedError);
  });

  test("delete calls repository's delete method", async () => {
    const brand = createBrandTest();
    await mockService.delete(brand);

    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(repositoryMock.delete).toHaveBeenCalledWith(brand);
  });

  test('delete throws an error because of lack of Brand entity as argument', async () => {
    const brand = {
      id: 1,
      name: 'samsung',
    };

    await expect(mockService.delete(brand)).rejects.toThrowError(BrandNotDefinedError);
  });
})