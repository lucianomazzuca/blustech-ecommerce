const ProductController = require('./controller/productController');
const ProductModel = require('./model/productModel');
const ProductRepository = require('./repository/productRepository');
const ProductService = require('./service/productService');
const configureProductRouter = require('./route/productRoute');

function initProductModule(app, container) {
  const configureRouter = container.resolve('configureProductRouter')
  const productRouter = configureRouter(container.cradle);
  app.use('/products', productRouter);
}

module.exports = {
  ProductController,
  ProductModel,
  ProductRepository,
  ProductService,
  configureProductRouter,
  initProductModule
}