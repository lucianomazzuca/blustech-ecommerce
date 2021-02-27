const awilix = require('awilix');

const sequelizeInstance = require('./db');
const { UserController, UserModel, UserRepository } = require('../module/user/module');
const { ProductController, ProductModel, ProductRepository, ProductService } = require('../module/product/module');
const CategoryModel = require('../module/category/models/categoryModel');
const BrandModel = require('../module/brand/model/brandModel');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
})

container.register({
  sequelizeInstance
})

container.register({
  userController: awilix.asClass(UserController),
  UserRepository: awilix.asClass(UserRepository),
  UserModel: awilix.asValue(UserModel)
})

// Product Module
container.register({
  productController: awilix.asClass(ProductController),
  productRepository: awilix.asClass(ProductRepository),
  productService: awilix.asClass(ProductService),
  productModel: awilix.asValue(ProductModel.setup(sequelizeInstance)),
});

// Category Module
container.register({
  categoryModel: awilix.asValue(CategoryModel.setup(sequelizeInstance))
})

// Brand Module
container.register({
  brandModel: awilix.asValue(BrandModel.setup(sequelizeInstance))
})

// Product associations
function setupAssociations(cont) {
  ProductModel.setupAssociation(cont.resolve('categoryModel'), cont.resolve('brandModel'));
}

setupAssociations(container)


module.exports = {container};