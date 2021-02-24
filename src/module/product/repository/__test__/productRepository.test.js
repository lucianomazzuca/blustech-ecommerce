const { Sequelize } = require('sequelize');
const ProductRepository = require('../productRepository');
const ProductModel = require('../../model/productModel');
const BrandModel = require('../../../brand/model/brandModel');
const CategoryModel = require('../../../category/models/categoryModel');


describe('ProductRepository methods', () => {
  const productRepository = new ProductRepository(ProductModel);

  beforeEach(async (done) => {
    sequelizeInstance = new Sequelize('sqlite::memory');
    ProductModel.

  })
  
  test('getAll returns all products in the DB', async () => {
    const products = await productRepository.getAll()
    expect(products).
  })

})