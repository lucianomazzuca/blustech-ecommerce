const Cart = require("../entity/Cart");
const CartNotDefinedError = require("../error/CartNotDefinedError");
const { fromModelToEntity } = require("../mapper/cartMapper");

class CartRepository {
  constructor({ cartModel, userModel, productModel, cartProductModel }) {
    this.cartModel = cartModel;
    this.userModel = userModel;
    this.productModel = productModel;
    this.cartProductModel = cartProductModel;
  }

  async getById(cartId) {
    const cart = await this.cartModel.findByPk(cartId, {
      include: {
        model: this.productModel,
        as: "products",
      },
    });

    return cart;
  }

  async save(cart) {
    if (!(cart instanceof Cart)) {
      throw new CartNotDefinedError();
    }

    let newCart = this.cartModel.build(cart, {
      isNewRecord: !cart.id,
    });

    newCart = await newCart.save();
    return fromModelToEntity(newCart);
  }

  async getByUserId(userId) {
    const cart = await this.cartModel.findOne({
      where: { user_id: userId },
      include: {
        model: this.productModel,
        as: "products",
      },
    });

    if (cart.products) {
      cart.products = cart.products.map((product) => product.toJSON());
    }

    return fromModelToEntity(cart);
  }

  async addProduct(cartId, productId, quantity = 1) {
    const cart = await this.getById(cartId);
    await cart.addProducts(productId, { through: { quantity } });

    return fromModelToEntity(cart);
  }

  async removeProduct(cartId, productId) {
    const cart = await this.getById(cartId);
    await cart.removeProducts(productId);

    return fromModelToEntity(cart);
  }

  async changeQuantity(cartId, productId, quantity) {
    const cartProduct = await this.cartProductModel.findOne(
      { 
        where: {
          cart_id: cartId,
          product_id: productId,
        } 
      }
    );

    cartProduct.quantity = quantity;
    await cartProduct.save()

    return cartProduct;
  }

  // async getAll() {
  //   const carts = await this.cartModel.findAll({
  //     include: {
  //       model: this.productModel, as: 'products',
  //     }
  //   });
  //   console.log(carts)

  //   carts.map(cart => console.log(cart.toJSON()))
  //   return carts;
  // }

  // await newCart.addProducts(product, { through: { quantity: 1 }});
}

module.exports = CartRepository;
