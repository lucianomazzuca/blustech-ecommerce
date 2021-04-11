const { DataTypes, Model } = require("sequelize");

class CartProduct extends Model {
  static setup(sequelizeInstance) {
    CartProduct.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        cart_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        underscored: true,
        modelName: "CartProduct",
        tableName: 'carts_products'
      }
    );

    return CartProduct;
  };

}

module.exports = CartProduct;
