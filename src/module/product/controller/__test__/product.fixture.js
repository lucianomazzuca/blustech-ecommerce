const Product = require('../../entity/Product');

module.exports = function createTestProduct() {
  return new Product(
    {
      id: 10000,
      model:'RTX 580',
      price: 100,
      discount: 0,
      image: 'default',
      description: 'lorem ipsum',
      category_id: 1,
      brand_id: 1,
    }
  )
}