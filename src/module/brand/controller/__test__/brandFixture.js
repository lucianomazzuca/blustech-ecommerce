const Brand = require('../../entity/Brand');

module.exports = function createBrandTest(id) {
  return new Brand({
    id,
    name: 'Asus'
  })
}