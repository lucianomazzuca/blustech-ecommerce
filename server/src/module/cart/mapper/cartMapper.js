const Cart = require('../entity/Cart');

function fromModelToEntity({
  id,
  user_id,
  createdAt,
  updatedAt,
  products
}) {
  return new Cart({
    id,
    user_id,
    createdAt,
    updatedAt,
    products
  })
};

module.exports = { fromModelToEntity };