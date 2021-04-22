const Cart = require('../../entity/Cart');

module.exports = function createCartTest(id, userId, products) {
  return new Cart(
    {
      id,
      user_id: userId,
      products
    }
  )
}