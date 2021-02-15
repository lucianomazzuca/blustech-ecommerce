const { DataTypes, Model } = require("sequelize");
const db = require("../../../config/db");
const Category = require("../../category/models/categoryModel");

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
    },
    brand_id: {
      type: DataTypes.INTEGER,
    },
    model: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(8, 2).UNSIGNED,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    images: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    features: {
      type: DataTypes.STRING(500),
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    underscored: true,
    tableName: "products",
    modelName: "Product",
  }
);

// Associations

Product.belongsTo(Category, {
  foreignKey: 'category_id'
})

Category.hasMany(Product);



module.exports = Product;
