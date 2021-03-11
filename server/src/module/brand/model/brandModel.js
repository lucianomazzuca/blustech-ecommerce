const { DataTypes, Model } = require("sequelize");

class Brand extends Model {
  static setup(sequelizeInstance) {
    Brand.init(
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
        modelName: "Brand",
        tableName: 'brands'
      }
    );

    return Brand;
  }
}

module.exports = Brand;
