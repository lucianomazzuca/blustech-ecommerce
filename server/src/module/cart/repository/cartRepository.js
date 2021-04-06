class CartRepository {
  constructor({ cartModel, userModel }) {
    this.cartModel = cartModel;
    this.userModel = userModel;
  }

  async getByUserId(userId) {
    const cart = this.cartModel.findOne({ where: { user_id: userId } });

    return cart;
  };
}

module.exports = CartRepository
