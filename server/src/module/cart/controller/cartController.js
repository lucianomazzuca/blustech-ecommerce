const { fromModelToEntity } = require('../mapper/cartMapper');

class CartController {
  constructor({ cartService }) {
    this.cartService = cartService;
  };

  async index(req, res, next) {
    res.send('hello')
  };

  async getByUserId(req, res, next) {
    try {
      const cart = await this.cartService.getByUserId(req.params.userId);
      res.status(200).json(cart);
    } catch(e) {
      next(e);
    }
  }
};

module.exports = CartController;