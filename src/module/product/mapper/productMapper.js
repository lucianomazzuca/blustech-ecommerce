/* eslint-disable camelcase */
const Product = require('../entity/Product');

function fromModelToEntity ({
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
}) {
  return new Product(
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
  )
}

function fromFromToEntity ({
  id,
  category_id,
  brand_id,
  model,
  price,
  discount,
  image,
  description,
}) {
  return new Product(
    {
      id,
      category_id,
      brand_id,
      model,
      price,
      discount,
      image,
      description,
    }
  )
}

module.exports = {fromModelToEntity, fromFromToEntity};
