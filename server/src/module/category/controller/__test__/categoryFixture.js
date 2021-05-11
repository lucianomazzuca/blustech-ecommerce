const Category = require('../../entity/Category');

module.exports = function createCategoryTest(id) {
  return new Category({
    id,
    name: 'Motherboard'
  })
}