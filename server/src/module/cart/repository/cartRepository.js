const Cart = require('../entity/Cart');
const CartNotDefinedError = require('../error/CartNoteDefinedError');
const { fromModelToEntity } = require('../mapper/cartMapper');

class CartRepository {
  constructor({ cartModel, userModel, productModel }) {
    this.cartModel = cartModel;
    this.userModel = userModel;
    this.productModel = productModel;
  }

  async save(cart) {
    if (!(cart instanceof Cart)) {
      throw new CartNotDefinedError();
    };
    
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
