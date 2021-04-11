const configureCartRouter = require('./route/cartRoute');
const CartController = require('./controller/cartController');
const CartService = require('./service/cartService');
const CartRepository = require('./repository/cartRepository');
const CartModel = require('./model/cartModel');

function initCartModule(app, container) {
  const configureRouter = container.resolve('configureCartRouter');
  const cartRouter = configureRouter(container.cradle);
  app.use('/carts', cartRouter);
};

module.exports = {
  configureCartRouter,
  CartController,
  CartService,
  CartRepository,
  CartModel,
  initCartModule
};