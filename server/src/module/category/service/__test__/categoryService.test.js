const CategoryService = require('../categoryService');
const createCategoryTest = require('../../controller/__test__/categoryFixture');
const CategoryNotDefinedError = require('../../error/CategoryNotDefinedError');
const CategoryIdNotDefinedError = require('../../error/CategoryIdNotDefined');

const repositoryMock = {
  save: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  delete: jest.fn(),
}

const mockService = new CategoryService({ categoryRepository: repositoryMock });

describe('CategoryService methods', () => {

  test("save calls repository's save method", async () => {
    const category = createCategoryTest();
    await mockService.save(category);

    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(category);
  });

  test('Save throws an error because of lack of Category entity as parameter', async () => {
    const category = {
      id: 1,
      name: 'Samsung'
    };

    await expect(mockService.save(category)).rejects.toThrowError(CategoryNotDefinedError);
  });

  test("getAll calls repository's getAll method", async () => {
    const offset = 0;
    const limit = 10;
    const categoryName = 'Motherboard'
    await mockService.getAll(offset, limit, categoryName);

    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getAll).toHaveBeenCalledWith(offset, limit, categoryName);
  });

  test("getById calls repository's getById method", async () => {
    await mockService.getById(1);

    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.getById).toHaveBeenCalledWith(1);
  });
  
  test('getById throws an error on undefined id as argument', async () => {
    await expect(mockService.getById()).rejects.toThrowError(CategoryIdNotDefinedError);
  });

  test("delete calls repository's delete method", async () => {
    const category = createCategoryTest();
    await mockService.delete(category);

    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(repositoryMock.delete).toHaveBeenCalledWith(category);
  });

  test('delete throws an error because of lack of Category entity as argument', async () => {
    const category = {
      id: 1,
      name: 'Video Card',
    };

    await expect(mockService.delete(category)).rejects.toThrowError(CategoryNotDefinedError);
  });
  
})