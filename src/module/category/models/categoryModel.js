const { DataTypes, Model } = require("sequelize");
const db = require("../../../config/db");

class Category extends Model {}

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
    sequelize: db,
    underscored: true,
    modelName: "Category",
    tableName: 'categories'
  }
);



module.exports = Category;
