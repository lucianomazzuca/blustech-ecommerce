const awilix = require('awilix');
const passport = require('passport');
const configurePassport = require('./passport');
const sequelizeInstance = require('./db');
const { UserController, UserModel, UserRepository, UserService } = require('../module/user/module');
const { ProductController, ProductModel, ProductRepository, ProductService, configureProductRouter } = require('../module/product/module');
const { BrandController, BrandModel, BrandRepository, BrandService, configureBrandRouter } = require('../module/brand/module');
const CategoryModel = require('../module/category/models/categoryModel');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
})

container.register({
  sequelizeInstance
})

// User Module
container.register({
  userController: awilix.asClass(UserController),
  userRepository: awilix.asClass(UserRepository),
  userService: awilix.asClass(UserService),
  userModel: awilix.asValue(UserModel.setup(sequelizeInstance))
});

// Product Module
container.register({
  productController: awilix.asClass(ProductController),
  productRepository: awilix.asClass(ProductRepository),
  productService: awilix.asClass(ProductService),
  productModel: awilix.asValue(ProductModel.setup(sequelizeInstance)),
  configureProductRouter: awilix.asValue(configureProductRouter)
});

// Brand Module
container.register({
  brandController: awilix.asClass(BrandController),
  brandRepository: awilix.asClass(BrandRepository),
  brandService: awilix.asClass(BrandService),
  brandModel: awilix.asValue(BrandModel.setup(sequelizeInstance)),
  configureBrandRouter: awilix.asValue(configureBrandRouter)
})

// Category Module
container.register({
  categoryModel: awilix.asValue(CategoryModel.setup(sequelizeInstance))
})

// User Module
container.register({
  userModel: awilix.asValue(UserModel.setup(sequelizeInstance))
})

// Product associations
function setupAssociations(cont) {
  ProductModel.setupAssociation(cont.resolve('categoryModel'), cont.resolve('brandModel'));
}

setupAssociations(container)

// Passport

module.exports = {container};