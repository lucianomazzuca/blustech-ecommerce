module.exports = class Item {
  constructor({ id, title, quantity, unit_price }) {
    this.id = id;
    this.title = title;
    this.quantity = quantity;
    this.unit_price = unit_price;
  }
};
