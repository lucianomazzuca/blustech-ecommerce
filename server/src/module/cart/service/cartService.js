const Cart = require('../entity/Cart');
const CartNotDefinedError = require('../error/CartNotDefinedError');
const UserIdNotDefinedError = require('../../user/error/UserIdNotDefinedError');

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

  async getByUserId(userId) {
    if (!Number(userId)) {
      throw new UserIdNotDefinedError();
    };
    
    return this.cartRepository.getByUserId(userId);
  }
  
};

module.exports = CartService;