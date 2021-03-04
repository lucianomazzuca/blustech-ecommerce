const Product = require('../../entity/Product');

module.exports = function createTestProduct(id) {
  return new Product(
    {
      id,
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