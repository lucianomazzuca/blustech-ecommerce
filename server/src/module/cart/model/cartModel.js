const { DataTypes, Model } = require("sequelize");

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
  }
}

module.exports = Cart;
