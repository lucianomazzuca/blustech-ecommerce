const { Sequelize } = require('sequelize');
const ProductRepository = require('../productRepository');
const ProductModel = require('../../model/productModel');

describe('ProductRepository methods', () => {
  const productRepository = new ProductRepository(ProductModel);

  beforeEach(async (done) => {
    sequelize = new Sequelize('sqlite::memory');
    
  })
  
  test('getAll returns all products in the DB', async () => {
    const products = await productRepository.getAll()
    expect(products).
  })

})