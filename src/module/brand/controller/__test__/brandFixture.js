const Brand = require('../../entity/Brand');

module.exports = function createBrandTest() {
  return new Brand({

    name: 'Asus'
  })
}