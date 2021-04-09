const { fromModelToEntity } = require('../mapper/cartMapper');

class CartRepository {
  constructor({ cartModel, userModel, productModel }) {
    this.cartModel = cartModel;
    this.userModel = userModel;
    this.productModel = productModel;
  }

  async save(cart, product = undefined) {
    let newCart = this.cartModel.build(cart, {
      isNewRecord: !cart.id,
    });

    newCart = await newCart.save();

    if (product) {
      try {
        await newCart.addProducts(product, { through: { quantity: 1 }});
      } catch(e) {
        console.log(e)
      }
    }

    return fromModelToEntity(newCart);
  }

  async getByUserId(userId) {
    const cart = await this.cartModel.findOne({ 
      where: { user_id: userId }, 
      include: { 
        model: this.productModel, as:"products" ,
        through: {
          attributes: ['product_id']
        }
      }
    });

    if (cart.products) {
      cart.products.map(product => product.toJSON())
    }

    return fromModelToEntity(cart);
  };

  async getAll() {
    const carts = await this.cartModel.findAll({
      include: {
        model: this.productModel, as: 'products',
      }
    });
    console.log(carts)

    carts.map(cart => console.log(cart.toJSON()))
    return carts;
  }
}

module.exports = CartRepository;
