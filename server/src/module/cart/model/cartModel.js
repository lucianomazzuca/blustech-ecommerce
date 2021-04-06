const { DataTypes, Model } = require("sequelize");
const CartRepository = require("../repository/cartRepository");

class Cart extends Model {
  static setup(sequelizeInstance) {
    Cart.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
      },
      {
        sequelize: sequelizeInstance,
        underscored: true,
        modelName: "Cart",
        tableName: 'carts'
      }
    );

    return Cart;
  };

  static setupAssociation(UserModel, ProductModel) {
    Cart.belongsTo(UserModel, {
      foreignKey: 'user_id',
      as: 'user'
    });
    Cart.belongsToMany(ProductModel, {
      through: 'carts_products',
      foreignKey: 'cart_id',
      as: 'products'
    });
    // ProductModel.belongsToMany(Cart, {
    //   through: 'carts_products',
    //   foreignKey: 'product_id',
    //   as: 'carts'
    // })
  }
}

module.exports = Cart;
