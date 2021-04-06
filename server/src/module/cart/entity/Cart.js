module.exports = class Cart {
  constructor(
    {
      id,
      createdAt,
      updatedAt,
      user_id
    }
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user_id = user_id;
  }
}