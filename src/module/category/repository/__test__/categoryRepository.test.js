const { Sequelize } = require('sequelize');
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

  test('saves a new category', async () => {
    const categoryTest = createTestCategory(1);
    const newCategory = await categoryRepository.save(categoryTest);
    expect(newCategory.id).toEqual(1);
  })
})