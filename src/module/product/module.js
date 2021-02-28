const ProductController = require('./controller/productController');
const ProductModel = require('./model/productModel');
const ProductRepository = require('./repository/productRepository');
const ProductService = require('./service/productService');
const configureRoutes = require('./route/productRoute');

function initProductModule(app, container) {
  const configureProductRoutes = container.resolve('configureProductRoutes')
  const productRouter = configureProductRoutes(container.cradle);
  app.use('/products', productRouter);
}

module.exports = {
  ProductController,
  ProductModel,
  ProductRepository,
  ProductService,
  configureRoutes,
  initProductModule
}