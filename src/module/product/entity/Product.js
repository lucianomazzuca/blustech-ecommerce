/* eslint-disable camelcase */
module.exports = class Car {
  constructor (
    id,
    category_id,
    brand_id,
    model,
    price,
    discount,
    images,
    description,
    features,
    status,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.category_id = category_id;
    this.brand_id = brand_id;
    this.model = model;
    this.price = price;
    this.discount = discount;
    this.images = images;
    this.description = description;
    this.features = features;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt; 
  }
}