const { fromModelToEntity } = require('../mapper/cartMapper');

class CartController {
  constructor({ cartService }) {
    this.cartService = cartService;
  };

  async index(req, res, next) {
    res.send('hello')
  }
};

module.exports = CartController;