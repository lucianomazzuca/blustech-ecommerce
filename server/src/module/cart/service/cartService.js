const Cart = require('../entity/Cart');
const CartNotDefinedError = require('../error/CartNotDefinedError');

class CartService {
  constructor({ cartRepository }) {
    this.cartRepository = cartRepository;
  };

  async save(cart) {
    if (!(cart instanceof Cart)) {
      throw new CartNotDefinedError();
    };

    return this.cartRepository.save(cart);
  };
}