class CartRepository {
  constructor({ cartModel, userModel }) {
    this.cartModel = cartModel;
    this.userModel = userModel;
  }

  async save(cart) {
    let newCart = this.cartModel.build(cart, {
      isNewRecord: !cart.id,
    });

    newCart = await newCart.save();

    return newCart;
  }

  async getByUserId(userId) {
    const cart = this.cartModel.findOne({ where: { user_id: userId } });

    return cart;
  };
}

module.exports = CartRepository
