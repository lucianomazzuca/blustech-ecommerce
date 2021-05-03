'use strict';

const UserModel = require('../../src/module/user/model/userModel');
const BrandModel = require('../../src/module/brand/model/brandModel');
const CategoryModel = require('../../src/module/category/models/categoryModel');
const ProductModel = require('../../src/module/product/model/productModel');
const CartModel = require('../../src/module/cart/model/cartModel');
const CartProductModel = require('../../src/module/cart/model/cartProductModel');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    UserModel.setup(queryInterface.sequelize).sync();
    BrandModel.setup(queryInterface.sequelize).sync();
    CategoryModel.setup(queryInterface.sequelize).sync();
    ProductModel.setup(queryInterface.sequelize).sync();
    CartModel.setup(queryInterface.sequelize).sync();
    CartProductModel.setup(queryInterface.sequelize).sync();

    ProductModel.setupAssociation(CategoryModel, BrandModel);
    CartModel.setupAssociation(UserModel, ProductModel, CartProductModel)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('brands');
    await queryInterface.dropTable('categories');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('carts');
    await queryInterface.dropTable('carts_products');
  }
};
