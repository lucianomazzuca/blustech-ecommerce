const Category = require('../entity/Category');

function fromModelToEntity({
  id,
  name,
  createdAt,
  updatedAt
}) {
  return new Category({
    id,
    name,
    createdAt,
    updatedAt
  })
};

function fromFormToEntity({
  id,
  name,
  createdAt,
  updatedAt
}) {
  return new Category({
    id,
    name,
    createdAt,
    updatedAt
  })
};

module.exports = { fromModelToEntity, fromFormToEntity };
