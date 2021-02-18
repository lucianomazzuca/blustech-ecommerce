const { DataTypes, Model } = require("sequelize");
const db = require("../../../config/db");

class Brand extends Model {}

Brand.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    brand_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    underscored: true,
    modelName: "Brand",
    tableName: 'brands'
  }
);

module.exports = Brand;
