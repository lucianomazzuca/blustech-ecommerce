const Brand = require('../../entity/Brand');

module.exports = function createBrandTest() {
  return new Brand({
    id: 1,
    name: 'Asus'
  })
}