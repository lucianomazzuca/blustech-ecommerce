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
        category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        brand_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
        },
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

// Product.belongsTo(Category, {
//   foreignKey: 'category_id',
//   as: 'category'
// })
// Category.hasMany(Product);

// Product.belongsTo(Brand, {
//   foreignKey: 'brand_id',
//   as: 'brand'
// })
// Brand.hasMany(Product);

module.exports = Product;
