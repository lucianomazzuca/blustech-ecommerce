const Product = require('../../entity/Product');

module.exports = function createTestProduct() {
  return new Product(
    1,
    1,
    1,
    undefined,
    undefined,
    'RTX 580',
    10,
    0,
    'image',
    'lorem ipsum',
    undefined,
    undefined
  )
}