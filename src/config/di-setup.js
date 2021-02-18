const awilix = require('awilix');

const { UserController, UserModel, UserRepository } = require('../module/user/module');
const { ProductController, ProductModel, ProductRepository, ProductRoute, ProductService } = require('../module/product/module');
const  CategoryModel= require('../module/category/models/categoryModel');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
})

// function setup() {
//   container.register({
//     UserController: awilix.asClass(UserController),
//     UserRepository: awilix.asClass(UserRepository),
//     UserModel: awilix.asValue(UserModel)
//   })
// }

  container.register({
    productController: awilix.asClass(ProductController),
    productRepository: awilix.asClass(ProductRepository),
    productService: awilix.asClass(ProductService),
    productModel: awilix.asValue(ProductModel),

    categoryModel: awilix.asValue(CategoryModel)
  })


module.exports = {container};