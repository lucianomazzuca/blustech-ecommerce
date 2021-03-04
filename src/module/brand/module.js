const configureBrandRouter = require('./route/brandRoute');
const BrandController = require('./controller/brandController');
const BrandService = require('./service/brandService');
const BrandRepository = require('./repository/brandRepository');
const BrandModel = require('./model/brandModel');

function initBrandModule(app, container) {
  const configureRouter = container.resolve('configureBrandRouter');
  const brandRouter = configureRouter(container.cradle);
  app.use('/brands', brandRouter);
}

module.exports = {
  configureBrandRouter,
  BrandController,
  BrandService,
  BrandRepository,
  BrandModel,
  initBrandModule
}