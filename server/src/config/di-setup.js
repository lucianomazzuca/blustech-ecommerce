const awilix = require('awilix');
const passport = require('passport');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const configurePassport = require('./passport');
const sequelizeInstance = require('./db');
const genJWT = require('../utils/genJWT');

const { UserController, UserModel, UserRepository, UserService, initUserModule, configureUserRouter } = require('../module/user/module');
const { ProductController, ProductModel, ProductRepository, ProductService, configureProductRouter } = require('../module/product/module');
const { BrandController, BrandModel, BrandRepository, BrandService, configureBrandRouter } = require('../module/brand/module');
const { CategoryController, CategoryModel, CategoryRepository, CategoryService, configureCategoryRouter } = require('../module/category/module');
const { CartController, CartService, CartRepository, CartModel, CartProductModel, configureCartRouter } = require('../module/cart/module');
const { PaymentController, PaymentService, configurePaymentRouter } = require('../module/payment/module');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

function configureMulter() {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      const dir = `./public/img/uploads`;
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename(req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
  });
  return multer({ storage });
};

container.register({
  sequelizeInstance,
  uploadMiddleware: awilix.asValue(configureMulter()),
  genJWT: awilix.asValue(genJWT),
});

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
  categoryModel: awilix.asValue(CategoryModel.setup(sequelizeInstance)),
  categoryController: awilix.asClass(CategoryController),
  categoryRepository: awilix.asClass(CategoryRepository),
  categoryService: awilix.asClass(CategoryService),
  configureCategoryRouter: awilix.asValue(configureCategoryRouter)
})

// User Module
container.register({
  userModel: awilix.asValue(UserModel.setup(sequelizeInstance)),
  userController: awilix.asClass(UserController),
  userRepository: awilix.asClass(UserRepository),
  userService: awilix.asClass(UserService),
  configureUserRouter: awilix.asValue(configureUserRouter)
});

// Cart Module
container.register({
  cartController: awilix.asClass(CartController),
  cartRepository: awilix.asClass(CartRepository),
  cartService: awilix.asClass(CartService),
  cartModel: awilix.asValue(CartModel.setup(sequelizeInstance)),
  cartProductModel: awilix.asValue(CartProductModel.setup(sequelizeInstance)),
  configureCartRouter: awilix.asValue(configureCartRouter)
});

// Payment module
container.register({
  paymentController: awilix.asClass(PaymentController),
  paymentService: awilix.asClass(PaymentService),
  configurePaymentRouter: awilix.asValue(configurePaymentRouter)
})

// Product associations
function setupAssociations(container) {
  ProductModel.setupAssociation(container.resolve('categoryModel'), container.resolve('brandModel'));
  CartModel.setupAssociation(container.resolve('userModel'), container.resolve('productModel'), container.resolve('cartProductModel'));
}

setupAssociations(container)

// Passport

module.exports = {container};