module.exports = class Cart {
  constructor(
    {
      id,
      createdAt,
      updatedAt,
      user_id,
      products
    }
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user_id = user_id;
    this.products = products;
  }
}