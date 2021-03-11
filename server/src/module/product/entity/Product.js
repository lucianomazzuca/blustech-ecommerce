/* eslint-disable camelcase */
module.exports = class Product {
  constructor (
    {
      id,
      category_id,
      brand_id,
      category,
      brand,
      model,
      price,
      discount,
      image,
      description,
      createdAt,
      updatedAt
    }
  ) {
    this.id = id;
    this.category_id = category_id;
    this.brand_id = brand_id;
    this.category = category;
    this.brand = brand;
    this.model = model;
    this.price = price;
    this.discount = discount;
    this.image = image;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt; 
  }
}