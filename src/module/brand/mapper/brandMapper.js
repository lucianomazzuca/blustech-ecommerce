const Brand = require('../entity/Brand');

function fromModelToEntity({
  id,
  name,
  createdAt,
  updatedAt
}) {
  return new Brand({
    id,
    name,
    createdAt,
    updatedAt
  })
}

function fromFormToEntity({
  id,
  name,
  createdAt,
  updatedAt
}) {
  return new Brand({
    id,
    name,
    createdAt,
    updatedAt
  })
}

module.exports = { fromModelToEntity, fromFormToEntity };