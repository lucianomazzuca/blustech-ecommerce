const Item = require("../entity/item");

function fromProductToItemMP({
  id,
  model,
  price,
  discount,
  quantity
}) {
  const realPrice = price - (discount * price) / 100;

  return new Item({ id, title: model, quantity, unit_price: realPrice });
}

module.exports = { fromProductToItemMP };
