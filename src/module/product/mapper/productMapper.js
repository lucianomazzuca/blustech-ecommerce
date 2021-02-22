/* eslint-disable camelcase */
const Product = require('../entity/Product');

function fromModelToEntity ({
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
}) {
  return new Product(
    Number(id),
    Number(category_id),
    Number(brand_id),
    model,
    Number(price),
    discount,
    images,
    description,
    features,
    status,
    createdAt,
    updatedAt)
}

module.exports = fromModelToEntity;
