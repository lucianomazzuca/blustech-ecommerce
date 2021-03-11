const { DataTypes, Model } = require("sequelize");

class Category extends Model {
  static setup(sequelizeInstance) {
    Category.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        underscored: true,
        modelName: "Category",
        tableName: 'categories'
      }
    );

    return Category;
  }
}

module.exports = Category;
