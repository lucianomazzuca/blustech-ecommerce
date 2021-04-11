const CartService = require('../cartService');
const createCartTest = require('../../controller/__test__/cart.fixture');
const CartNotDefinedError = require('../../error/CartNotDefinedError');

const mockCartRepository = {
  save: jest.fn(),
  getById: jest.fn(),
};

