const configureCategoryRouter = require('./route/categoryRoute');
const CategoryController = require('./controller/categoryController');
const CategoryService = require('./service/categoryService');
const CategoryRepository = require('./repository/categoryRepository');
const CategoryModel = require('./models/categoryModel');

function initCategoryModule(app, container) {
  const configureRouter = container.resolve('configureCategoryRouter');
  const categoryRouter = configureRouter(container.cradle);
  app.use('/categories', categoryRouter);
}

module.exports = {
  configureCategoryRouter,
  CategoryController,
  CategoryService,
  CategoryRepository,
  CategoryModel,
  initCategoryModule
}