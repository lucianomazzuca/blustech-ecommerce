const User = require('../entity/User');

function fromModelToEntity({
  id,
  name,
  mail,
  password,
  isAdmin,
  createdAt,
  udpatedAt
}) {
  return new User({
    id,
    name,
    mail,
    password,
    isAdmin,
    createdAt,
    udpatedAt,
  })
};

function fromFormToEntity({
  id,
  name,
  mail,
  password,
  isAdmin,
  createdAt,
  udpatedAt
}) {
  return new User({
    id,
    name,
    mail,
    password,
    isAdmin,
    createdAt,
    udpatedAt,
  })
};

module.exports = { fromModelToEntity, fromFormToEntity };