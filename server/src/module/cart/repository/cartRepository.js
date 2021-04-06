const { fromModelToEntity } = require('../mapper/cartMapper');

class CartRepository {
  constructor({ cartModel, userModel, productModel }) {
    this.cartModel = cartModel;
    this.userModel = userModel;
    this.productModel = productModel;
  }

  async save(cart) {
    let newCart = this.cartModel.build(cart, {
      isNewRecord: !cart.id,
    });

    newCart = await newCart.save();

    return newCart;
  }

  async getByUserId(userId) {
    const cart = this.cartModel.findOne({ 
      include: [
        { model: this.productModel, as:"products" }
      ],
      where: { user_id: userId } 
    });

    return fromModelToEntity(cart);
  }
}

module.exports = CartRepository;
