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
    } catch(err) {
      next(err);
    }
  };

  async addProduct(req, res, next) {
    const user = req.user;
    const productId = req.params.productId;

    try {
      const cart = await this.cartService.getByUserId(user.id);
      if (cart === undefined) {
        cart = await this.cartService.create(user.id);
      };
  
      await this.cartService.addProduct(cart.id, productId);
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  };

  async removeProduct(req, res, next) {
    const user = req.user;
    const productId = req.params.productId;

    try {
      const cart = await this.cartService.getByUserId(user.id);

      await this.cartService.removeProduct(cart.id, productId);
      res.sendStatus(200)
    } catch (err) {
      next(err);
    }
  };

  async editProduct(req, res, next) {
    const user = req.user;
    const productId = req.params.productId;
    const { quantity } = req.query;

    if (quantity < 1) {
      return res.sendStatus(400);
    }

    try {
      const cart = await this.cartService.getByUserId(user.id);
      await this.cartService.changeQuantity(cart.id, productId, quantity);
      res.sendStatus(200);
    } catch(err) {
      next(err);
    };
  }
};

module.exports = CartController;