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
        category_name: {
          type: DataTypes.STRING(45),
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
