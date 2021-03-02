const { Sequelize } = require('sequelize');
const Category = require('../../entity/Category');
const CategoryRepository = require('../categoryRepository');
const CategoryModel = require('../../models/categoryModel');
const CategoryNotFoundError = require('../../error/CategoryNotFoundError');
const CategoryIdNotDefinedError = require('../../error/CategoryIdNotDefined');
const CategoryNotDefinedError = require('../../error/CategoryNotDefinedError');
const createTestCategory = require('../../controller/__test__/categoryFixture');

describe('CategoryRepository methods', () => {
  let sequelizeInstance;
  let categoryModel;
  let categoryRepository;

  beforeEach(async () => {
    sequelizeInstance = new Sequelize('sqlite::memory', { logging: false });
    categoryModel = CategoryModel.setup(sequelizeInstance);
    categoryRepository = new CategoryRepository({ categoryModel });

    await sequelizeInstance.sync({ force: true });
  });

  test('save a new category', async () => {
    const categoryTest = createTestCategory(1);
    const newCategory = await categoryRepository.save(categoryTest);
    expect(newCategory.id).toEqual(1);
  });

  test('save throws an error because the argument is not an instance of Category', async () => {
    const category = {
      id: 1,
      name: 'Motherboard',
    };

    await expect(categoryRepository.save(category)).rejects.toThrowError(CategoryNotDefinedError);
  });

  test('updates a category name', async () => {
    const category = createTestCategory();
    await categoryRepository.save(category);

    category.name = 'Video Card';
    const updatedCategory = await categoryRepository.save(category);

    expect(updatedCategory.name).toEqual('Video Card');
  });

  test('getAll returns all categories', async () => {
    const category = createTestCategory();
    await categoryRepository.save(category);
    await categoryRepository.save(category);
    await categoryRepository.save(category);

    const categories = await categoryRepository.getAll();
    expect(categories).toHaveLength(3); 
  });

  test('getById returns a brand', async () => {
    
  })
})