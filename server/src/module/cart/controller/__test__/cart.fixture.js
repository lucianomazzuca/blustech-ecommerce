const Cart = require('../../entity/Cart');

module.exports = function createCartTest(id, userId) {
  return new Cart(
    {
      id,
      userId,
    }
  )
}