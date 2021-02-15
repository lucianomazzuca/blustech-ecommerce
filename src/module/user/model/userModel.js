const { DataTypes, Model } = require("sequelize");
const db = require("../../../config/db");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(45),
    },
    adress: {
      type: DataTypes.STRING(100),
    },
    city: {
      type: DataTypes.STRING(100),
    },
    province: {
      type: DataTypes.STRING(45),
    },
    date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize: db,
    modelName: "User",
    tableName: "users",
    underscored: true,
  }
);

module.exports = User;
