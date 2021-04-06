const { DataTypes, Model } = require("sequelize");

class Product extends Model {

  static setup(sequelizeInstance) {
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        model: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: false,
        },
        discount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        brand_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
      },
      {
        sequelize: sequelizeInstance,
        underscored: true,
        tableName: "products",
        modelName: "Product",
      }
    );

    return Product;
  };

  static setupAssociation(CategoryModel, BrandModel) {
    Product.belongsTo(CategoryModel, {
      foreignKey: 'category_id',
      as: 'category'
    })
    CategoryModel.hasMany(Product);
    
    Product.belongsTo(BrandModel, {
      foreignKey: 'brand_id',
      as: 'brand'
    })
    BrandModel.hasMany(Product);

    return Product;
  }
}

module.exports = Product;
