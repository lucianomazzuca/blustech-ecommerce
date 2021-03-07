const User = require('../entity/User');

function fromModelToEntity({
  id,
  name,
  email,
  password,
  isAdmin,
  createdAt,
  udpatedAt
}) {
  return new User({
    id,
    name,
    email,
    password,
    isAdmin,
    createdAt,
    udpatedAt,
  })
};

function fromFormToEntity({
  id,
  name,
  email,
  password,
  isAdmin,
  createdAt,
  udpatedAt
}) {
  return new User({
    id,
    name,
    email,
    password,
    isAdmin,
    createdAt,
    udpatedAt,
  })
};

module.exports = { fromModelToEntity, fromFormToEntity };